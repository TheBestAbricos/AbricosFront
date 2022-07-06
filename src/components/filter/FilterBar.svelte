<script lang="ts">
	import CheckBoxFilter from './CheckBoxFilter.svelte';
	import DropDown from './DropDown.svelte';
	import InputFilter from './InputFilter.svelte';

	import { slide } from 'svelte/transition';

	export let isActive: boolean = false;

	let items = ['item1', 'item2', 'item3'];
</script>

{#if isActive}
	<div transition:slide class="flex flex-wrap border-b p-1">
		<DropDown label="Tags" options={items} />
		<DropDown label="Next" options={items} />
		<CheckBoxFilter text="Completed" />
		<InputFilter />
	</div>
{/if}
