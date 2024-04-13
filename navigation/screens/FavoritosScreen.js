import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, updateDoc, doc, query, where, deleteDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserContext"
import { useContext } from "react"
import { Ionicons } from '@expo/vector-icons';
import appFirebase from '../../database/firebase';

const db = getFirestore(appFirebase);

export default function Favoritos() {

  const { correo } = useContext(UserContext)

  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    obtenerFavoritosFirestore();
  }, []);

  const obtenerFavoritosFirestore = async () => {
    try {
      const q = query(collection(db, 'tarjetas'), where('correoUsuario', '==', correo));
      const querySnapshot = await getDocs(q);
      const favoritosData = [];
      querySnapshot.forEach((doc) => {
        const { desino, parada, horaSalida, ruta, estado } = doc.data();
        favoritosData.push({
          id: doc.id,
          desino,
          parada,
          horaSalida,
          ruta,
          estado,
        });
      });
      setFavoritos(favoritosData);
    } catch (error) {
      console.error('Error al obtener favoritos de Firestore:', error);
    }
  };

  const handleActualizar = () => {
    obtenerFavoritosFirestore();
  };

  const renderItem = ({ item }) => (
    <View style={styles.pokemonBlock}>
      <Text style={styles.datosTitle}>Ruta:</Text>
      <Text>{item.ruta}</Text>
      <Text style={styles.datosTitle}>Hora de salida:</Text>
      <Text>{item.horaSalida}</Text>
      <Text style={styles.datosTitle}>Parada:</Text>
      <Text>{item.parada}</Text>
      <Text style={styles.datosTitle}>Destino:</Text>
      <Text>{item.desino}</Text>
      <IconButton
        iconName={item.estado ? 'star' : 'star-outline'}
        onPress={() => handleToggleFavorite(item.id, item.estado)}
      />
    </View>
  );

  const handleToggleFavorite = async (itemId, estadoActual) => {
    try {
      if (estadoActual) {
        // Si el estado actual es verdadero (amarillo), eliminamos la tarjeta
        await deleteFavorite(itemId);
      } else {
        // Si el estado actual es falso (blanco), actualizamos el estado de favorito
        await updateFavoriteStatus(itemId, !estadoActual);
      }
      setFavoritos((prevFavorites) =>
        prevFavorites.map((item) =>
          item.id === itemId ? { ...item, estado: !item.estado } : item
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado de favorito:', error);
    }
  };

  const deleteFavorite = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'tarjetas', itemId));
      console.log('Tarjeta eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la tarjeta de favoritos:', error);
      throw error;
    }
  };

  const updateFavoriteStatus = async (itemId, newStatus) => {
    try {
      await updateDoc(doc(db, 'tarjetas', itemId), { estado: newStatus });
      console.log('Estado de favorito actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el estado de favorito en Firestore:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actualizarButton} onPress={handleActualizar}>
        <Ionicons name="refresh" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={favoritos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const IconButton = ({ iconName, onPress }) => (
  <Ionicons name={iconName} size={24} color={iconName === 'star' ? 'yellow' : 'black'} onPress={onPress} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
  actualizarButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
});
