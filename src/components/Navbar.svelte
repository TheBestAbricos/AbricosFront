<script lang="ts">
	import { logOut } from '$lib/firebase';
	import FilterBar from './filter/FilterBar.svelte';
	import { tweened } from 'svelte/motion';
	import { openedPanel } from '$lib/stores';

	let isFilterVisible: boolean = false;
	const filterRotation = tweened(180);

	let isFolderVisible: boolean = false;

	//Close filter if Folder appears
	openedPanel.subscribe((value) => {
		if (value == 'folder') {
			isFilterVisible = false;
			filterRotation.set(180);
		}
	});

	function handleFilterClick() {
		isFilterVisible = !isFilterVisible;
		if (isFilterVisible) {
			filterRotation.set(0);
			openedPanel.set('filter');
			isFolderVisible = false;
		} else {
			filterRotation.set(180);
			openedPanel.set('');
		}
	}

	function handleFolderClick() {
		isFolderVisible = !isFolderVisible;
		if (isFolderVisible) {
			openedPanel.set('folder');
		} else {
			openedPanel.set('');
		}
	}
	async function signOut() {
		await logOut();
		window.location.href = '/login';
	}
</script>

<nav class="p-3">
	<div class="nav__el left">
		<div class="logo">
			<div class="logo__img" on:click={handleFolderClick} />
			<span class="logo__text">ABRICOS</span>
		</div>
	</div>

	<div class="nav__el right">
		<div class="menu">
			<div
				on:click={handleFilterClick}
				class="menu__el cursor-pointer"
				id="filter"
				style="transform: rotate({$filterRotation}deg);"
			/>
			<div class="menu__el" id="notification" />
			<div class="menu__el" id="logout" on:click={signOut} />

			<div class="user-logo" />
		</div>
	</div>
</nav>
<FilterBar isActive={isFilterVisible} />

<style>
	nav {
		widows: 100%;

		display: flex;
		flex-direction: row;
		align-items: stretch;

		border-bottom: 1px solid rgba(0, 0, 0, 0.28);
	}

	.nav__el {
		width: 50%;

		display: flex;
	}

	.nav__el.right {
		justify-content: right;
	}

	.nav__el.left {
		justify-content: left;
	}

	.menu {
		margin-right: 2%;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: right;

		gap: 20%;
	}

	.menu__el {
		width: 3em;
		height: 40%;
	}

	#filter {
		background: url('filter.svg') no-repeat center / cover;
	}

	#notification {
		background: url('notification-off.svg') no-repeat center / cover;
	}

	#logout {
		background: url('logout.svg') no-repeat center / cover;
	}

	.user-logo {
		width: 6em;
		height: 80%;

		background: url('user-default-logo.png') no-repeat center / cover;
		border-radius: 50%;
	}

	.logo {
		margin-left: 2%;

		display: flex;
		align-items: center;
		gap: 5%;
	}

	.logo span {
		font-size: 120%;
	}

	.logo__img {
		width: 3em;
		height: 3em;

		background: url('abricos.svg') no-repeat center / 90%;
	}
</style>
