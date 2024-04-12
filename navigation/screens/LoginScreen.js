import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainContainer } from '../MainContainers';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const Stack = createStackNavigator();

export function LoginScreen() {

  const navigation = useNavigation();
  const{correo, password, edad, nombre, setCorreo, setPassword, setEdad, setNombre} = useContext(UserContext);
  
  const loginNewUser = async () => {
    if(correo === '' || password === ''){
      alert('Por favor, rellene todos los campos')
    }
    else {
      /*try {
        await addDoc(collection(db, 'usuarios'),{
          contrasena: password,
          correo: correo,
          edad: edad,
          nombre: nombre
        });
        alert("Guardado exitosamente");
        navigation.navigate('Main');
      } catch (error) {
        console.error("Error al guardar el usuario:", error);
        // Manejar el error según sea necesario
      }*/
    }
  }

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
      <Button  name='Main' title='Acceder' onPress={() => loginNewUser()}/>
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
