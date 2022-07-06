<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import FilterBar from '../components/filter/FilterBar.svelte';
	import ProgressIndicator from '../components/ProgressIndicator.svelte';
	import { getCurrentUser } from '$lib/firebase';

	import Card from '../components/Card.svelte';
	import AddCard from '../components/AddCard.svelte';

	let array: number[] = [];
	for (let i = 0; i < 4; i++) {
		array[i] = i;
	}
</script>

{#await getCurrentUser()}
	<ProgressIndicator />
{:then user}
	{#if user}
		<Navbar />
		<div class="flex flex-wrap px-5 py-3 justify-center">
			<div class="p-5 w-72 flex justify-center">
				<AddCard on:click />
			</div>
			{#each array as i}
				<div class="p-5 w-72 flex justify-center">
					<Card />
				</div>
			{/each}
		</div>
	{:else}
		{(window.location.href = '/login')}
	{/if}
{/await}
