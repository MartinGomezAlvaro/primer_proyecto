import { Text } from "react-native"
import { UserContext } from "../../context/UserContext"
import { useContext } from "react"

export function CuentaScreen () {

const {correo, password, nombre, edad} = useContext(UserContext)
    return(
        <>
         <Text>Correo: {correo}</Text>
         <Text>Contrasena: {password}</Text>
         <Text>Edad: {edad}</Text>
         <Text>Nombre: {nombre}</Text>
        </>
    )
}