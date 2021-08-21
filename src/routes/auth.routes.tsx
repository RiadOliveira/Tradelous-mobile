import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import RegisterCompany from '../pages/Authentication/RegisterCompany';
import PasswordRecovery from '../pages/Authentication/PasswordRecovery';

const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="RegisterCompany" component={RegisterCompany} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
    </Stack.Navigator>
);

export default AuthRoutes;
