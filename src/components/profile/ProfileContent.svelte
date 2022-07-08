<script>
	import CancelButton from '../shared/CancelButton.svelte';

	import SaveButton from '../shared/SaveButton.svelte';
</script>

<div class="body flex flex-col w-full items-center gap-4 flex-auto justify-evenly">
	<img
		class="select-none w-4/12 rounded-full"
		src="images/user-default-logo.png"
		alt="user profile"
	/>
	<button
		class="bg-gray-100 py-2 px-4 rounded-3xl text-gray-600 border-gray-300 border hover:brightness-105 ring-2 ring-gray-200"
	>
		Pick profile image
	</button>
	<div class="buttons w-full flex flex-row items-center justify-center gap-4">
		<SaveButton />
		<CancelButton />
	</div>
</div>
