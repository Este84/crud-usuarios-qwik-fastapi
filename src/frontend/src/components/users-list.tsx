import { component$, useStore, useTask$, useVisibleTask$, $, useSignal } from '@builder.io/qwik';
import { User } from '~/models/user';
import { addUser, deleteUser, deleteUserByDni, getUsers, updateUser } from '~/utils/users-provider';

export const UsersList = component$(() => {

    const store = useStore<{ users: User[] }>({
        users: []
    })

    const form = useStore({
        dni: '',
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        fecha_nacimiento: '',
    })

    const addOrModify = useSignal("Añadir")
    const oldDni = useSignal("")




    useTask$(async () => {
        console.log("Desde useTask")

    })

    useVisibleTask$(async () => {
        console.log("Desde useVisibleTask")
        store.users = await getUsers()
    })

    const handleSubmit = $(async (event) => {
        event.preventDefault()//eviota el comportamiento por defecto
        if (addOrModify.value === 'Añadir') {
            await addUser(form)
        } else {
            await updateUser(oldDni.value, form)
            addOrModify.value = "Añadir"

        }

    })

    const handleInputChange = $((event: any) => {
        const target = event.target as HTMLInputElement
        form[target.name] = target.value
    })

    const copyForm = $((user: User) => {
        form.dni = user.dni
        form.nombre = user.nombre
        form.apellido = user.apellido
        form.direccion = user.direccion
        form.telefono = user.telefono
        form.fecha_nacimiento = user.fecha_nacimiento
    })

    const cleanForm = $(() => {
        form.dni = ""
        form.nombre = ""
        form.apellido = ""
        form.direccion = ""
        form.telefono = ""
        form.fecha_nacimiento = ""
    })
    const deleteUser = $(async (dni: string) => {
        await deleteUserByDni(dni)
        store.users = await getUsers()
    })
    return (
        <div class="flex justify-center ">
            <div class="px-6 py-4  bg-alanturing-100 rounded-xl">
                <table class="border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th class="title">DNI</th>
                            <th class="title">Apellido</th>
                            <th class="title">Nombe</th>
                            <th class="title">Dirección</th>
                            <th class="title">Teléfono</th>
                            <th class="title">Fecha de nacimiento</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {store.users.map((user) => (
                            <tr key={user.dni}>
                                <td>{user.dni}</td>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.direccion}</td>
                                <td>{user.telefono}</td>
                                <td>{user.fecha_nacimiento}</td>
                                <td>
                                    <button
                                        class="bg-red-600"
                                        onClick$={() => deleteUser(user.dni)}>
                                        <i class="fa fa-trash" aria-hidden="true"></i>  Borrar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        class="bg-yellow-600"
                                        onClick$={() => {
                                            addOrModify.value = 'Modificar';
                                            oldDni.value = user.dni;
                                            copyForm(user);
                                        }}>
                                        <i class="fa fa-pencil" aria-hidden="true"></i>   Modificar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                        </tr>
                        <tr>
                            <form onSubmit$={handleSubmit}>
                                <td>
                                    <input
                                        name='dni'
                                        type="text"
                                        value={form.dni}
                                        onInput$={handleInputChange} />
                                </td>
                                <td>
                                    <input
                                        name='nombre'
                                        type="text"
                                        value={form.nombre}
                                        onInput$={handleInputChange} />
                                </td>
                                <td>
                                    <input
                                        name='apellido'
                                        type="text"
                                        value={form.apellido}
                                        onInput$={handleInputChange} />
                                </td>
                                <td>
                                    <input
                                        name='direccion'
                                        type="text"
                                        value={form.direccion}
                                        onInput$={handleInputChange} />
                                </td>
                                <td>
                                    <input
                                        name='telefono'
                                        type="text"
                                        value={form.telefono}
                                        onInput$={handleInputChange} />
                                </td>
                                <td>
                                    <input
                                        name='fecha_nacimiento'
                                        type="date"
                                        value={form.fecha_nacimiento}
                                        onInput$={handleInputChange} />
                                </td>
                                <td>
                                    <button
                                        class="bg-green-500"
                                        type='submit'>
                                        <i class="fa fa-check-circle" aria-hidden="true"></i> Aceptar</button>
                                </td>
                                <td>
                                    <span
                                        class="button bg-red-600"
                                        style={`visibility: ${addOrModify.value === 'Añadir' ? 'hidden' : 'visible'}`}
                                        onClick$={() => { addOrModify.value = "Añadir"; cleanForm(); }}>
                                        Cancelar
                                    </span>
                                </td>
                            </form>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <button class="button-age">
                <i class="fa fa-child" aria-hidden="true"></i> menores de edad
                </button>

                <button class="button-age">
                <i class="fa fa-user" aria-hidden="true"></i>  mayores de edad
                </button>

                <button class="button-age">
                <i class="fa fa-users" aria-hidden="true"></i>    Todos
                </button>
            </div>
        </div>)
});