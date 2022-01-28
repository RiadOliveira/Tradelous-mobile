import React from 'react';
import Dashboard from '../pages/Dashboard';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
);

export default AppRoutes;
