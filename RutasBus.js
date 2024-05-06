import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BusRouteScreen = () => {
  const navigation = useNavigation();

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [busRoutes, setBusRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [originCoordinates, setOriginCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  const fetchCoordinates = (placeName) => {
    setLoading(true);
    setErrorText('');
    const encodedPlaceName = encodeURIComponent(placeName);
    return fetch(`https://nominatim.openstreetmap.org/search?q=${encodedPlaceName}&format=json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          const firstResult = data[0];
          const lat = parseFloat(firstResult.lat);
          const lon = parseFloat(firstResult.lon);
          return { latitude: lat, longitude: lon };
        } else {
          throw new Error('No se encontraron coordenadas');
        }
      })
      .catch(error => {
        console.error('Error fetching coordinates:', error);
        throw error;
      });
  };

  const fetchBusRoutes = () => {
    if (!origin || !destination) {
      setLoading(false);
      setErrorText('Es obligatorio rellenar ambos campos');
      console.error('Origin and destination are required');
      return;
    }

    setLoading(true);
    setErrorText('');

    fetchCoordinates(origin)
      .then(originCoords => {
        setOriginCoordinates(originCoords);
        fetchCoordinates(destination)
          .then(destinationCoords => {
            setDestinationCoordinates(destinationCoords);
            fetch(`https://api.tfl.gov.uk/Journey/JourneyResults/${originCoords.latitude},${originCoords.longitude}/to/${destinationCoords.latitude},${destinationCoords.longitude}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                setLoading(false);
                if (data.journeys && data.journeys.length > 0) {
                  setBusRoutes(data.journeys);
                } else {
                  setErrorText('No se encontraron rutas');
                }
              })
              .catch(error => {
                setLoading(false);
                console.error('Error fetching bus routes:', error);
                setErrorText('No se encontraron rutas');
              });
          });
      })
      .catch(error => console.error('Error fetching coordinates:', error));
  };

  const navigateToMapScreen = () => {
    navigation.navigate('Maps', { originCoordinates, destinationCoordinates });
  };

  const renderItem = (route, index) => (
    <View key={index} style={styles.routeCard}>
      <View style={styles.routeContent}>
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
          <Text key={index} style={styles.routeStep}>- {leg.instruction.summary}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.mapIcon} onPress={navigateToMapScreen}>
        <Ionicons name="map" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={["#ffffff", "#006400"]} style={styles.container}>
      <ScrollView>
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
              color= "rgb(0,0,0)"
              title="Buscar Ruta" 
              onPress={fetchBusRoutes} 
            />
          </View>
        </View>
        {loading && <Text style={styles.loadingText}>Cargando...</Text>}
        {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}
        {!loading && errorText === '' && busRoutes.map((route, index) => renderItem(route, index))}
      </ScrollView>
    </LinearGradient>    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    textAlign: 'center',
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
    width: '100%',
  },
  routeCard: {
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  routeContent: {
    flex: 1, 
    padding: 10,
  },
  routeTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  routeStep: {
    marginLeft: 10,
  },
  mapIcon: {
    padding: 10,
  },
  buttonContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
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

export default BusRouteScreen;
