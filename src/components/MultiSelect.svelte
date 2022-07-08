<script lang="ts">
	import { slide } from 'svelte/transition';
	import Tag from './Tag.svelte';
	import type { TagType } from '$lib/types/card';
	export let tags: TagType[];
	export let isVisible = false;
</script>

{#if isVisible}
	<div transition:slide class="multiselect">
		{#each tags as tag}
			<div class="tag-item">
				<input type="checkbox" id={tag.text} />
				<label for={tag.text}> <Tag {tag} /></label>
			</div>
		{/each}
	</div>
{/if}

<style>
	.multiselect {
		position: absolute;
		top: 9.5rem;
		left: 4.1rem;

		height: 10rem;
		overflow-y: auto;
		background-color: transparent;
		padding: 0.3rem;
		background-color: #eee;
		border-radius: 10px;
		border: 1px solid grey;
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
