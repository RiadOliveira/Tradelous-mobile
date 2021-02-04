import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from './Products';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const Dashboard: React.FC = () => {
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
                },
            }}
        >
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
