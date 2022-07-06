<script lang="ts">
    import { createAccount, getCurrentUser } from "$lib/firebase";
    import AuthForm from "../components/AuthForm.svelte";
    import { prevent_default } from "svelte/internal";
    let email: string; 
    let password: string; 
    const createAccountButtinClick = async (e: MouseEvent) => {
        console.log(e);
        createAccount(email, password);
    }
</script>

{#await getCurrentUser()}
    
{:then user} 
    {#if !user}
        <AuthForm isRegister={false} />
        {:else}
        {window.location.href = "/"}
    {/if}
{/await}

<style>


</style>