<script lang="ts">
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { droppedCard, isDroppedCardScaled, openedPanel } from '$lib/stores';
	import type { Folder } from '$lib/types/folder';
	import {
		changeCardLocation,
		deleteFolder,
		getAllUserFolders,
		switchFolder,
		updateFolder
	} from '$lib/firestore';
	import { get } from 'svelte/store';

	export let folders: Folder[] = [];
	export let isVisible = false;
	export let currentFolder: Folder;
	let panel: HTMLDivElement;
	onMount(() => {
		openedPanel.subscribe((value) => {
			if (value === 'folder') {
				isVisible = true;
			} else {
				isVisible = false;
				getAllUserFolders().then((data) => {
					console.log(folders);
					folders = data;
				});
			}
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
				div.style.display = 'none';
				console.log('Enter with empty', div);
				return;
			}
			const temp = div.style.boxShadow;
			div.style.boxShadow = '0 0 5px 0px green';
			if (div.getAttribute('data-id'))
				updateFolder({ docId: div.getAttribute('data-id') as string, title: div.innerText });
			else {
				const text = div.innerText;
				updateFolder({ title: text }).then((data) => div.setAttribute('data-id', data));
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
				console.log(initialText);
				div.style.display = 'none';
			} else {
				div.innerText = initialText;
			}
		};
		div.contentEditable = 'true';
		div.focus();
	}
	function toAnotherFolder(e: MouseEvent) {
		const div = e.target as HTMLDivElement;
		if (!div.getAttribute('data-id')) return;
		switchFolder(div.getAttribute('data-id') as string);
		currentFolder.docId = div.getAttribute('data-id') as string;
		document.querySelectorAll('.chosenFolder').forEach((el) => el.classList.remove('chosenFolder'));
		div.classList.add('chosenFolder');
		console.log('Switched to', div.innerText, currentFolder);
	}

	function onMouseUp(e: MouseEvent) {
		const folderDiv = e.target as HTMLDivElement;

		const cardId = $droppedCard;
		const folderId = folderDiv.dataset.id;

		// if (folderDiv) console.log(folderDiv.dataset.id);
		// if (folderDiv) console.log('id' in folderDiv.dataset);
		// console.log('Card ID: ' + cardId);
		// console.log('Folder ID: ' + folderId);

		if (folderId && cardId) {
			changeCardLocation(cardId, folderId);
			const element = document.querySelector(`[data-id="${$droppedCard}"]`) as HTMLDivElement;
			if (element) {
				element.style.display = 'none';
				isDroppedCardScaled.set(false);
			}
		}
	}

	function onMouseEnter() {
		const element = document.querySelector(`[data-id="${$droppedCard}"]`) as HTMLDivElement;
		if (element) {
			element.style.transform = 'scale(0.6)';
			element.style.filter = 'brightness(0.95)';
			isDroppedCardScaled.set(true);
		}
	}

	function onMouseLeave() {
		const element = document.querySelector(`[data-id="${$droppedCard}"]`) as HTMLDivElement;
		// console.log(element);
		if (element) {
			element.style.transform = 'scale(1)';
			element.style.filter = 'brightness(1)';
			isDroppedCardScaled.set(false);
		}
	}

	function doScrolling(elementY : number) {
		var startingY = window.pageYOffset;
		var diff = elementY - startingY;
	}
</script>

{#if isVisible}
	<div transition:slide class="panel" bind:this={panel}>
		{#each folders as folder}
			<div
				on:mouseup={(e) => onMouseUp(e)}
				on:mouseenter={() => {
					onMouseEnter();
				}}
				on:mouseleave={onMouseLeave}
				data-id={folder.docId}
				class="folder {currentFolder.docId === folder.docId ? 'chosenFolder' : ''}"
				on:dblclick|preventDefault|stopPropagation={startEditing}
				on:keypress={changeFolder}
				on:click|preventDefault={toAnotherFolder}
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
	.folder:not(.chosenFolder):hover {
		transform: scale(1.05);
		cursor: pointer;
		background-color: rgba(211, 211, 211, 0.41);
	}
	.folder:not(:last-child) {
		margin-bottom: 0.1rem;
	}
	.chosenFolder {
		background-color: rgba(211, 211, 211, 0.9);
	}
	.new-folder {
		color: grey;
	}
</style>
