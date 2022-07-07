<script lang="ts">
    import { createAccount, getCurrentUser } from "$lib/firebase";
    import AuthForm from "../components/AuthForm.svelte";
    import ProgressIndicator from "../components/ProgressIndicator.svelte";
    import { prevent_default } from "svelte/internal";
    let email: string; 
    let password: string; 
    const createAccountButtonClick = async (e: MouseEvent) => {
        console.log(e);
        await createAccount(email, password);
    }
</script>

{#await getCurrentUser()}
<ProgressIndicator />
{:then user} 
    {#if !user}
        <AuthForm isRegister={false} />
        {:else}
        {window.location.href = "/"}
    {/if}
{/await}

<style>


</style>