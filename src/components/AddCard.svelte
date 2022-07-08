<script lang="ts">
	import { amountTasks } from '$lib/stores';
	import ExpandedCard from './ExpandedCard.svelte';

	function addTask() {
		amountTasks.update((n) => n + 1);
	}
	let isCreateCardVisible = false;
	function handleAddClick() {
		isCreateCardVisible = !isCreateCardVisible;
	}
</script>

<div on:click={handleAddClick} class="w-32 opacity-60 cursor-pointer">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="w-full spinner"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#000000"
		stroke-width="0.2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><circle style="stroke-dasharray: 3" cx="12" cy="12" r="10" /><line
			x1="12"
			y1="9.5"
			x2="12"
			y2="14.5"
		/><line x1="9.5" y1="12" x2="14.5" y2="12" /></svg
	>
	<p class="w-full text-center mt-3 text-sm font-light">Add card</p>
</div>
{#if isCreateCardVisible}
	<ExpandedCard
		title="New card"
		on:close={() => {
			isCreateCardVisible = false;
		}}
	/>
{/if}

<style>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(-10deg);
		}
		50% {
			transform: rotate(0deg);
		}
		75% {
			transform: rotate(10deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
	.spinner:hover {
		animation: spin 0.3s linear 1;
	}
</style>
