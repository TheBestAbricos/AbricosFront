<script lang="ts">
	import type { Card } from '../types/card';
	export const card: Card = {
		text: 'Make a dinner today and then then then then then today',
		tags: [
			{ text: 'must', color: '#333', textColor: '#fff' },
			{ text: 'should' },
			{ text: 'really woolddldl', color: '#0000ff' },
			{ text: 're123ally wooldl', color: '#0000ff' },
			{ text: 're123ally wooldl', color: '#0000ff' },
			{ text: 're123ally wooldl', color: '#0000ff' },
			{ text: 're123ally wooldl', color: '#0000ff' }
		],
		checked: true,
		date: '02.02.2003',
		time: '01 : 22'
	};
</script>

<div class="card">
	<header>
		<div class="date-div">
			<div class="date">{card.date ? card.date : 'Date'}</div>
			<div class="time">{card.time ? card.time : 'Time'}</div>
		</div>
		<div class="image"><img alt="delete" src="images/x.svg" /></div>
	</header>
	<main>
		<p>{card.text}</p>
		<span for=""><input type="checkbox" name="checked" checked={card.checked} /></span>
	</main>
	<footer>
		{#each card.tags as tag}
			<div
				class="tag"
				style="background-color:{tag.color ? tag.color : '#fff'};color:{tag.textColor
					? tag.textColor
					: '#000'}"
			>
				{tag.text}
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
	}
	img:hover {
		filter: brightness(0.8);
	}
	main {
		display: flex;
		flex-basis: 5rem;
		overflow: hidden;
	}
	p {
		padding: 0.5rem 1rem;
		height: 4rem;
		flex-grow: 1;
		margin: 0;
		overflow: hidden;
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
	footer {
		box-sizing: border-box;
		height: 2rem;
		flex-wrap: nowrap;
		flex-basis: 4rem;
		overflow: hidden;
		padding: 0 1rem;
	}
	.tag {
		height: 2rem;
		min-width: 3rem;
		text-align: center;
		padding: 0.5rem;
		margin: 0.2rem 0.5rem 2rem 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border: 1px solid grey;
		border-radius: 20px;
		box-sizing: border-box;
		flex-wrap: nowrap;
		transition-duration: 300ms;
		font-size: 0.75em;
	}
	.tag:hover {
		transform: scale(1.02);
		transform: rotate(-1deg);
		box-shadow: 0 0 10px 0px grey;
	}
	.tag:not(:last-child) {
		margin-right: 0.2rem;
	}
	.card {
		display: flex;
		flex-direction: column;
		width: 18.75rem;
		height: 10rem;
		/* width: 14rem; */
		border: 1px solid grey;
		border-radius: 30px;
		box-sizing: border-box;
	}
</style>
