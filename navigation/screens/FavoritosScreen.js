import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  // Función para obtener los datos del AsyncStorage y actualizar el estado de favoritos
  const obtenerFavoritosLocalStorage = async () => {
    try {
      const favoritosStorage = await AsyncStorage.getItem('favoritos');
      if (favoritosStorage) {
        console.log('Datos de favoritos obtenidos del AsyncStorage:', favoritosStorage);
        setFavoritos(JSON.parse(favoritosStorage));
      } else {
        console.log('No hay datos de favoritos en el AsyncStorage');
      }
    } catch (error) {
      console.error('Error al obtener favoritos del AsyncStorage:', error);
    }
  };
  

  // Función para renderizar cada tarjeta de favorito
  const renderItem = ({ item }) => (
    <View style={styles.pokemonBlock}>
      <Text style={styles.datosTitle}>Ruta:</Text>
      <Text>{item.lineName}</Text>
      <Text style={styles.datosTitle}>Hora de salida:</Text>
      <Text>{new Date(item.expectedArrival).toLocaleTimeString()}</Text>
      <Text style={styles.datosTitle}>Parada:</Text>
      <Text>{item.stationName}</Text>
      <Text style={styles.datosTitle}>Destino:</Text>
      <Text>{item.destinationName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <FlatList
        data={favoritos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  datosTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pokemonBlock: {
    backgroundColor: '#85B4F4',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
