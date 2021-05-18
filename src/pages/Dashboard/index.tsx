import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from './Products';
import Profile from './Profile';
import RegisterProduct from './RegisterProduct';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCamera } from '../../hooks/camera';
import { useAuth } from '../../hooks/auth';

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
                    color: 'black',
                },
                allowFontScaling: true,
                style: {
                    borderTopColor: '#4058af',
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
                        }}
                        name="Estoque"
                        component={Products}
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
                        }}
                        name="Cadastrar produto"
                        component={RegisterProduct}
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
                }}
                name="Perfil"
                component={Profile}
            />
        </Tab.Navigator>
    );
};

export default Dashboard;
