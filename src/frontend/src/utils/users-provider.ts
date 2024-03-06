// Funciones de acceso a la API de usuarios.

import { User } from "~/models/user"

// Obtiene todos los usuarios
export const getUsers = async (): Promise<User[]>  => {
    try {
        const response = await fetch('http://localhost:8000/users/')
        const users = response.json()
        return users
    } catch (error) {
        console.error(error)
    }

    return <User[]><unknown>null
}

// Añade un usuario.
export const addUser = async ( user: User)  => {
    try {
        await fetch('http://localhost:8000/users/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        
    } catch (error) {
        console.error(error)
    }
}

// Modifica un usuario.
export const updateUser = async ( dni:string, user: User)  => {
    try {
        await fetch(`http://localhost:8000/users/${dni}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        
    } catch (error) {
        console.error(error)
    }
}

// Elimina un usuario.
export const deleteUserByDni = async ( dni:string,)  => {
    try {
        await fetch(`http://localhost:8000/users/${dni}`,
        {
            method: 'DELETE',
        })
        
    } catch (error) {
        console.error(error)
    }
}