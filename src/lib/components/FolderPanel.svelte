<script context="module">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	import {
		changeCardLocation,
		deleteFolder,
		getAllUserFolders,
		switchFolder,
		updateFolder,
	} from '$lib/firestore';
	import { droppedCard, isDroppedCardScaled, openedPanel } from '$lib/stores';
	// declare let $droppedCard: Parameters<Parameters<typeof droppedCard.subscribe>[0]>[0];
</script>

<script lang="ts">
	import type { Folder } from '$lib/types/folder';

	export let folders: Folder[] = [];
	export let isVisible = false;
	export let currentFolder: Folder;

	let panel: HTMLDivElement;
	let isEditing = false;

	onMount(() => {
		openedPanel.subscribe((value) => {
			if (value === 'folder') {
				isVisible = true;
			} else {
				isVisible = false;
				getAllUserFolders().then((data) => {
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
			isEditing = false;
		}, 0);
	}
	async function changeFolder(e: KeyboardEvent) {
		const div = e.target as HTMLDivElement;
		if (e.key === 'Enter') {
			e.preventDefault();
			div.onblur = null;
			div.contentEditable = 'false';
			isEditing = false;

			if (div.innerText.trim() === '' && div.getAttribute('data-id')) {
				deleteFolder(div.getAttribute('data-id') as string);
				div.style.display = 'none';
				return;
			}
			if (div.innerText.trim() === '' && !div.getAttribute('data-id')) {
				div.style.display = 'none';
				return;
			}
			const temp = div.style.backgroundColor;
			div.style.backgroundColor = 'rgb(20 221 65 / 45%)';
			if (div.getAttribute('data-id'))
				updateFolder({ docId: div.getAttribute('data-id') as string, title: div.innerText.trim() });
			else {
				const text = div.innerText.trim();
				updateFolder({ title: text }).then((data) => div.setAttribute('data-id', data));
			}
			setTimeout(() => {
				div.style.backgroundColor = temp;
			}, 1000);
		}
	}
	function startEditing(e: MouseEvent) {
		const div = e.target as HTMLDivElement;
		if (div.contentEditable === 'true') return;
		div.focus();
		const initialText = div.innerText;
		isEditing = true;
		div.onblur = async () => {
			div.contentEditable = 'false';
			isEditing = false;
			if (!initialText) {
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
	}

	function onMouseUp(e: MouseEvent) {
		const folderDiv = e.target as HTMLDivElement;

		const cardId = $droppedCard;
		const folderId = folderDiv.dataset.id;

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
</script>

{#if isVisible}
	<div transition:slide id="panel" class="panel" bind:this={panel}>
		{#each folders as folder}
			<div
				on:mouseup={(e) => onMouseUp(e)}
				on:mouseenter={() => {
					onMouseEnter();
				}}
				on:mouseleave={onMouseLeave}
				data-id={folder.docId}
				class="folder {currentFolder.docId === folder.docId ? 'chosenFolder' : ''}"
				class:isEditing={isEditing && currentFolder.docId === folder.docId}
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
		/* outline: none; */
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
	.isEditing {
		padding: 0.6em 2em;
		border: none;
		outline: none;
		cursor: pointer;
		position: relative;
		z-index: 0;
		border-radius: 10px;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
	}

	.isEditing:before {
		content: '';
		background: linear-gradient(
			45deg,
			#ff0000,
			#ff7300,
			#fffb00,
			#48ff00,
			#00ffd5,
			#002bff,
			#7a00ff,
			#ff00c8,
			#ff0000
		);
		position: absolute;
		top: -2px;
		left: -2px;
		background-size: 400%;
		z-index: -1;
		filter: blur(5px);
		-webkit-filter: blur(5px);
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		animation: glowing-button-85 20s linear infinite;
		transition: opacity 0.3s ease-in-out;
		border-radius: 10px;
	}

	@keyframes glowing-button-85 {
		0% {
			background-position: 0 0;
		}
		50% {
			background-position: 400% 0;
		}
		100% {
			background-position: 0 0;
		}
	}

	.isEditing:after {
		z-index: -1;
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(211, 211, 211, 0.9);
		left: 0;
		top: 0;
		border-radius: 10px;
	}
</style>
