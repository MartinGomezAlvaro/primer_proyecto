import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainContainer } from '../MainContainers';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import appFirebase from '../../database/firebase';
import { LinearGradient } from 'expo-linear-gradient';

const db = getFirestore(appFirebase);

const Stack = createStackNavigator();

export function LoginScreen() {

  const navigation = useNavigation();
  const { correo, password, setCorreo, setPassword, setEdad, setNombre } = useContext(UserContext);
  const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);

  const checkUserCredentials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'usuarios'));
      const users = querySnapshot.docs.map(doc => doc.data());
      const foundUser = users.find(user => user.correo === correo && user.contrasena === password);
      if (foundUser) {
        const { edad, nombre } = foundUser;
        setEdad(edad); // Actualizar la edad en el contexto
        setNombre(nombre); // Actualizar el nombre en el contexto
        navigation.navigate('Main');
      } else {
        setModalVisibleSuccess(true);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      // Manejar el error según sea necesario
    }
  };

  return (
    <LinearGradient style={styles.container} colors={["#ffffff", "#006400"]}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={newValor => setCorreo(newValor)}
        value={correo}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={newValor => setPassword(newValor)}
        value={password}
        secureTextEntry={true}
      />
      <Button color= "rgb(0,0,0)" name='Main' title='Acceder' onPress={checkUserCredentials} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleSuccess}
        onRequestClose={() => setModalVisibleSuccess(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>No existe un usuario con esos datos</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
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
});
