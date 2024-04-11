// WelcomeScreen.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';
import { useNavigation } from '@react-navigation/native';


function WelcomeScreen  ()  {

  const navigation = useNavigation();
  return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido!</Text>
            <View style={styles.buttonContainer}>
                <Button  name='Login' title='Iniciar Sesion' onPress={() => navigation.navigate('Login')}/>
                <Button  name='Register' title='Registrarse' onPress={() => navigation.navigate('Register')}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WelcomeScreen;
