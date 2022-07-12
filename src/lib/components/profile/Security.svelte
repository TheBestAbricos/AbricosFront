<script lang="ts">
	import { onMount } from 'svelte';
	import { getCurrentUser } from '$lib/firebase';

	let email: string;

	onMount(async () => {
		email = getCurrentUser().email!;
	});
</script>

<div class="container">
	<p>Email: {email}!</p>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
