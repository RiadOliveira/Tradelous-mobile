import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import LoadingIndicator from '@components/LoadingIndicator';

const Routes: React.FC = () => {
    const { user, isReady } = useAuth();

    return (
        <NavigationContainer>
            {!isReady ? (
                <LoadingIndicator />
            ) : (
                <>{user ? <AppRoutes /> : <AuthRoutes />}</>
            )}
        </NavigationContainer>
    );
};

export default Routes;
