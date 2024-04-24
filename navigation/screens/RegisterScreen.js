import React, { useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal, ToastAndroid } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import appFirebase from "../../database/firebase";
import { getDocs, collection, query, where, getFirestore, addDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { LinearGradient } from 'expo-linear-gradient';

const db = getFirestore(appFirebase);

export function RegisterScreen() {

  const { correo, password, edad, nombre, setCorreo, setPassword, setEdad, setNombre } = useContext(UserContext);
  const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);
  const navigation = useNavigation();

  const registerNewUser = async () => {
      try {
        if (!nombre || !correo || !password || !edad) {
          setModalVisibleSuccess(true);
        } else {
          // Verificar si el correo ya está registrado
          const correoExistenteQuery = query(collection(db, 'usuarios'), where('correo', '==', correo));
          const correoExistenteSnapshot = await getDocs(correoExistenteQuery);
          if (!correoExistenteSnapshot.empty) {
            ToastAndroid.showWithGravityAndOffset(
              'Ya existe una cuenta asociada a este correo .',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          } else {
            // Si el correo no existe, agregar el nuevo usuario a la base de datos
            await addDoc(collection(db, 'usuarios'), {
              contrasena: password,
              correo: correo,
              edad: edad,
              nombre: nombre
            });
            alert("Guardado exitosamente");
            navigation.navigate('Main');
            ToastAndroid.showWithGravityAndOffset(
              'Usuario creado correctamente',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        }
      } catch (error) {
        console.error("Error al guardar el usuario:", error);
        // Manejar el error según sea necesario
      }
  }

  return (
    <LinearGradient style={styles.container} colors={["#ffffff", "#006400"]}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={newValor => setNombre(newValor)}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        onChangeText={newValor => setEdad(newValor)}
        value={edad}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={newValor => setCorreo(newValor)}
        value={correo}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={newValor => setPassword(newValor)}
        value={password}
        secureTextEntry={true}
      />
      <Button color= "rgb(0,0,0)" name='Main' title='Acceder' onPress={() => registerNewUser()} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleSuccess}
        onRequestClose={() => setModalVisibleSuccess(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Por favor, rellene todos los campos</Text>
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
