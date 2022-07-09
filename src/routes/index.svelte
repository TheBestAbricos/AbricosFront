<script lang="ts">
	import * as fs from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { getCurrentUser } from '$lib/firebase';
	import Navbar from '../components/Navbar.svelte';
	import ProgressIndicator from '../components/ProgressIndicator.svelte';
	import Card from '../components/Card.svelte';
	import type * as CardType from '$lib/types/card';
	import AddCard from '../components/AddCard.svelte';
	import FolderPanel from '../components/FolderPanel.svelte';
	import { changeCardLocation, getAllUserFolders, getCardsInCurrentFolder, getCurrentUserInfo } from '$lib/firestore';
	import type { Folder } from '$lib/types/folder';

	let folders: Folder[];
	let cards: CardType.Card[] | undefined;
	let isInProgress = true;

	onMount(async () => {
		if (getCurrentUser()) {
			fs.onSnapshot(fs.doc(fs.getFirestore(), 'users', getCurrentUser().uid), async () => {
				isInProgress = true;
				getCardsInCurrentFolder().then((data) => {
					cards = data;
					isInProgress = false;
				});
				// Current folder exists
				if ((await getCurrentUserInfo()).currentFolder) {
					fs.onSnapshot(
						fs.collection(
							fs.getFirestore(),
							'users',
							getCurrentUser().uid,
							'folders',
							(await getCurrentUserInfo()).currentFolder,
							'items'
						),
						() => {
							isInProgress = true;
							getCardsInCurrentFolder().then((data) => {
								cards = data;
								isInProgress = false;
							});
						}
					);
				}
			});
		} else {
			window.location.href = '/login';
			return;
		}
		cards = await getCardsInCurrentFolder();
		isInProgress = false;
		getAllUserFolders().then((data) => {
			folders = data;
		});
		changeCardLocation("GwRrwqR7gL6nsMgyZL8Y", "UqFa5TUcSSj4XV7t8w2A");
	});
</script>

<Navbar />
{#await getCurrentUserInfo() then data}
	<FolderPanel {folders} currentFolder={{ docId: data.currentFolder, title: '' }} />
{/await}

{#if isInProgress}
	<ProgressIndicator />
{:else if cards}
	<div class="flex flex-wrap justify-center lg:p-12 mg:p-6 p-3">
		<div class="lg:p-7 md:p-5 p-2 w-72 flex justify-center">
			<AddCard on:click />
		</div>
		{#each cards as card}
			<div class="lg:p-7 md:p-5 p-2 w-72 flex justify-center">
				<Card {card} />
			</div>
		{/each}
	</div>
{:else}
	<div class="card md:p-5 p-2 w-72">Нажми на жопу сверхуй</div>
{/if}
