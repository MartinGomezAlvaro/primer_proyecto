// WelcomeScreen.js
import React from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function WelcomeScreen() {
  const image = require('../../images/busDeFrente.jpg');
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button color="rgb(0,0,0)" title='Iniciar Sesión' onPress={() => navigation.navigate('Login')} />
          </View>
          <View style={styles.button}>
            <Button color="rgb(0,0,0)" title='Registrarse' onPress={() => navigation.navigate('Registro')} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '100%',
  },
  button: {
    width: '45%', // Ajusta el ancho de los botones según sea necesario
  },
});

export default WelcomeScreen;
