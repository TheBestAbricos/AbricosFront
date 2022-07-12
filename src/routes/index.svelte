<script lang="ts">
	import * as fs from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Arrow from '$lib/components/Arrow.svelte';
	import { getCurrentUser, logIn } from '$lib/firebase';
	import Navbar from '$lib/components/Navbar.svelte';
	import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
	import Card from '$lib/components/Card.svelte';
	import type * as CardType from '$lib/types/card';
	import AddCard from '$lib/components/AddCard.svelte';
	import FolderPanel from '$lib/components/FolderPanel.svelte';
	import {
		changeCardLocation,
		getAllUserFolders,
		getCardsInCurrentFolder,
		getCurrentUserInfo
	} from '$lib/firestore';
	import type { Folder } from '$lib/types/folder';
	import type { FilterData } from '$lib/types/filter';
	import { isFiltered } from '$lib/stores';

	let folders: Folder[];
	let cards: CardType.Card[] | undefined;
	let isInProgress = true;
	let myFilter: FilterData;

	function applyfilter(f: FilterData) {
		cards = cards?.filter(
			(card) =>
				(f.completed ? card.checked === f.completed : true) &&
				(card.date ? (f.till ? card.date <= f.till : true) : !f.till) &&
				f.tags.every((tag) => card.tags.some((item) => item.text === tag.text)) &&
				(f.text ? card.text.includes(f.text) : true)
		);
	}

	onMount(async () => {
		if (getCurrentUser()) {
			fs.onSnapshot(fs.doc(fs.getFirestore(), 'users', getCurrentUser().uid), async () => {
				isInProgress = true;
				getCardsInCurrentFolder().then((data) => {
					cards = data;
					if (get(isFiltered)) applyfilter(myFilter);
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
								if (get(isFiltered)) applyfilter(myFilter);
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
	});

	isFiltered.subscribe(async (value) => {
		if (value) {
			cards = await getCardsInCurrentFolder();
			console.log('Turn on filter');
			applyfilter(myFilter);
		} else {
			console.log('Turn off filter');
		}
	});
</script>

<Navbar
	on:filter={(e) => {
		myFilter = e.detail;
		isFiltered.set(false);
		isFiltered.set(true);
	}}
/>
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
	<Arrow />
{/if}
