import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CompanySummary from './CompanySummary';
import EditCompany from './EditCompany';

const Stack = createStackNavigator();

const CompanyRoutes: React.FC = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CompanySummary" component={CompanySummary} />
        <Stack.Screen name="EditCompany" component={EditCompany} />
    </Stack.Navigator>
);

export default CompanyRoutes;
