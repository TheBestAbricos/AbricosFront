<script lang="ts">
	import { getCurrentUser } from '$lib/firebase';
	import Tag from './Tag.svelte';

	import * as fs from 'firebase/firestore';

	import type { Card } from '../lib/types/card';
	export let card: Card;

	let date: Date | null = null;
	if (card.date) {
		date = new Date(card.date?.seconds * 1000 ?? 0);
	}
	function parseComponent(component: number): string {
		if (component > 9) {
			return component.toString();
		}
		return '0' + component.toString();
	}
</script>

<div
	class="card text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900 hover:ring-2 hover:ring-gray-300"
>
	<header>
		<div class="date-div">
			<div class="date">
				{date
					? `${parseComponent(date.getDate())}.${parseComponent(date.getMonth())}.${parseComponent(
							date.getFullYear()
					  )}`
					: 'Date'}
			</div>
			<div class="time">
				{date ? `${parseComponent(date.getHours())}:${parseComponent(date.getMinutes())}` : 'Time'}
			</div>
		</div>
		<div class="image"><img class="w-4" alt="delete" src="images/x.svg" /></div>
	</header>
	<main class="py-1">
		<p>{card.text}</p>
		<span class="w-5" for=""><input type="checkbox" name="checked" checked={card.checked} /></span>
	</main>
	<footer>
		{#each card.tags as tag}
			<div class="tag-wrapper">
				<Tag {tag} />
			</div>
		{/each}
	</footer>
</div>

<style>
	header {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid grey;
		box-sizing: border-box;
		flex-basis: 2rem;
	}

	.date-div {
		text-align: left;
		margin: 0.1rem 1rem;
	}

	.image {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 1.45rem;
	}
	img {
		height: 1.875rem;
		transition-duration: 200ms;
		filter: saturate(0);
	}
	img:hover {
		filter: brightness(2);
		filter: saturate(5);
	}
	main {
		display: flex;
		flex-basis: 5rem;
		overflow: hidden;
	}
	p {
		padding: 0rem 0rem 0.2rem 1rem;
		height: 4rem;
		flex-grow: 1;
		margin: 0 0.5rem 0 0;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-width: none;
		/* word-break: break-all; */
		line-break: auto;
	}
	p::-webkit-scrollbar {
		width: 3px;
	}
	p::-webkit-scrollbar-track {
		background-color: transparent;
		border-radius: 100px;
		margin: 5px;
	}
	p::-webkit-scrollbar-thumb {
		background-color: grey;
		box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
		border-radius: 100px;
	}
	span {
		display: flex;
		padding-top: 0.75rem;
		justify-content: center;
		margin-right: 1.25rem;
	}
	input[type='checkbox'] {
		cursor: pointer;
		height: 1.875rem;
		width: 1.875rem;
	}
	input[type='checkbox']:hover {
		background-color: aqua;
	}
	.tag-wrapper {
		display: inline-block;
		margin: 0.2rem 0.5rem 2rem 0;
	}
	footer {
		box-sizing: border-box;
		height: 2rem;
		flex-wrap: nowrap;
		flex-basis: 4rem;
		overflow: hidden;
		padding: 0 1rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		/* width: 18rem; */
		height: 10rem;
		width: 14rem;
		border: 1px solid grey;
		border-radius: 30px;
		box-sizing: border-box;
	}
</style>
