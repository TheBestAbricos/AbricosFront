<script lang="ts">
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import Tag from './Tag.svelte';
	import type { TagType } from '$lib/types/card';

	const dispatch = createEventDispatcher();

	export let tags: TagType[] = [];
	export let chosenTags: TagType[] = [];
	export let isVisible = false;

	function changeTagAsChosen(tag: TagType, e: MouseEvent) {
		const input = e.target as HTMLInputElement;
		const { checked } = { checked: input.checked };
		dispatch('handleChosenTag', { tag, checked });
	}
</script>

{#if isVisible}
	<div transition:slide class="multiselect" on:click|stopPropagation>
		{#each tags as tag}
			<div class="tag-item">
				<input
					class="w-4 h-4 cursor-pointer"
					on:click={(e) => {
						changeTagAsChosen(tag, e);
					}}
					value={tag.text}
					type="checkbox"
					id={tag.text}
					checked={chosenTags.some((item) => item.text === tag.text)}
				/>
				<label for={tag.text} class="cursor-pointer"> <Tag {tag} /></label>
			</div>
		{/each}
	</div>
{/if}

<style>
	.multiselect {
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
