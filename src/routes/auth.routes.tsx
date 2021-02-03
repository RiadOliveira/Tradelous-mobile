import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SignUpCompany from '../pages/SignUpCompany';
import PasswordRecovery from '../pages/PasswordRecovery';

const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpCompany" component={SignUpCompany} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
    </Stack.Navigator>
);

export default AuthRoutes;
