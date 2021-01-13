import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../pages/SignIn';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignUp} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;
