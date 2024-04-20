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
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          navigation.replace('Welcome');
        }, 2000);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../images/bus.jpg')}
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
      <Animated.Image
        source={require('../../images/BussAPI.jpg')}
        style={[
          styles.bussAPI,
          {
            opacity: opacity,
          },
        ]}
      />
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
    position: 'absolute', // Posiciona la imagen absolutamente
    top: '50%', // La posiciona en la mitad vertical del contenedor
    marginTop: -50, // Ajusta la posición para centrarla completamente
  },
  bussAPI: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: -40, // Mueve la imagen hacia arriba
  },
});

export default SplashScreen;
