import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [salida, setSalida] = React.useState('');
  const [destino, setDestino] = React.useState('');
  const [coordenadas, setCoordenadas] = React.useState({ latitude: 51.5074, longitude: -0.1278 }); // Coordenadas de Londres

  const buscarRuta = () => {
    // Aquí puedes implementar la lógica para buscar la ruta entre salida y destino
    // Esto podría implicar hacer una solicitud a un servicio de mapas como Google Maps
    // o cualquier otro servicio de mapas que prefieras.
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        ...coordenadas,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        <Marker coordinate={coordenadas} />
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={salida}
          onChangeText={text => setSalida(text)}
          placeholder="Salida"
        />
        <TextInput
          style={styles.input}
          value={destino}
          onChangeText={text => setDestino(text)}
          placeholder="Destino"
        />
        <Button title="Buscar Ruta" onPress={buscarRuta} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    searchContainer: {
      position: 'absolute',
      top: 20,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      zIndex: 1000,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 5,
      paddingVertical: 10, // Cambiado de padding a paddingVertical para espacio vertical
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    input: {
      flex: 1, // Para que ocupe todo el espacio disponible
      height: 40,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      borderRadius: 5,
      marginRight: 10,
    },
  });

export default MapScreen;
