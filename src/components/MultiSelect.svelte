<script lang="ts">
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import Tag from './Tag.svelte';
	import type { TagType } from '$lib/types/card';
	export let tags: TagType[];
	export let chosenTags: TagType[];
	export let isVisible = false;
	function addTagAsChosen(tag: TagType, e: MouseEvent) {
		const input = e.target as HTMLInputElement;
		const checked = input.checked;
		dispatch('handleChosenTag', { tag, checked });
	}
	console.log(chosenTags);
</script>

{#if isVisible}
	<div transition:slide class="multiselect" on:click|stopPropagation>
		{#each tags as tag}
			<div class="tag-item">
				<input
					on:click={(e) => {
						addTagAsChosen(tag, e);
					}}
					value={tag.text}
					type="checkbox"
					id={tag.text}
					checked={chosenTags.some((item) => item.text == tag.text)}
				/>
				<label for={tag.text}> <Tag {tag} /></label>
			</div>
		{/each}
	</div>
{/if}

<style>
	.multiselect {
		position: absolute;
		top: 10.5rem;
		left: 4.8rem;
		height: 10rem;
		overflow-y: auto;
		background-color: transparent;
		padding: 0.3rem;
		background-color: white;
		border-radius: 10px;
		border: 1px solid rgba(0, 0, 0, 28%);
		z-index: 1000000;
	}
	.multiselect::-webkit-scrollbar {
		width: 3px;
	}
	.multiselect::-webkit-scrollbar-track {
		background-color: transparent;
		border-radius: 100px;
		margin: 0.3rem 0;
	}
	.multiselect::-webkit-scrollbar-thumb {
		background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
		box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
		border-radius: 100px;
	}
	.tag-item {
		margin-bottom: 0.3rem;
	}
	label {
		display: inline-block;
	}
</style>
