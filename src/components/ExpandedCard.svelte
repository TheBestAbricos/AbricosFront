<script lang="ts">
	import type { TagType } from '$lib/types/card';
	import MultiSelect from './MultiSelect.svelte';
	import Tag from './Tag.svelte';
	export let isVisible = true;
	export let tags: TagType[] = [
		{ text: 'hi3s', color: '#123456' },
		{ text: 'h1123123131i' },
		{ text: '1' },
		{ text: '2' },
		{ text: '3' },
		// { text: 'hello world' },
		// { text: 'hello world' },
		// { text: 'hello world' },
		// { text: 'hello world' },
		// { text: 'hello world' },
		// { text: 'hello world' },
		// { text: 'hello world' },
		// { text: 'hello world' },
		{ text: '4' },
		{ text: '5' },
		{ text: 'he6rld' },
		{ text: 'he7orld' },
		{ text: 'he8rld' }
	];
	let isMultiSelectVisible = false;
</script>

{#if isVisible}
	<div
		class="background"
		on:click={() => {
			isVisible = false;
		}}
	>
		<div class="center-block" on:click|stopPropagation>
			<header>
				<span>Short description...</span>
			</header>

			<main>
				<label for="done">
					<span>Done:</span>
					<input id="done" type="checkbox" />
				</label>
				<label for="notify">
					<span>Notification:</span>
					<input id="notify" type="date" />
				</label>
				<label for="tags">
					<span>Tags:</span>
					<img
						alt="plus"
						src="images/plus.svg"
						on:click={() => (isMultiSelectVisible = !isMultiSelectVisible)}
					/>
					<MultiSelect {tags} isVisible={isMultiSelectVisible} />
				</label>
				<div class="changeable">
					<div class="tags">
						{#each tags as tag}
							<div class="tag-tag"><Tag {tag} /></div>
						{/each}
					</div>
					<textarea placeholder="Enter description" />
				</div>
			</main>
			<footer>
				<button type="submit">Save</button>
				<button type="button" class="cancel">Cancel</button>
			</footer>
		</div>
	</div>
{/if}

<style>
	.background {
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		box-shadow: 0 0 100px -100px red;
		background-color: transparent;
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
		z-index: 10000;
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

	.cancel {
		background-color: lightcoral;
	}
	.tags {
		height: 6.825rem;
		box-sizing: border-box;
	}
</style>
