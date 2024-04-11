import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from './database/firebase';
import appFirebase from './database/firebase';
import { addDoc, collection, getDoc, getFirestore } from "firebase/firestore";


const db = getFirestore(appFirebase)

export default function ParadaCodigo() {
  const [buses, setBuses] = useState([]);
  const [parada, setParada] = useState('');
  const [favoritos, setFavoritos] = useState({}); // Estado para almacenar favoritos


  const fetchBus = (parada) => {
    fetch(`https://api.tfl.gov.uk/StopPoint/${parada}/Arrivals`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Mostrar los datos en la consola
        // Inicializa el estado de favoritos para cada nuevo conjunto de datos
        const favoritosInicial = {};
        data.forEach(item => {
          favoritosInicial[item.id] = false;
        });
        setFavoritos(favoritosInicial);
        setBuses(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  };

  const handleBuscar = () => {
    if (parada) {
      fetchBus(parada); // Aquí se pasa el valor de 'parada' a la función fetchBus
    } else {
      console.log('Por favor, ingrese un código de parada');
    }
  };

  const handleAgregarFavorito = async (item) => {
    const { id } = item;

  // Verificar si la estrella pasa de estar en blanco a amarillo
  if (!favoritos[id]) { // Si el estado anterior de la estrella es false (blanco) y el nuevo estado es true (amarillo)
    // Cambiar el estado local de favoritos
    setFavoritos(prevState => ({
      ...prevState,
      [id]: true // Cambiar el estado de false (blanco) a true (amarillo)
    }));

    try {
      // Agregar la tarjeta a la base de datos
      await addDoc(collection(db, 'tarjetas'), {
        desino: item.destinationName,
        estado: true,
        horaSalida: item.expectedArrival,
        parada: item.stationName,
        ruta: item.lineName
      });
      alert("Guardado exitosamente");
    } catch (error) {
      console.error("Error al guardar la tarjeta:", error);
      // Manejar el error según sea necesario
    }
  } else {
    // Cambiar el estado local de favoritos
    setFavoritos(prevState => ({
      ...prevState,
      [id]: false // Cambiar el estado de true (amarillo) a false (blanco)
    }));
  }
  
  };
  
  
  
  
  
  const renderItem = ({ item }) => (
    <View style={styles.pokemonBlock}>
      <Text style={styles.datosTitle}>Ruta:</Text>
      <Text>{item.lineName}</Text>
      <Text style={styles.datosTitle}>Hora de salida:</Text>
      <Text>{item.expectedArrival}</Text>
      <Text style={styles.datosTitle}>Parada:</Text>
      <Text>{item.stationName}</Text>
      <Text style={styles.datosTitle}>Destino:</Text>
      <Text>{item.destinationName}</Text>
      <IconButton
        iconName={favoritos[item.id] ? 'star' : 'star-outline'}
        onPress={() => handleAgregarFavorito(item)}
        item={item} // Pasar el objeto item como argumento adicional
      />
    </View>
  );

  const IconButton = ({ iconName, onPress, item }) => ( // Añadir item como argumento
    <Ionicons name={iconName} size={24} color={favoritos[item.id] ? 'yellow' : 'black'} onPress={onPress} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paradas de Autobús</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={parada}
          onChangeText={text => setParada(text)}
          placeholder="Ingrese el código de la parada"
        />
        <Button title="Buscar" onPress={handleBuscar} />
      </View>
      <FlatList
        data={buses}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85B4F4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  datosTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  pokemonBlock: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20, // Aumenta el padding para hacer las tarjetas más grandes
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
