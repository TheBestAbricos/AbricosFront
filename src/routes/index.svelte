<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import ProgressIndicator from '../components/ProgressIndicator.svelte';
	import { getCurrentUser, logIn } from '$lib/firebase';
	import { amountTasks } from '$lib/stores';
	import * as fs from "firebase/firestore";
	import Card from '../components/Card.svelte';
	import type * as CardType from "$lib/types/card";
	import AddCard from '../components/AddCard.svelte';
	import FolderPanel from '../components/FolderPanel.svelte';
	import { getCardsInCurrentFolder, getCurrentUserInfo } from '$lib/firestore';

	let countValue: number;

	amountTasks.subscribe((value) => {
		countValue = value;
	});
	let cardsPromise: Promise<CardType.Card[]>;

	async function init(){
		if(getCurrentUser()){
			fs.onSnapshot(fs.collection(fs.getFirestore(), "users", getCurrentUser().uid, "folders", (await getCurrentUserInfo()).currentFolder, "items"), (snapshot) => {
				cardsPromise = getCardsInCurrentFolder();
			});
		}
	}
	init();	

</script>

{#if getCurrentUser()}
	<Navbar />
	<FolderPanel />

	{#await cardsPromise = getCardsInCurrentFolder()}
		<ProgressIndicator />
	{:then cards} 
		<div class="flex flex-wrap justify-center lg:p-12 mg:p-6 p-3">
			<div class="lg:p-7 md:p-5 p-2 w-72 flex justify-center">
				<AddCard on:click />
			</div>
			{#each cards as i}
				<div class="lg:p-7 md:p-5 p-2 w-72 flex justify-center">
					<Card card={i}/>
				</div>
			{/each}
		</div>
	{/await}
	
{:else}
	{(window.location.href = '/login')}
{/if}
