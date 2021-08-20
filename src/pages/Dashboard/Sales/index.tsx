import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SalesList from './SalesList';
import EditSale from './EditSale';

const Stack = createStackNavigator();

const SalesRoutes: React.FC = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SalesList" component={SalesList} />
        <Stack.Screen name="EditSale" component={EditSale} />
    </Stack.Navigator>
);

export default SalesRoutes;
