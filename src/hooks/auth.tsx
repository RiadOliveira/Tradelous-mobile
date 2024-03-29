import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface IUserData {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    password?: string;
    companyId?: string;
    isAdmin: boolean;
}

interface IAuthProps {
    user: IUserData;
    token: string;
}

interface IUpdateUserData {
    name: string;
    email: string;
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

type SignInData = Pick<IUserData, 'email' | 'password'>;

interface IAuthContextData extends IAuthProps {
    signIn(data: SignInData): Promise<void>;
    updateUser(userData: IUpdateUserData): Promise<void>;
    setUserCompany(isAdmin: boolean, companyId?: string): Promise<void>;
    updateUsersAvatar(avatar: string): Promise<void>;
    signOut(): Promise<void>;
    isReady: boolean;
}

const authContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthContext: React.FC = ({ children }) => {
    const [authData, setAuthData] = useState<IAuthProps>({} as IAuthProps);
    const [isReady, setIsReady] = useState(false);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@Tradelous-user', '@Tradelous-token']);
        api.defaults.headers.authorization = undefined;

        setAuthData({} as IAuthProps);
    }, []);

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

                // Signout when 401 error.
                api.interceptors.response.use(
                    response => response,
                    error => {
                        if (error.response && error.response.status === 401) {
                            return new Promise(() => signOut());
                        }

                        throw error;
                    },
                );

                api.defaults.headers.authorization = `Bearer ${token[1]}`;
            }
        }

        fetchStorage().then(() => setIsReady(true));
    }, [signOut]);

    const signIn = useCallback(async (data: SignInData) => {
        const response = await api.post<IAuthProps>('/user/sessions', data);
        const token = response.data.token;

        api.defaults.headers.authorization = `Bearer ${token}`;

        await AsyncStorage.multiSet([
            ['@Tradelous-user', JSON.stringify(response.data.user)],
            ['@Tradelous-token', token],
        ]);

        setAuthData(response.data);
    }, []);

    const updateUser = useCallback(async (userData: IUpdateUserData) => {
        const response = await api.put('/user', userData);

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
        async (avatar: string) => {
            let data: FormData | undefined;

            if (avatar) {
                data = new FormData();

                data.append('avatar', {
                    name: `${authData.user.id}.jpg`,
                    type: 'image/jpg',
                    uri: avatar,
                });
            }

            const response = await api.patch('/user/update-avatar', data);

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

    const setUserCompany = useCallback(
        async (isAdmin: boolean, companyId?: string) => {
            await AsyncStorage.setItem(
                '@Tradelous-user',
                JSON.stringify({ ...authData.user, isAdmin, companyId }),
            );

            setAuthData(data => {
                return {
                    ...data,
                    user: {
                        ...data.user,
                        isAdmin,
                        companyId,
                    },
                };
            });
        },
        [authData.user],
    );

    return (
        <authContext.Provider
            value={{
                user: authData.user,
                token: authData.token,
                signIn,
                signOut,
                updateUser,
                setUserCompany,
                updateUsersAvatar,
                isReady,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

const useAuth = (): IAuthContextData => useContext(authContext);

export { AuthContext, useAuth };
