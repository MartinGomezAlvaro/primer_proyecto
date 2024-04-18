import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainContainer } from '../MainContainers';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import appFirebase from '../../database/firebase';


const db = getFirestore(appFirebase);

const Stack = createStackNavigator();

export function LoginScreen() {

  const navigation = useNavigation();
  const { correo, password, setCorreo, setPassword, setEdad, setNombre } = useContext(UserContext);

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
        alert('No existe un usuario con esos datos');
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      // Manejar el error según sea necesario
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
    </View>
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
});
