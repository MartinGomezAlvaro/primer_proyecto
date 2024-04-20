import React, { useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import appFirebase from "../../database/firebase";
import { getDocs, collection, query, where, getFirestore, addDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { LinearGradient } from 'expo-linear-gradient';

const db = getFirestore(appFirebase);

export function RegisterScreen() {

  const { correo, password, edad, nombre, setCorreo, setPassword, setEdad, setNombre } = useContext(UserContext);
  const navigation = useNavigation();

  const registerNewUser = async () => {
    if (nombre === '' || correo === '' || password === '' || edad === '') {
      alert('Por favor, rellene todos los campos');
    } else {
      try {
        // Verificar si el correo ya está registrado
        const correoExistenteQuery = query(collection(db, 'usuarios'), where('correo', '==', correo));
        const correoExistenteSnapshot = await getDocs(correoExistenteQuery);
        if (!correoExistenteSnapshot.empty) {
          alert('Ya existe una cuenta asociada a este correo electrónico en la base de datos.');
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
        }
      } catch (error) {
        console.error("Error al guardar el usuario:", error);
        // Manejar el error según sea necesario
      }
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
});
