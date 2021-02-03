import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './auth.routes';
import { useAuth } from '../hooks/auth';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
};

export default Routes;
