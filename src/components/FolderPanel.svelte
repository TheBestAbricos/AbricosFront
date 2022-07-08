<script lang="ts">
	import { slide } from 'svelte/transition';
	import { openedPanel } from '$lib/stores';
	import { onMount } from 'svelte';

	export let folders = ['Study', 'University', 'University2', ' University3 University3'];
	export let isVisible = false;
	let panel: HTMLDivElement;
	onMount(() => {
		openedPanel.subscribe((value) => {
			if (value == 'folder') {
				isVisible = true;
			} else isVisible = false;
		});
	});
	function handleClick() {
		folders = [...folders, 'Unnamed'];
		setTimeout(() => {
			panel.scrollTop = panel.scrollHeight;
		}, 0);
	}
	function changeFolder(e: KeyboardEvent) {
		const div = e.target as HTMLDivElement;

		if (e.key == 'Enter') {
			e.preventDefault();
			div.onblur = null;
			setTimeout(() => {
				div.style.boxShadow = temp;
			}, 1000);
			div.contentEditable = 'false';
			const temp = div.style.boxShadow;
			div.style.boxShadow = '0 0 5px 0px green';

			setTimeout(() => {
				div.style.boxShadow = temp;
			}, 1000);
			return;
		}
	}
	function startEditing(e: MouseEvent) {
		const div = e.target as HTMLDivElement;
		const initialText = div.innerText;
		(div.onblur = () => {
			div.innerText = initialText;
			div.contentEditable = 'false';
		}),
			(div.contentEditable = 'true');
		div.focus();
	}
</script>

{#if isVisible}
	<div transition:slide class="panel" bind:this={panel}>
		{#each folders as folder}
			<div class="folder" on:dblclick|preventDefault={startEditing} on:keypress={changeFolder}>
				{folder}
			</div>
		{/each}
		<div class="folder new-folder" on:click={handleClick}>New folder</div>
	</div>
{/if}

<style>
	.panel {
		margin: 0.3rem;
		padding: 0.3rem;
		position: absolute;
		left: 0;
		transition: 0.5s ease-in-out !important;
		border-radius: 5px;
		box-shadow: 0 0 20px -15px grey;
		max-height: 30vh;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: #fff;
		z-index: 1000;
	}
	.panel::-webkit-scrollbar {
		width: 3px;
	}
	.panel::-webkit-scrollbar-track {
		background-color: transparent;
		border-radius: 100px;
		margin: 0.3rem 0;
	}
	.panel::-webkit-scrollbar-thumb {
		background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
		box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
		border-radius: 100px;
	}
	.folder {
		padding: 0.3rem;
		text-align: center;
		width: 10rem;

		box-sizing: border-box;
		box-shadow: 0 0 5px -3px grey, 0 0 10px -10px grey;
		border-radius: 5px;
		transition-duration: 200ms;
	}
	.folder:hover {
		transform: scale(1.05);
		cursor: pointer;
	}
	.folder:not(:last-child) {
		margin-bottom: 0.1rem;
	}
	.new-folder {
		color: grey;
	}
</style>
