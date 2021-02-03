import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';
import SignUpCompany from '../pages/SignUpCompany';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="SignUpCompany" component={SignUpCompany} />
    </Stack.Navigator>
);

export default AppRoutes;
