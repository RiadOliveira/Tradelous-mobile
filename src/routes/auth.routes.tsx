import React from 'react';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import RegisterCompany from '../pages/Authentication/RegisterCompany';
import ForgotPassword from '../pages/Authentication/ForgotPassword';
import RecoverPassword from '../pages/Authentication/RecoverPassword';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="RegisterCompany" component={RegisterCompany} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
    </Stack.Navigator>
);

export default AuthRoutes;
