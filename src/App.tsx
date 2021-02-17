import * as React from 'react';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PersistGate} from 'redux-persist/integration/react';

import createStore from './Stores';
import HomeScreen from './Containers/HomeScreen';
import DetailsScreen from './Containers/DetailsScreen';
import FavoritesScreen from './Containers/FavoritesScreen';

const {store, persistor} = createStore();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const FavoritesStack = createStackNavigator();

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} />
      <FavoritesStack.Screen name="Details" component={DetailsScreen} />
    </FavoritesStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

type IconTypes = {
  focused: boolean;
  color: string;
  size: number;
};

const TabBarIcon = (name: string) => ({focused, color, size}: IconTypes) => {
  let iconName: string = '';

  if (name === 'Home') {
    iconName = focused ? 'ios-home' : 'ios-home-outline';
  } else if (name === 'Favorites') {
    iconName = focused ? 'star' : 'star-outline';
  }

  // You can return any component that you like here!
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: TabBarIcon(route.name),
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
