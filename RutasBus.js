import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView, TouchableOpacity, Modal } from 'react-native';

const BusRouteScreen = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [busRoutes, setBusRoutes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [coordinates, setCoordinates] = useState('');

  const fetchBusRoutes = () => {
    fetch(`https://api.tfl.gov.uk/Journey/JourneyResults/${origin}/to/${destination}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBusRoutes(data.journeys);
      })
      .catch(error => console.error('Error fetching bus routes:', error));
  };

  const fetchCoordinates = () => {
    const encodedPlaceName = encodeURIComponent(placeName);
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodedPlaceName}&format=json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          const firstResult = data[0];
          const lat = firstResult.lat;
          const lon = firstResult.lon;
          const coords = `${lat}, ${lon}`;
          setCoordinates(coords);
        } else {
          setCoordinates('No se encontraron coordenadas para el lugar especificado');
        }
      })
      .catch(error => console.error('Error fetching coordinates:', error));
  };

  const renderItem = (route, index) => (
    <TouchableOpacity key={index} style={styles.routeCard}>
      <View>
        <Text style={styles.routeTitle}>Salida:</Text>
        <Text>{route.startDateTime}</Text>
      </View>
      <View>
        <Text style={styles.routeTitle}>Llegada:</Text>
        <Text>{route.arrivalDateTime}</Text>
      </View>
      <View>
        <Text style={styles.routeTitle}>Duración:</Text>
        <Text>{route.duration} minutos</Text>
      </View>
      <Text style={styles.routeTitle}>Instrucciones / Guía :</Text>
      {route.legs.map((leg, index) => (
        <Text key={index} style={styles.routeStep}>{leg.instruction.summary}</Text>
      ))}
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buscar Rutas de Autobús</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={origin}
          onChangeText={text => setOrigin(text)}
          placeholder="Origen"
        />
        <TextInput
          style={styles.input}
          value={destination}
          onChangeText={text => setDestination(text)}
          placeholder="Destino"
        />
        <View style={styles.buttonContainer}>
          <Button 
            title="Buscar Ruta" 
            onPress={fetchBusRoutes} 
          />
          <Button 
            title="Obtener Coordenadas" 
            onPress={() => setModalVisible(true)} 
          />
        </View>
      </View>
      {busRoutes.map((route, index) => renderItem(route, index))}

      {/* Ventana emergente para obtener coordenadas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              value={placeName}
              onChangeText={text => setPlaceName(text)}
              placeholder="Nombre del lugar"
            />
            <Button 
              title="Obtener" 
              onPress={fetchCoordinates} 
              style={{ marginTop: 20, marginBottom: 20 }} // Ajusta el valor de marginTop según sea necesario
            />
            <TextInput
              style={[styles.input, { marginTop: 20 }]}
              value={coordinates}
              placeholder="Coordenadas"
              editable={true}
            />
            <Button 
              title="Cerrar" 
              onPress={() => setModalVisible(false)} 
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%'
  },
  routeCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  routeTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  routeStep: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingBottom: 50, // Ajusta este valor para aumentar el espacio
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%'
  },
});

export default BusRouteScreen;
