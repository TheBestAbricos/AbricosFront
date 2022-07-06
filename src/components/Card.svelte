<script lang="ts">
	import type { Card } from '../types/card';
	export const card: Card = {
		text: 'Make a dinner today and then then then then then today',
		tags: [
			{ text: 'must', color: '#ff0000' },
			{ text: 'should', color: '#00FF00' },
			{ text: 'really woolddldl', color: '#0000ff' },
			{ text: 're123ally wooldl', color: '#0000ff' }
		],
		checked: true,
		date: '02.02.2003',
		time: '01:22'
	};
</script>

<div class="card">
	<header>
		<div class="date-div">
			<div class="date">{card.date}</div>
			<div class="time">{card.time}</div>
		</div>
		<div class="image"><img alt="delete" src="images/x.png" /></div>
	</header>
	<main>
		<p>{card.text}</p>
		<span for=""><input type="checkbox" name="checked" checked={card.checked} /></span>
	</main>
	<footer>
		{#each card.tags as tag}
			<div class="tag" style="background-color:{tag.color}">{tag.text}</div>
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
		padding: 0.3125rem;
		font-size: 1.25rem;
		line-height: 1.1;
		text-align: center;
		margin: 0 1rem;
	}

	.image {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 1rem;
	}
	img {
		height: 2rem;
	}
	main {
		display: flex;
		flex-basis: 6rem;
		overflow: hidden;
	}
	p {
		padding: 0.5rem 0.5rem 0 1rem;
		font-size: 1.3rem;
		line-height: 1.2;
		flex-grow: 1;
		margin: 0;
	}
	span {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 1rem;
	}
	input[type='checkbox'] {
		cursor: pointer;
		height: 2rem;
		width: 2rem;
	}
	input[type='checkbox']:hover {
		background-color: aqua;
	}
	footer {
		box-sizing: border-box;
		flex-basis: 3rem;
		overflow: hidden;
		padding: 0 1rem;
	}
	.tag {
		height: 2rem;
		min-width: 3rem;
		text-align: center;
		padding: 0.5rem;
		margin: 0.5rem 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border: 1px solid grey;
		border-radius: 10px;
		box-sizing: border-box;
		flex-wrap: nowrap;
		transition-duration: 300ms;
		font-weight: 500;
	}
	.tag:hover {
		transform: scale(1.02);
		transform: rotate(-1deg);
	}
	.tag:not(:last-child) {
		margin-right: 0.2rem;
	}
	.card {
		display: flex;
		flex-direction: column;
		width: 18.75rem;
		height: 12rem;
		border: 1px solid grey;
		border-radius: 30px;
		box-sizing: border-box;
	}
</style>
