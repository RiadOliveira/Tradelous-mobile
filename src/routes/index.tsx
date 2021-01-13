import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../pages/SignUp';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="SignUp">
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;
