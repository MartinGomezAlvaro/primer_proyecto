import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { UserProvider } from './context/UserContext.js';



import WelcomeScreen from './navigation/screens/WelcomeScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from './navigation/screens/LoginScreen';
import { RegisterScreen } from './navigation/screens/RegisterScreen';
import MainContainer from './navigation/MainContainers.js';
import SplashScreen from './navigation/screens/SplashScreen.js';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registro" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainContainer} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center', // Puedes ajustar esto según tus necesidades
    justifyContent: 'center', // Puedes ajustar esto según tus necesidades
  },
});


export default App;
