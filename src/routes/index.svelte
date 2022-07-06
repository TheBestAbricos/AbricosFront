<script lang="ts">
	import Card from '../components/Card.svelte';
	import AddCard from '../components/AddCard.svelte';
	import Navbar from '../components/Navbar.svelte';

	let array: number[] = [];
	for (let i = 0; i < 4; i++) {
		array[i] = i;
	}
</script>

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
