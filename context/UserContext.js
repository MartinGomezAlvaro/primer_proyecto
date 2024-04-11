import { createContext, useState } from "react";

export const UserContext = createContext()

export function UserProvider ({children}){
    const [correo, setCorreo] = useState()
    const [password, setPassword] = useState()
    const [nombre, setNombre] = useState()
    const [edad, setEdad] = useState()

    return(
        <UserContext.Provider value={{
            correo,
            password,
            nombre,
            edad,
            setCorreo,
            setPassword,
            setNombre,
            setEdad
        }}
        >
            {children}
        </UserContext.Provider>
    )
}