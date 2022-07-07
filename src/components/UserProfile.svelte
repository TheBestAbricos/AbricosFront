<script lang="ts">
	import SaveButton from './shared/SaveButton.svelte';
	import CancelButton from './shared/CancelButton.svelte';
</script>

<div class="flex mt-20 w-full justify-center">
	<div class="w-60 h-48 mr-20 border border-gray-300 rounded-3xl">
		<ul
			class="settings select-none w-full h-full flex flex-col justify-evenly text-center align-middle cursor-pointer"
		>
			<li class="menu-item h-1/3 flex justify-center flex-col border-b-2">
				<span class="menu-item"> Profile </span>
			</li>
			<li class="h-1/3 flex justify-center flex-col border-b-2">
				<span class="menu-item"> Security </span>
			</li>
			<li class="menu-item h-1/3 flex justify-center flex-col">
				<span class="menu-item"> Tags</span>
			</li>
		</ul>
	</div>

	<div class="container w-96 h-96">
		<div class="label">
			<p class="select-none">Profile</p>
		</div>
		<div class="body flex-auto justify-evenly">
			<img class="select-none" src="images/user-default-logo.png" alt="user profile" />
			<button
				class="bg-gray-100 py-2 px-4 rounded-3xl text-gray-600 border-gray-300 border hover:brightness-105 ring-2 ring-gray-200"
			>
				Pick profile image
			</button>
			<div class="buttons">
				<SaveButton />
				<CancelButton />
			</div>
		</div>
	</div>
</div>

<style>
	.menu-item:hover {
		transform: scale(1.03);
		transition-duration: 400ms;
	}

	.container {
		border-radius: 10%;
		border: 1px solid rgba(0, 0, 0, 28%);

		display: flex;
		flex-direction: column;

		background-color: white;
	}

	.label {
		height: 3rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		border-bottom: 1px solid rgba(0, 0, 0, 28%);
	}

	.body {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.body img {
		width: 30%;

		border-radius: 50%;
	}

	.body .buttons {
		width: 100%;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
</style>
