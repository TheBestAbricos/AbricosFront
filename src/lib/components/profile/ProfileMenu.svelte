<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClickProfile() {
		dispatch('message', {
			text: 'Profile'
		});
	}
	function handleClickSecurity() {
		dispatch('message', {
			text: 'Security'
		});
	}

	function handleClickTag() {
		dispatch('message', {
			text: 'Tags'
		});
	}
</script>

<div class="w-60 h-48 sm:mr-10 sm:mx-0 mx-auto border border-gray-300 rounded-3xl">
	<ul
		class="settings select-none w-full h-full flex flex-col justify-evenly text-center align-middle cursor-pointer"
	>
		<li
			on:click={handleClickProfile}
			class="menu-item h-1/3 flex justify-center flex-col border-b-2"
		>
			<span> Profile </span>
		</li>
		<li
			on:click={handleClickSecurity}
			class="h-1/3 flex justify-center flex-col border-b-2 menu-item"
		>
			<span> Security </span>
		</li>
		<li on:click={handleClickTag} class="menu-item h-1/3 flex justify-center flex-col">
			<span> Tags</span>
		</li>
	</ul>
</div>

<style>
	.menu-item:hover {
		transform: scale(1.03);
		transition-duration: 400ms;
	}
</style>
