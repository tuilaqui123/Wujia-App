import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import User from './page/user.js';
import Login from './page/login.js';
import MainHome from './page/mainhome.js';
import Home from './page/home.js';
import Order from './page/order.js';
import Pay from './page/Pay.js';
import ItemPopup from './page/itemPopup.js';
import Register from './page/register.js';
import { AppProvider } from './context/AppContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBasketShopping, faHome, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import MainTabNavigator from './Component/Button/TabBar.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Pay" component={Pay} options={{ headerShown: false }} />
          <Stack.Screen name="ItemPopup" component={ItemPopup} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}