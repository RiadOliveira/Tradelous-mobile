import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { ActivityIndicator } from 'react-native';

const Routes: React.FC = () => {
    const { user, isReady } = useAuth();

    return (
        <NavigationContainer>
            {!isReady ? (
                <ActivityIndicator
                    size={64}
                    color="#374b92"
                    style={{ backgroundColor: '#49b454', flex: 1 }}
                />
            ) : (
                <>{user ? <AppRoutes /> : <AuthRoutes />}</>
            )}
        </NavigationContainer>
    );
};

export default Routes;
