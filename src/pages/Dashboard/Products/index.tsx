import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsList from './ProductsList';
import ProductDescription from './ProductDescription';

const Stack = createStackNavigator();

const ProductsRoutes: React.FC = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProductsList" component={ProductsList} />
        <Stack.Screen
            name="ProductDescription"
            component={ProductDescription}
        />
    </Stack.Navigator>
);

export default ProductsRoutes;
