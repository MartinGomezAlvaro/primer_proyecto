import React, { useEffect } from 'react';
import { View, Animated, Easing, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const animation = new Animated.Value(400);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: -600,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 3000, // Reducimos la duración de la animación de opacidad del texto "Hola"
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          navigation.replace('Welcome');
        }, 2000); // Ajustamos el tiempo antes de navegar a HomeScreen
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../images/bus.jpg')} // Cambia esto por la ruta de la imagen de tu autobús
        style={[
          styles.bus,
          {
            transform: [
              {
                translateX: animation,
              },
            ],
          },
        ]}
      />
      <Animated.Text
        style={[
          styles.text,
          {
            opacity: opacity,
            fontSize: 32, // Ajustamos el tamaño del texto
            textAlign: 'center', // Centramos el texto
          },
        ]}
      >
        Hola
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  bus: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default SplashScreen;
