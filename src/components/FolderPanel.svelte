<script lang="ts">
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { openedPanel } from '$lib/stores';
	import type { Folder } from '$lib/types/folder';
	import { deleteFolder, getAllUserFolders, updateFolder } from '$lib/firestore';

	export let folders: Folder[] = [];
	export let isVisible = false;
	let panel: HTMLDivElement;
	onMount(() => {
		openedPanel.subscribe((value) => {
			if (value === 'folder') {
				isVisible = true;
			} else isVisible = false;
		});
	});
	function handleClick() {
		folders = [...folders, { title: '' }];
		setTimeout(() => {
			panel.scrollTop = panel.scrollHeight;
			const newFolder = panel.children[panel.children.length - 2] as HTMLDivElement;
			newFolder.dispatchEvent(new Event('dblclick'));
		}, 0);
	}
	async function changeFolder(e: KeyboardEvent) {
		const div = e.target as HTMLDivElement;
		if (e.key === 'Enter') {
			e.preventDefault();
			div.onblur = null;
			div.contentEditable = 'false';
			if (div.innerText === '') {
				deleteFolder(div.getAttribute('data-id') as string);
				div.remove();
				console.log('Enter with empty');
				return;
			}

			const temp = div.style.boxShadow;
			div.style.boxShadow = '0 0 5px 0px green';
			if (div.getAttribute('data-id'))
				updateFolder({ docId: div.getAttribute('data-id') as string, title: div.innerText });
			else {
				const text = div.innerText;
				updateFolder({ title: text }).then((data) => div.setAttribute('dadta-id', data));
			}
			setTimeout(() => {
				div.style.boxShadow = temp;
			}, 1000);
		}
	}
	function startEditing(e: MouseEvent) {
		const div = e.target as HTMLDivElement;
		div.focus();
		const initialText = div.innerText;
		div.onblur = async () => {
			div.contentEditable = 'false';
			if (!initialText) {
				deleteFolder(div.getAttribute('data-id') as string);
				div.remove();
			}
		};
		div.contentEditable = 'true';
		div.focus();
	}

	getAllUserFolders().then((data) => {
		folders = data;
	});
</script>

{#if isVisible}
	<div transition:slide class="panel" bind:this={panel}>
		{#each folders as folder}
			<div
				data-id={folder.docId}
				class="folder"
				on:dblclick|preventDefault={startEditing}
				on:keypress={changeFolder}
			>
				{folder.title}
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
