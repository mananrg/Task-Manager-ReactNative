import React from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import LoginScreen from "../Screens/LoginScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import HomeScreen from "../Screens/HomeScreen";
import LeaderBoardScreen from "../Screens/LeaderBoard";
import { signOutUser } from '../Firebase/auth';
import { Alert } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const handleSignOut = async (navigation) => {
  try {
    await signOutUser();
    navigation.navigate('Login');
    Alert.alert("Logout Successful!");
  } catch (error) {
    Alert.alert(error.message);
  }
};
const MainTabNavigator = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
    
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Leader') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          }else if (route.name === 'Logout') {
            iconName = 'log-out';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#eeeeee', 
        },
        tabBarItemStyle: {
          marginVertical: 5, 
        },
        tabBarActiveTintColor: '#6C63FF', 
        tabBarInactiveTintColor: 'gray', 
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Leader" component={LeaderBoardScreen} />
      <Tab.Screen
        name="Logout"
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); 
            handleSignOut(navigation); 
          },
        }}
        component={() => null} 
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
