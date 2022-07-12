<script lang="ts">
	import { getCurrentUser } from '$lib/firebase';
	import AuthForm from '$lib/components/AuthForm.svelte';
	import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
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
