<script>
	import CheckBoxFilter from './CheckBoxFilter.svelte';
	import DropDown from './DropDown.svelte';
	import InputFilter from './InputFilter.svelte';

	let items = ['item1', 'item2', 'item3'];
</script>

<div class="flex flex-wrap">
	<DropDown label="Tags" options={items} />
	<DropDown label="Next" options={items} />
	<CheckBoxFilter text="Completed" />
	<InputFilter />
</div>
