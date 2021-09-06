import React from 'react';
import Profile from './Profile';
import RegisterProduct from './RegisterProduct';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductsRoutes from './Products';
import CompanyRoutes from './Company';
import SalesRoutes from './Sales';
import RegisterCompany from '../Authentication/RegisterCompany';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useCamera } from '@hooks/camera';
import { useAuth } from '@hooks/auth';

const Tab = createBottomTabNavigator();

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { isCameraVisible } = useCamera();

    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 10,
                    color: '#000',
                },
                allowFontScaling: true,
                tabStyle: {},
                style: {
                    height: 52,
                    display: isCameraVisible ? 'none' : 'flex',
                },
            }}
        >
            {user.companyId && (
                <>
                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Icon
                                    name="inventory"
                                    size={22}
                                    color={focused ? '#1c274e' : '#4058af'}
                                />
                            ),
                            tabBarLabel: 'Estoque',
                        }}
                        name="Products"
                        component={ProductsRoutes}
                    />
                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Icon
                                    name="add"
                                    size={31}
                                    color={focused ? '#1c274e' : '#4058af'}
                                />
                            ),
                            tabBarLabel: 'Novo produto',
                            unmountOnBlur: true,
                        }}
                        name="RegisterProduct"
                        component={RegisterProduct}
                    />
                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Icon
                                    name="shopping-bag"
                                    size={27}
                                    color={focused ? '#1c274e' : '#4058af'}
                                />
                            ),
                            tabBarLabel: 'Vendas',
                        }}
                        name="Sales"
                        component={SalesRoutes}
                    />
                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Icon
                                    name="business"
                                    size={28}
                                    color={focused ? '#1c274e' : '#4058af'}
                                />
                            ),
                            tabBarLabel: 'Empresa',
                        }}
                        name="Company"
                        component={CompanyRoutes}
                    />
                </>
            )}

            {!user.companyId && (
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name="business"
                                size={28}
                                color={focused ? '#1c274e' : '#4058af'}
                            />
                        ),
                        tabBarLabel: 'Registrar empresa',
                    }}
                    name="RegisterCompany"
                    component={RegisterCompany}
                />
            )}

            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="person"
                            size={28}
                            color={focused ? '#1c274e' : '#4058af'}
                        />
                    ),
                    tabBarLabel: 'Perfil',
                }}
                name="Profile"
                component={Profile}
            />
        </Tab.Navigator>
    );
};

export default Dashboard;
