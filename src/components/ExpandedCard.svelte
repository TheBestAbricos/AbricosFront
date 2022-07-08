<script lang="ts">
	import type { TagType, Card } from '$lib/types/card';
	import { Timestamp } from 'firebase/firestore';
	import { createEventDispatcher } from 'svelte';
	import MultiSelect from './MultiSelect.svelte';
	import Tag from './Tag.svelte';
	const dispatch = createEventDispatcher();
	let done = false;
	let datetime: Date;
	let description: string;
	let tags: TagType[] = [
		{ text: 'hi3s', color: '#123456' },
		{ text: 'h1123123131i' },
		{ text: '1' },
		{ text: '2' },
		{ text: '3' },
		{ text: '4' },
		{ text: '5' },
		{ text: 'he6rld' },
		{ text: 'he7orld' },
		{ text: 'he8rld' }
	];
	export let chosenTags: TagType[] = [];
	let isMultiSelectVisible = false;
	function handleChosenTag(event: { detail: { checked: boolean; tag: TagType } }) {
		if (event.detail.checked) chosenTags = [...chosenTags, event.detail.tag];
		else {
			chosenTags = chosenTags.filter((item) => item != event.detail.tag);
		}
	}
	function save() {
		datetime = new Date(datetime);
		let ts: Timestamp = Timestamp.fromDate(
			new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate())
		);
		const card: Card = {
			checked: done,
			text: description,
			tags: chosenTags,
			date: ts
		};
		console.log(JSON.stringify(card));
		console.log('save');
		dispatch('close');
	}
</script>

<div class="background" on:click|stopPropagation={() => dispatch('close')}>
	<div
		class="center-block"
		on:click|stopPropagation={() => {
			isMultiSelectVisible = false;
		}}
	>
		<header>
			<span>Short description...</span>
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
					on:click|stopPropagation={() => (isMultiSelectVisible = !isMultiSelectVisible)}
				/>
				<MultiSelect
					on:handleChosenTag={handleChosenTag}
					{chosenTags}
					{tags}
					isVisible={isMultiSelectVisible}
				/>
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
			<button type="submit" on:click={save}>Save</button>
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
		height: 2rem;
		box-shadow: 0 2px 5px -4px grey;
	}
	label {
		display: block;
		margin: 0.5rem 0;
	}
	label span {
		display: inline-block;
		width: 6rem;
	}
	input[type='date'] {
		width: 6.8rem;
		outline: none;
	}
	input[type='date']:hover {
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
	footer button {
		padding: 0.3rem 0.5rem;
		border-radius: 10px;
		transition-duration: 200ms;
	}
	footer button:hover {
		box-shadow: 0 0 5px 0px grey;
		transform: scale(1.05);
	}
	footer button[type='submit'] {
		margin-right: 0.5rem;
		background-color: aquamarine;
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
</style>
