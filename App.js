import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { UserProvider } from './context/UserContext.js';


import WelcomeScreen from './navigation/screens/WelcomeScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from './navigation/screens/LoginScreen';
import { RegisterScreen } from './navigation/screens/RegisterScreen';
import MainContainer from './navigation/MainContainers.js';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Main" component={MainContainer} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
    
  );
  
}

export default App;
