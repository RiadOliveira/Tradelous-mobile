import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface UserData {
    id: string;
    name: string;
    email: string;
    avatar: string;
    password?: string;
    companyId: string;
    isAdmin: boolean;
}

interface AuthProps {
    user: UserData;
    token: string;
}

type SignInData = Pick<UserData, 'email' | 'password'>;
type UpdateUserData = Pick<UserData, 'name' | 'email' | 'password' | 'avatar'>;

interface AuthContextData extends AuthProps {
    signIn(data: SignInData): Promise<void>;
    updateUser(userData: UpdateUserData): Promise<void>;
    signOut(): Promise<void>;
}

const authContext = createContext<AuthContextData>({} as AuthContextData);

const AuthContext: React.FC = ({ children }) => {
    const [authData, setAuthData] = useState<AuthProps>({} as AuthProps);

    useEffect(() => {
        async function fetchStorage() {
            const [user, token] = await AsyncStorage.multiGet([
                '@Tradelous-user',
                '@Tradelous-token',
            ]);

            if (user[1] && token[1]) {
                setAuthData({
                    user: JSON.parse(user[1]),
                    token: token[1],
                });

                api.defaults.headers.authorization = `Bearer ${token[1]}`;
            }
        }

        fetchStorage();
    }, []);

    const signIn = useCallback(async (data: SignInData) => {
        const response = await api.post<AuthProps>('/user/sessions', data);

        const token = response.data.token;

        api.defaults.headers.authorization = `Bearer ${token}`;

        await AsyncStorage.multiSet([
            ['@Tradelous-user', JSON.stringify(response.data.user)],
            ['@Tradelous-token', token],
        ]);

        setAuthData(response.data);
    }, []);

    const updateUser = useCallback(async userData => {
        const data = new FormData();

        const userDataKeys = Object.keys(userData);
        const userDataValues = Object.values(userData);

        userDataKeys.forEach((key, index) => {
            if (userDataValues[index]) {
                data.append(key, userDataValues[index]);
            }
        });

        if (userData.avatar) {
            data.append('avatar', {
                name: `${authData.user.id}.jpg`,
                type: 'image/jpg',
                uri: userData.avatar,
            });
        }

        const updatedUser = await api.put('/user/update', data);

        setAuthData(actualData => ({
            user: updatedUser.data,
            token: actualData.token,
        }));
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@Tradelous-user', '@Tradelous-token']);
        api.defaults.headers.authorization = undefined;

        setAuthData({} as AuthProps);
    }, []);

    return (
        <authContext.Provider
            value={{
                user: authData.user,
                token: authData.token,
                signIn,
                signOut,
                updateUser,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAuth = () => useContext(authContext);

export { AuthContext, useAuth };
