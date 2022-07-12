<script lang="ts">
	import { get } from 'svelte/store';
	import { changeChecked, deleteCard } from '$lib/firestore';
	import { deleteNotification } from '$lib/notificationManager';
	import type * as CardType from '$lib/types/card';
	import ExpandedCard from './ExpandedCard.svelte';
	import Tag from './Tag.svelte';

	import { droppedCard, isDroppedCardScaled, openedPanel } from '$lib/stores';

	let colorDate: string;

	export let card: CardType.Card;

	let date: Date | null = null;
	let isEditableCardVisible = false;

	if (card.date) {
		date = new Date(card.date?.seconds * 1000 ?? 0);
	}
	function parseComponent(component: number): string {
		if (component > 9) {
			return component.toString();
		}
		return `0${component.toString()}`;
	}

	let currentDate = Date.now();

	setInterval(() => {
		currentDate = Date.now();
	}, 10000);

	$: colorDate = card.date
		? card.date.seconds * 1000 - currentDate > 0
			? 'black'
			: 'red'
		: 'black';

	function cardDelete() {
		if (!card.docId) return;
		deleteCard(card.docId);
		if (card.date) {
			deleteNotification(card.docId);
		}
	}

	function switchChecked() {
		card.checked = !card.checked;
		if (card.docId) changeChecked(card.docId, card.checked);
	}

	function handleCardClick() {
		isEditableCardVisible = true;
	}

	let cardComponent: HTMLDivElement;
	let cardHeader: HTMLElement;

	let left: number;
	let top: number;

	let moving = false;

	function onMouseDown() {
		setTimeout(() => {
			if (cardHeader) {
				const computed = window.getComputedStyle(cardHeader).cursor;
				if (computed === 'move') openedPanel.set('folder');
			}
		}, 500);
		moving = true;
		left = cardComponent.getBoundingClientRect().left;
		top = cardComponent.getBoundingClientRect().top;
		if (card.docId) droppedCard.set(card.docId);
	}

	function onMouseMove(e: MouseEvent) {
		if (moving) {
			if (get(isDroppedCardScaled)) {
				left = e.clientX - 40;
				top = e.clientY - 30;
			} else {
				left = e.clientX + 5;
				top = e.clientY + 5;
			}
		}
	}

	function onMouseUp() {
		moving = false;
		droppedCard.set('');
	}
</script>

<div
	bind:this={cardComponent}
	class:draggable={moving === true}
	style="left: {left}px; top: {top}px;"
	class="card text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900 hover:ring-2 hover:ring-gray-300
			{card.checked ? 'checked' : ''}"
	data-id={card.docId}
>
	<header on:mousedown={(e) => onMouseDown(e)} bind:this={cardHeader}>
		<div class="date-div" style="color:{colorDate};">
			<div class="date">
				{date
					? `${parseComponent(date.getDate())}.${parseComponent(
							date.getMonth() + 1,
					  )}.${parseComponent(date.getFullYear())}`
					: 'Date'}
			</div>
			<div class="time">
				{date ? `${parseComponent(date.getHours())}:${parseComponent(date.getMinutes())}` : 'Time'}
			</div>
		</div>
		<div class="image">
			<img on:click|stopPropagation={cardDelete} class="w-4" alt="delete" src="/images/x.svg" />
		</div>
	</header>
	<main class="py-1" on:click={handleCardClick}>
		<p>{card.text}</p>
		<span class="w-5" for=""
			><input
				type="checkbox"
				on:click|stopPropagation={switchChecked}
				name="checked"
				checked={card.checked}
			/></span
		>
	</main>
	<footer on:click={handleCardClick}>
		{#each card.tags as tag}
			<div class="tag-wrapper">
				<Tag {tag} />
			</div>
		{/each}
	</footer>
</div>
{#if isEditableCardVisible}
	<ExpandedCard
		on:close={() => {
			isEditableCardVisible = false;
		}}
		datetime={undefined}
		title="Edit card"
		chosenTags={card.tags}
		done={card.checked}
		description={card.text}
		ts={card.date}
		docId={card.docId}
	/>
{/if}

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	.draggable {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
		position: absolute;
		background-color: white;
		z-index: 100000;
	}
	.checked {
		box-shadow: 0 0 5px -1px greenyellow;
	}
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
