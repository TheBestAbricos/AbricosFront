<script lang="ts">
	import { prevent_default } from 'svelte/internal';
	import { createAccount, getCurrentUser } from '$lib/firebase';
	import AuthForm from '$lib/components/AuthForm.svelte';
	import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';

	let email: string;
	let password: string;
	const createAccountButtonClick = async (e: MouseEvent) => {
		console.log(e);
		await createAccount(email, password);
	};
</script>

{#await getCurrentUser()}
	<ProgressIndicator />
{:then user}
	{#if !user}
		<AuthForm />
	{:else}
		{(window.location.href = '/')}
	{/if}
{/await}
