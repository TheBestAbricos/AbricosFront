<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import ProgressIndicator from '../components/ProgressIndicator.svelte';
	import { getCurrentUser } from '$lib/firebase';
	import { amountTasks } from '../lib/stores.js';

	import Card from '../components/Card.svelte';
	import AddCard from '../components/AddCard.svelte';

	let countValue: number;

	amountTasks.subscribe((value) => {
		countValue = value;
	});

	let array: number[] = [];
	$: for (let i = 0; i < countValue; i++) {
		array[i] = i;
	}
</script>

{#await getCurrentUser()}
	<ProgressIndicator />
{:then user}
	{#if user}
		<Navbar />
		<div class="flex flex-wrap justify-center lg:p-12 mg:p-6 p-3">
			<div class="lg:p-7 md:p-5 p-2 w-72 flex justify-center">
				<AddCard on:click />
			</div>
			{#each array as i}
				<div class="lg:p-7 md:p-5 p-2 w-72 flex justify-center">
					<Card />
				</div>
			{/each}
		</div>
	{:else}
		{(window.location.href = '/login')}
	{/if}
{/await}
