import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function ParadaNombreScreen() {
  const [parada, setParada] = useState('');
  const [buses, setBuses] = useState([]);
  const [selectedParada, setSelectedParada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const fetchBus = (paradaNombre) => {
    setLoading(true); // Mostrar el texto de carga al iniciar la búsqueda
    setErrorText(''); // Reiniciar el texto de error
    fetch(`https://api.tfl.gov.uk/StopPoint/Search?query=${paradaNombre}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLoading(false); // Ocultar el texto de carga al recibir la respuesta
        if (data.matches && data.matches.length > 0) {
          setBuses(data.matches);
        } else {
          setErrorText('No se encontraron paradas'); // Mostrar el texto de error si no se encontraron paradas
        }
      })
      .catch(error => {
        setLoading(false); // Ocultar el texto de carga en caso de error
        console.error('Error al obtener datos:', error);
        setErrorText('Error al obtener datos'); // Mostrar el texto de error si hay un error de red
      });
  };

  const handleBuscar = () => {
    if (parada) {
      fetchBus(parada);
    } else {
      setErrorText('Por favor, ingrese el nombre de la parada'); // Mostrar el texto de error si no se ingresa el nombre de la parada
    }
  };

  const renderParada = ({ item }) => (
    <TouchableOpacity style={styles.paradaCard} onPress={() => mostrarDetalleParada(item)}>
      <Text style={styles.paradaNombre}>{item.name}</Text>
    </TouchableOpacity>
  );

  const mostrarDetalleParada = (parada) => {
    setSelectedParada(parada);
    setModalVisible(true);
  };

  return (
    <LinearGradient style={styles.container} colors={["#ffffff", "#006400"]}>
      <Text style={styles.title}>Buscar Parada por Nombre</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={parada}
          onChangeText={text => setParada(text)}
          placeholder="Ingrese el nombre de la parada"
        />
        <Button  color= "rgb(0,0,0)" title="Buscar" onPress={handleBuscar} />
      </View>
      {loading && <Text style={styles.loadingText}>Cargando...</Text>}
      {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}
      {!loading && errorText === '' && (
        <FlatList
          data={buses}
          renderItem={renderParada}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {/* Ventana modal para mostrar detalles de la parada */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>DETALLES DE LA PARADA</Text>
            {selectedParada && (
              <>
                <Text style={styles.infoModalTitle}>Nombre:</Text>
                <Text style={styles.infoModal}>{selectedParada.name}</Text>
                <Text style={styles.infoModalTitle}>Tipo de transporte:</Text>
                <Text style={styles.infoModal}>{selectedParada.modes.join(', ')}</Text>
                <Text style={styles.infoModalTitle}>Latitud:</Text>
                <Text style={styles.infoModal}>{selectedParada.lat}</Text>
                <Text style={styles.infoModalTitle}>Longitud:</Text>
                <Text style={styles.infoModal}>{selectedParada.lon}</Text>
                <Text style={styles.infoModalTitle}>ID:</Text>
                <Text style={styles.infoModal}>{selectedParada.id}</Text>
              </>
            )}
            <Button color= "#006400" title="Cerrar" onPress={() => setModalVisible(false)} />
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
    textAlign: 'center',
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
  paradaCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  paradaNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  infoModalTitle: {
    color: 'white',
    textDecorationLine: 'underline',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  infoModal: {
    color: 'white',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
});
