<script lang="ts">
	import * as fs from 'firebase/firestore';
	import Navbar from '../components/Navbar.svelte';
	import ProgressIndicator from '../components/ProgressIndicator.svelte';
	import { getCurrentUser, logIn } from '$lib/firebase';
	import { amountTasks } from '$lib/stores';
	import Card from '../components/Card.svelte';
	import type * as CardType from '$lib/types/card';
	import AddCard from '../components/AddCard.svelte';
	import FolderPanel from '../components/FolderPanel.svelte';
	import {
		getAllUserFolders,
		getCardsInCurrentFolder,
		getCurrentUserInfo,
		setNotificationToken
	} from '$lib/firestore';
	import type { Folder } from '$lib/types/folder';

	let folders: Folder[];
	getAllUserFolders().then((data) => {
		folders = data;
		console.log(folders);
	});

	let countValue: number;

	amountTasks.subscribe((value) => {
		countValue = value;
	});
	let cardsPromise: Promise<CardType.Card[] | undefined>;

	async function init() {
		if (getCurrentUser()) {
			fs.onSnapshot(fs.doc(fs.getFirestore(), 'users', getCurrentUser().uid), async () => {
				cardsPromise = getCardsInCurrentFolder();
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
						(snapshot) => {
							cardsPromise = getCardsInCurrentFolder();
						}
					);
				}
			});
		}
	}
	init();
</script>

{#if getCurrentUser()}
	<Navbar />
	{#await getCurrentUserInfo() then data}
		<FolderPanel {folders} currentFolder={{ docId: data.currentFolder, title: '' }} />
	{/await}

	{#await (cardsPromise = getCardsInCurrentFolder())}
		<ProgressIndicator />
	{:then cards}
		{#if cards}
			<div class="flex flex-wrap justify-center lg:p-12 mg:p-6 p-3">
				<div class="lg:p-7 md:p-5 p-2 w-72 flex justify-center">
					<AddCard on:click />
				</div>
				{#each cards as i}
					<div class="lg:p-7 md:p-5 p-2 w-72 flex justify-center">
						<Card card={i} />
					</div>
				{/each}
			</div>
		{:else}
			<div class="card md:p-5 p-2 w-72">Нажми на жопу сверху</div>
		{/if}
	{/await}
{:else}
	{(window.location.href = '/login')}
{/if}
