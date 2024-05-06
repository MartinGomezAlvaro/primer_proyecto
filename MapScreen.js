import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const [originCoordinates, setOriginCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  useEffect(() => {
    if (route.params && route.params.originCoordinates) {
      setOriginCoordinates(route.params.originCoordinates);
    }
    if (route.params && route.params.destinationCoordinates) {
      setDestinationCoordinates(route.params.destinationCoordinates);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={originCoordinates ? { ...originCoordinates, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } : null}>
        {originCoordinates && <Marker coordinate={originCoordinates} title="Origen" pinColor="red" />}
        {destinationCoordinates && <Marker coordinate={destinationCoordinates} title="Destino" pinColor="blue" />}
      </MapView>
      <View style={styles.legendContainer}>
        <View style={styles.legendBackground}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: 'red' }]} />
            <Text style={styles.legendText}>Origen</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: 'blue' }]} />
            <Text style={styles.legendText}>Destino</Text>
          </View>
        </View>
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
  legendContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
  },
  legendBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    color: 'white',
  },
});

export default MapScreen;
