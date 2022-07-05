<script lang="ts">
	export let text = 'Make a dinner today and then...';
	export let time = '01:22';
	export let date = '02.02.2003';
	export let checked = false;
	export let tags = ['tag', 'tag2'];
</script>

<div class="card">
	<header>
		<div class="date-div">
			<div class="date">{date}</div>
			<div class="time">{time}</div>
		</div>
		<div class="image"><img alt="delete" src="images/x.png" /></div>
	</header>
	<main>
		<p>{text}</p>
		<span for=""><input type="checkbox" name="checked" {checked} /></span>
	</main>
	<footer>
		{#each tags as tag}
			<div class="tag">{tag}</div>
		{/each}
	</footer>
</div>

<style>
	header {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid grey;
		box-sizing: border-box;
	}

	.date-div {
		padding: 5px;
		font-size: 20px;
		text-align: center;
		margin: 0 15px;
	}

	.image {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px;
		margin: 0 10px;
	}
	img {
		height: 32px;
	}
	main {
		display: flex;
		flex-grow: 5;
	}
	p {
		padding: 5px;
		font-size: 22px;
		flex-grow: 1;
		margin: 0;
	}
	span {
		padding: 5px;
	}
	input[type='checkbox'] {
		cursor: pointer;
		height: 30px;
		width: 30px;
	}
	footer {
		box-sizing: border-box;
		padding: 0 10px;
	}
	.tag {
		height: 30px;
		min-width: 40px;
		text-align: center;
		margin: 5px;
		box-sizing: border-box;
		border: 1px solid grey;
		border-radius: 10px;
		display: inline-block;
	}
	.card {
		display: flex;
		flex-direction: column;
		width: 300px;
		height: 200px;
		border: 1px solid grey;
		border-radius: 30px;
		box-sizing: border-box;
	}
</style>
