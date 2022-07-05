<script lang="ts">
    import { createAccount } from "$lib/firebase";
    import AuthForm from "../components/AuthForm.svelte";
    import { prevent_default } from "svelte/internal";
    export let email: string; 
    export let password: string; 

    const createAccountButtinClick = async (e: MouseEvent) => {
        console.log(e);
        createAccount(email, password);
    }
</script>

<!-- 
<form action="">
    <input type="text" name="" id="" bind:value={email}>
    <input type="text" name="" id="" bind:value={password}>
    <button type="button" on:click={createAccountButtinClick}>Create user</button>
</form> -->

<AuthForm />

<style>


</style>