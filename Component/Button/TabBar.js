import React, { useContext, useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import User from '../../page/user.js';
import MainHome from '../../page/mainhome.js';
import Home from '../../page/home.js';
import Order from '../../page/order.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBasketShopping, faHome, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context/AppContext.js';
import Noti from '../Login/notification.js';

const Tab = createMaterialBottomTabNavigator();


const MainTabNavigator = () => {

    const { subAmount, isLog } = useContext(AppContext)

    return (
        <Tab.Navigator
            activeColor="#3AC5C8"
            inactiveColor="white"
            barStyle={{ backgroundColor: '#111', height: 70, borderTopWidth: 1, borderColor: '#9e9ea0' }}
        >
            <Tab.Screen name="MainHome" component={MainHome}
                options={{
                    headerShown: false,
                    title: 'Trang chủ',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faHome} color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    title: 'Sản phẩm',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faList} color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen name="Order" component={Order} options={{
                headerShown: false,
                title: 'Đơn hàng',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
                tabBarBadge: subAmount,
                tabBarIcon: ({ color }) => (
                    <FontAwesomeIcon icon={faBasketShopping} color={color} size={20} />
                ),
            }}
            />
            <Tab.Screen name="User" component={User} options={{
                headerShown: false,
                title: 'Tài khoản',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
                tabBarIcon: ({ color }) => (
                    <FontAwesomeIcon icon={faUser} color={color} size={20} />
                ),
            }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;