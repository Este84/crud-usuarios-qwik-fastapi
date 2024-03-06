import { component$ } from '@builder.io/qwik';

export const Header = component$(() => {
    return (
        <header class="py-8 text-center">
        <h1 class="text-4xl font-bold text-green-400">Alan Turing Bank</h1>
        <h2 class="text-2xl font-mono" >Gestión de usuarios</h2>
        </header>
    )
});