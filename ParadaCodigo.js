import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Modal, TouchableOpacity, Share} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from './context/UserContext';
import { useContext } from "react"
import firebase from './database/firebase';
import appFirebase from './database/firebase';
import { addDoc, collection, getDocs, getFirestore, deleteDoc, doc, query, where } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';


const db = getFirestore(appFirebase)

export default function ParadaCodigo() {

  const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);
  const {correo} = useContext(UserContext)

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
  
    if (!favoritos[id]) {
      setFavoritos(prevState => ({
        ...prevState,
        [id]: true
      }));
  
      try {
        await addDoc(collection(db, 'tarjetas'), {
          desino: item.destinationName,
          estado: true,
          horaSalida: item.expectedArrival,
          parada: item.stationName,
          ruta: item.lineName,
          correoUsuario: correo
        });
        // Mostrar el modal de éxito
        setModalVisibleSuccess(true);
        setTimeout(() => {
          setFavoritos(prevState => ({
            ...prevState,
            [id]: false
          }));
        }, 2500); // Después de 2.5 segundos, establece el estado de la estrella de nuevo a false
      } catch (error) {
        console.error("Error al guardar la tarjeta:", error);
      }
    }
  };

  const handleCompartir = async ({item}) => {
    try {
      const result = await Share.share({
        message:
        `Datos de la parada:\nRuta: ${item.lineName}\nHora de salida: ${item.expectedArrival}\nParada: ${item.stationName}\nDestino: ${item.destinationName}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }
  

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
      <View style={styles.compartir}>
        <IconButton
          iconName={favoritos[item.id] ? 'star' : 'star-outline'}
          onPress={() => handleAgregarFavorito(item)}
          item={item} // Pasar el objeto item como argumento adicional
        />
        <TouchableOpacity onPress={() => handleCompartir({item})} style={styles.botonCompartir}>
          <Ionicons name="share" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const IconButton = ({ iconName, onPress, item }) => ( // Añadir item como argumento
    <Ionicons name={iconName} size={24} color={favoritos[item.id] ? 'yellow' : 'black'} onPress={onPress} />
  );

  return (
    <LinearGradient style={styles.container} colors={["#ffffff", "#006400"]}>
      <Text style={styles.title}>Buscar Próximos Autobuses</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={parada}
          onChangeText={text => setParada(text)}
          placeholder="Ingrese el identificador de la parada"
        />
        <Button  color= "rgb(0,0,0)" title="Buscar" onPress={handleBuscar} />
      </View>
      <FlatList
        data={buses}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal para mostrar el mensaje de éxito */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleSuccess}
        onRequestClose={() => setModalVisibleSuccess(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Guardado correctamente</Text>
            <Button color= "#006400" title="OK" onPress={() => setModalVisibleSuccess(false)} />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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
  // Estilos para el modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  modalText: {
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  compartir: {
    flexDirection: 'row',
  },
  botonCompartir: {
    marginLeft: 20,
  },
});
