<script lang="ts" context="module">
	import { tweened } from 'svelte/motion';
	import { createEventDispatcher } from 'svelte';

	declare let $dropdownRotation: Parameters<Parameters<typeof dropdownRotation.subscribe>[0]>[0];
</script>

<script lang="ts">
	export let visible = false;
	export let label: string;

	const dropdownRotation = tweened(0);
	const dispatch = createEventDispatcher();

	function handleDropdownClick() {
		visible = !visible;
		if (visible) dropdownRotation.set(180);
		else dropdownRotation.set(0);

		dispatch('changeVisible', { visible });
	}
</script>

<div class="relative inline-block text-center my-2 mx-8">
	<div>
		<button
			on:click={handleDropdownClick}
			class="inline-flex justify-center rounded-xl w-fit px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true"
		>
			{label}

			<svg
				class="-mr-1 ml-2 h-5 w-5"
				style="transform: rotate({$dropdownRotation}deg);"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>

	{#if visible}
		<div
			class="z-10 absolute left-0 mt-2 w-32 rounded-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<slot />
		</div>
	{/if}
</div>
