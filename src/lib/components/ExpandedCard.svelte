<script context="module">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Timestamp } from 'firebase/firestore';
	import { getCurrentUserInfo, updateCardInFolder } from '$lib/firestore';
</script>

<script lang="ts">
	import type { TagType, Card } from '$lib/types/card';
	import { setNotification } from '$lib/notificationManager';
	import MultiSelect from './MultiSelect.svelte';
	import SaveButton from './shared/SaveButton.svelte';
	import CancelButton from './shared/CancelButton.svelte';
	import Tag from './Tag.svelte';

	const dispatch = createEventDispatcher();
	export let done = false;
	export let datetime: string | undefined;
	export let ts: Timestamp | undefined;
	export let description: string;
	export let chosenTags: TagType[] = [];
	export let title: string;
	export let docId: string | undefined;
	let tags: TagType[] = [];

	function setDatetime(timeSt: Timestamp) {
		const date = new Date(timeSt.seconds * 1000);
		const year = `${date.getFullYear()}`;
		let month = `${date.getMonth() + 1}`;
		if (month.length === 1) month = `0${month}`;
		let days = `${date.getDate()}`;
		if (days.length === 1) days = `0${days}`;
		let hours = `${date.getHours()}`;
		if (hours.length === 1) hours = `0${hours}`;
		let minutes = `${date.getMinutes()}`;
		if (minutes.length === 1) minutes = `0${minutes}`;
		datetime = `${year}-${month}-${days}T${hours}:${minutes}`;
	}
	if (ts) setDatetime(ts);

	getCurrentUserInfo().then((data) => {
		tags = data.tags;
	});
	let isMultiSelectVisible = false;
	function handleChosenTag(event: { detail: { checked: boolean; tag: TagType } }) {
		if (event.detail.checked) chosenTags = [...chosenTags, event.detail.tag];
		else {
			chosenTags = chosenTags.filter((item) => item.text !== event.detail.tag.text);
		}
	}

	async function save() {
		let timeSt: Timestamp | undefined;
		if (!description) return;
		const card: Card = {
			checked: done,
			text: description,
			tags: chosenTags,
		};
		if (datetime) {
			const date = new Date(datetime);
			timeSt = Timestamp.fromDate(
				new Date(
					date.getFullYear(),
					date.getMonth(),
					date.getDate(),
					date.getHours(),
					date.getMinutes(),
				),
			);
		}
		if (timeSt) card.date = timeSt;
		if (docId) card.docId = docId;

		const cardId = await updateCardInFolder(card);
		dispatch('close');

		if (card.docId && datetime) await setNotification(datetime, cardId, description);

		dispatch('close');
	}
</script>

<div class="background">
	<div
		transition:fade
		class="center-block"
		on:click|stopPropagation={() => {
			isMultiSelectVisible = false;
		}}
	>
		<header>
			<span>{title}</span>
		</header>

		<main>
			<label for="done">
				<span>Done:</span>
				<input id="done" type="checkbox" bind:checked={done} />
			</label>
			<label for="notify">
				<span>Notification:</span>
				<input id="notify" type="datetime-local" bind:value={datetime} />
			</label>
			<label for="tags">
				<span>Tags:</span>
				<img
					alt="plus"
					src="images/plus.svg"
					on:click|stopPropagation={() => {
						isMultiSelectVisible = !isMultiSelectVisible;
					}}
				/>
				<div class="multiselect">
					<MultiSelect
						on:handleChosenTag={handleChosenTag}
						{chosenTags}
						{tags}
						isVisible={isMultiSelectVisible}
					/>
				</div>
			</label>
			<div class="changeable">
				<div class="tags">
					{#each chosenTags as tag}
						<div class="tag-tag"><Tag {tag} /></div>
					{/each}
				</div>
				<textarea placeholder="Enter description" bind:value={description} />
			</div>
		</main>
		<footer>
			<div class="buttons">
				<SaveButton on:click={save} />
				<CancelButton on:click={() => dispatch('close')} />
			</div>
		</footer>
	</div>
</div>

<style>
	.background {
		cursor: auto;
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: transparent;
		z-index: 1000;
	}
	.multiselect {
		position: absolute;
		top: 10.5rem;
		left: 4.8rem;
		z-index: 100000000000;
	}
	.center-block {
		display: flex;
		flex-direction: column;
		border: 0;
		border-radius: 40px;
		background-color: white;
		box-shadow: 0 0 5px -1px grey;
		width: 500px;
		min-height: 500px;
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 100000;
		transform: translate(-50%, -50%);
	}
	header {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3rem;
		border-bottom: 1px solid rgba(0, 0, 0, 28%);
	}
	label {
		display: block;
		width: fit-content;
		margin: 0.5rem 0;
	}
	label span {
		display: inline-block;
		width: 6rem;
	}
	input[type='datetime-local'] {
		width: 10rem;
		outline: none;
	}
	input[type='datetime-local']:hover {
		cursor: pointer;
		outline: none;
	}
	img {
		display: inline-block;
		height: 1.5rem;
		transition-duration: 200ms;
	}
	img:hover {
		transform: scale(1.1);
	}
	label[for='done'] input {
		margin: 0.2rem;
		height: 1.5rem;
		width: 1.5rem;
	}
	label[for='done'] input:hover {
		cursor: pointer;
	}

	main {
		box-sizing: border-box;
		padding: 0.5rem 1rem;
		flex-grow: 1;
	}
	footer {
		text-align: center;
		padding: 1rem 1rem;
	}

	.tag-tag {
		display: inline-block;
		margin-bottom: 0.3rem;
		margin-right: 0.1rem;
	}
	.changeable {
		display: flex;
		flex-direction: column;
	}
	textarea {
		box-shadow: 0 0 5px -2px grey;
		border-radius: 1em;
		padding: 1rem;
		height: 10rem;
		width: 100%;
		resize: none;
	}
	@media (max-width: 600px) {
		.center-block {
			width: 90%;
		}
	}

	.tags {
		height: 6.825rem;
		box-sizing: border-box;
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;

		gap: 2em;
	}
</style>
