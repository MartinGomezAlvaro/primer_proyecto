import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal } from 'react-native';

export default function ParadaNombreScreen() {
  const [parada, setParada] = useState('');
  const [buses, setBuses] = useState([]);
  const [selectedParada, setSelectedParada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchBus = (paradaNombre) => {
    fetch(`https://api.tfl.gov.uk/StopPoint/Search?query=${paradaNombre}`)
      .then(response => response.json())
      .then(data => {
        setBuses(data.matches);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  };

  const handleBuscar = () => {
    if (parada) {
      fetchBus(parada);
    } else {
      console.log('Por favor, ingrese el nombre de la parada');
    }
  };

  const renderParada = ({ item }) => (
    <TouchableOpacity style={styles.paradaCard} onPress={() => mostrarDetalleParada(item)}>
      <Text style={styles.paradaNombre}>{item.name}</Text>
      <Text style={styles.paradaId}>ID: {item.id}</Text>
    </TouchableOpacity>
  );

  const mostrarDetalleParada = (parada) => {
    setSelectedParada(parada);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Parada por Nombre</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={parada}
          onChangeText={text => setParada(text)}
          placeholder="Ingrese el nombre de la parada"
        />
        <Button title="Buscar" onPress={handleBuscar} />
      </View>
      <FlatList
        data={buses}
        renderItem={renderParada}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* Ventana modal para mostrar detalles de la parada */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Detalles de la parada</Text>
            {selectedParada && (
              <>
                <Text>Nombre: {selectedParada.name}</Text>
                <Text>Tipo de transporte: {selectedParada.modes.join(', ')}</Text>
                <Text>Zona: {selectedParada.zone}</Text>
                <Text>Latitud: {selectedParada.lat}</Text>
                <Text>Longitud: {selectedParada.lon}</Text>
              </>
            )}
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
  paradaId: {
    fontSize: 16,
    color: 'grey',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
