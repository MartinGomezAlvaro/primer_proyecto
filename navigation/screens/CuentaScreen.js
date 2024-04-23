import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import appFirebase from '../../database/firebase';
import { initializeAnalytics } from "firebase/analytics";
import { LinearGradient } from 'expo-linear-gradient';

const db = getFirestore(appFirebase);

export function CuentaScreen() {

    const navigation = useNavigation();  
    const { correo, password, nombre, edad, clearData} = useContext(UserContext);

    const initialState = {
        correo: correo,
        nombre: nombre,
        edad: edad,
        contrasena: password,
    };
  
    const [user, setUser] = useState(initialState)
    const [isDirty, setIsDirty] = useState(false); // Estado para rastrear si se han realizado cambios

    const handleTextChange = (value, prop) => {
        setUser({ ...user, [prop]: value });
      };
  
    // Función para manejar la actualización de datos
    const actualizarDatos = async () => {
        try {
            if(user.contrasena === '' || user.nombre === '' || user.edad === ''){
              Alert.alert("No se permite actualizar campos vacíos");
            }else{
              // Consulta para encontrar el documento con el correo electrónico dado
              const querySnapshot = await getDocs(collection(db, 'usuarios'));
              querySnapshot.forEach(async (doc) => {
                  if (doc.data().correo === correo) { // Verifica si el correo coincide
                      await updateDoc(doc.ref, {  // Actualiza el documento encontrado
                          contrasena: user.contrasena,
                          edad: user.edad.toString(),
                          nombre: user.nombre,
                      });
                  }
              });
              setUser({
                ...user,
                contrasena: user.contrasena,
                edad: user.edad.toString(),
                nombre: user.nombre,
              });
              setIsDirty(false);
              Alert.alert("Éxito", "Datos actualizados correctamente");
            }
          } catch (error) {
            console.error("Error al actualizar los datos:", error);
            Alert.alert("Error", "Hubo un error al actualizar los datos. Por favor, inténtalo de nuevo más tarde");
          }
    }

    const salir = () => {
      navigation.navigate('Welcome')
      clearData()
    }
  
    return (
      <LinearGradient style={styles.container} colors={["#ffffff", "#006400"]}>
        <Text style={styles.title}>Mis Datos</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Correo:</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={user.correo}
            editable={false}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            value={user.contrasena}
            onChangeText={(value) => {
                handleTextChange(value, "password")
                setIsDirty(true);
              }}
            placeholder="Contraseña"
            secureTextEntry
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={user.nombre}
            onChangeText={(value) => {
                handleTextChange(value, "nombre")
                setIsDirty(true);
              }}
            placeholder="Nombre"
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Edad:</Text>
          <TextInput
            style={styles.input}
            value={user.edad.toString()}
            onChangeText={(value) => {
              handleTextChange(value, "edad")
              setIsDirty(true);
            }}
            placeholder="Edad"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.espacioInferior}>
          <Button
            title="Actualizar Datos"
            onPress={actualizarDatos}
            disabled={!isDirty} // Deshabilitar el botón si no se han realizado cambios
          />
        </View>
        <View style={styles.espacioInferior}>
          <Button
            color= "rgb(0,0,0)"
            title="Cerrar Sesión"
            onPress={salir}
          />
        </View>
      </LinearGradient>
    );
  }
  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 200,
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
  },
  espacioInferior: {
    marginBottom: 15,
  },
});
