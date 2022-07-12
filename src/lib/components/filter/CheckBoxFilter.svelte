<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let text: string;
	export let checked: boolean | undefined = false;

	const dispatch = createEventDispatcher();
</script>

<div class="flex items-center sm:my-3 sm:mx-8 mx-auto my-4">
	<input
		bind:checked
		on:change={() => dispatch('checked', { checked })}
		id="checkbox"
		type="checkbox"
		value=""
		class="w-4 h-4 text-gray-600 bg-gray-100 rounded border-gray-300 hover:cursor-pointer focus:ring-red-500focus:ring-2"
	/>
	<label
		for="checkbox"
		class="ml-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:cursor-pointer"
		>{text}</label
	>
</div>
