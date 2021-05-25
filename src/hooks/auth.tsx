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
    avatar?: string;
    password?: string;
    companyId?: string;
    isAdmin: boolean;
}

interface AuthProps {
    user: UserData;
    token: string;
}

interface UpdateUserData {
    name: string;
    email: string;
    oldPassword?: string;
    newPassword?: string;
}

type SignInData = Pick<UserData, 'email' | 'password'>;

interface AuthContextData extends AuthProps {
    signIn(data: SignInData): Promise<void>;
    updateUser(userData: UpdateUserData): Promise<void>;
    updateUsersCompany(companyId: number): Promise<void>;
    updateUsersAvatar(avatar: string): Promise<void>;
    signOut(): Promise<void>;
    isReady: boolean;
}

const authContext = createContext<AuthContextData>({} as AuthContextData);

const AuthContext: React.FC = ({ children }) => {
    const [authData, setAuthData] = useState<AuthProps>({} as AuthProps);
    const [isReady, setIsReady] = useState(false);

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

        fetchStorage().then(() => setIsReady(true));
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

    const updateUser = useCallback(async (userData: UpdateUserData) => {
        const response = await api.put('/user/update', userData);

        await AsyncStorage.setItem(
            '@Tradelous-user',
            JSON.stringify(response.data),
        );

        setAuthData(actualData => ({
            user: response.data,
            token: actualData.token,
        }));
    }, []);

    const updateUsersAvatar = useCallback(
        async avatar => {
            let data;

            if (avatar) {
                data = new FormData();

                data.append('avatar', {
                    name: `${authData.user.id}.jpg`,
                    type: 'image/jpg',
                    uri: avatar,
                });
            }

            const response = await api.patch('/user/updateAvatar', data);

            await AsyncStorage.setItem(
                '@Tradelous-user',
                JSON.stringify({
                    ...authData.user,
                    avatar: response.data.avatar,
                }),
            );

            setAuthData(data => {
                return {
                    ...data,
                    user: {
                        ...data.user,
                        avatar,
                    },
                };
            });
        },
        [authData.user],
    );

    const updateUsersCompany = useCallback(
        async companyId => {
            await AsyncStorage.setItem(
                '@Tradelous-user',
                JSON.stringify({ ...authData.user, companyId }),
            );

            setAuthData(data => {
                return {
                    ...data,
                    user: {
                        ...data.user,
                        companyId,
                    },
                };
            });
        },
        [authData.user],
    );

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
                updateUsersCompany,
                updateUsersAvatar,
                isReady,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAuth = () => useContext(authContext);

export { AuthContext, useAuth };
