import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import RegisterProduct from './RegisterProduct';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCamera } from '@hooks/camera';
import { useAuth } from '@hooks/auth';
import ProductsRoutes from './Products';
import CompanyRoutes from './Company';

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
                    color: '#1c274e',
                },
                allowFontScaling: true,
                style: {
                    borderTopColor: '#1c274e',
                    borderTopWidth: 1,
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
                                    size={30}
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

            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="person"
                            size={22}
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
