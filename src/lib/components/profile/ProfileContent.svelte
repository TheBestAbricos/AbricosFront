<script lang="ts">
	import { logoChoiceMode } from '$lib/stores';
	import { getAvatarUrl } from '$lib/firestore';

	function hanldeChangeLogoClick() {
		logoChoiceMode.set(true);
		// console.log(get(logoChoiceMode));
	}

	let url: string | undefined;

	getAvatarUrl().then((a) => {
		url = a;
		return url;
	});
</script>

<div class="container">
	{#if url}
		<img class="w-28 h-28" src={url} alt="user profile" />
	{/if}
	<button class="hover:ring-2 ring-purple-400" on:click={hanldeChangeLogoClick}> Change </button>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		gap: 2em;
	}

	button {
		height: 30px;
		width: 90px;

		border-radius: 30px;
		border: 1px solid rgba(0, 0, 0, 28%);

		background: #cfa7e7;
	}

	img {
		border-radius: 50%;
	}
</style>
