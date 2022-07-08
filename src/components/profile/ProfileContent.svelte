<script lang="ts">
	import { logoChoiceMode, logoSrc } from '$lib/stores';
	import { get } from 'svelte/store';
	import CancelButton from '../shared/CancelButton.svelte';
	import SaveButton from '../shared/SaveButton.svelte';

	function hanldeChangeLogoClick() {
		logoChoiceMode.set(true)
		console.log(get(logoChoiceMode));
	}
</script>

<div class="container">
	<img src={get(logoSrc)} alt="user profile"/>
	<button on:click = {hanldeChangeLogoClick}>
		Change
	</button>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		gap: 1em;
	}

	button {
		height: 30px;
		width: 90px;

		border-radius: 30px;
		border: 1px solid rgba(0, 0, 0, 28%);

		background: #CFA7E7;
	}

	img {
		width: 10em;
		height: 10em;

		border-radius: 50%;
	}
</style>