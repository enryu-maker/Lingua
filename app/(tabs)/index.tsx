
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { SplashScreen } from 'expo-router';
import AppScreen from '../Screens/HomeScreen'
import LoginScreen from '../Screens/LoginScreen'
import SplashScreen from '../Screens/SplashScreen'
import SignupScreen from '../Screens/SignupScreen'
import SpeakScreen from '../Screens/SpeakScreen'



const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={AppScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Speak" component={SpeakScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
