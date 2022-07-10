<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let items: Array<any>;
	export let chosenItem: any;
	let chosenDiv: HTMLElement;

	const dispatcher = createEventDispatcher();

	const itemClickHandler = (e: Event) => {
		if (chosenDiv) {
			chosenDiv.style.backgroundColor = 'white';
		}

		if (e.target instanceof HTMLElement) {
			chosenDiv = e.target;

			if (chosenDiv.innerText == chosenItem) {
				chosenItem = undefined;
				dispatcher('chose', { choseItem: undefined });

				return;
			}

			chosenItem = e.target.innerText;
			e.target.style.backgroundColor = '#64CAA5';
			dispatcher('chose', { choseItem: e.target.innerText });
		}
	};
</script>

<div transition:slide class="select select-none">
	{#each items as item}
		<div
			class="option"
			style={chosenItem && chosenItem == item ? 'background-color: #64CAA5;' : ''}
			on:click={itemClickHandler}
		>
			{item}
		</div>
	{/each}
</div>

<style>
	.select {
		border: 1px solid rgba(0, 0, 0, 28%);
		border-radius: 0.6rem;

		background-color: white;
	}
	.option:first-child {
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
	}

	.option:last-child {
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
	}

	.option {
		width: 100%;
	}

	.option:hover {
		background-color: #cfa7e7 !important;
		cursor: pointer;
	}
</style>
