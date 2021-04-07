import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface AuthProps {
    user: {
        id: string;
        companyId: string;
        name: string;
        isAdmin: boolean;
        email: string;
        avatar: string;
    };
    token: string;
}

interface SignInData {
    email: string;
    password: string;
}

interface AuthContextData extends AuthProps {
    signIn(data: SignInData): Promise<void>;
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
            }}
        >
            {children}
        </authContext.Provider>
    );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAuth = () => useContext(authContext);

export { AuthContext, useAuth };
