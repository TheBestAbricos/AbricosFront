<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { tweened } from 'svelte/motion';
	import { logOut } from '$lib/firebase';
	import { getAvatarUrl, getNotificationToken } from '$lib/firestore';
	import { openedPanel, notificationStatus, logoSrc } from '$lib/stores';
	import type { FilterData } from '$lib/types/filter';
	import FilterBar from './filter/FilterBar.svelte';
	import Notification from '$lib/components/Notification.svelte';

	const filterRotation = tweened(180);
	const dispatch = createEventDispatcher();

	let filterIcon: HTMLDivElement;
	let filterData: FilterData;
	let isFilterVisible = false;
	let isFolderVisible = false;
	let isForbidden: boolean = false;
	let isTutorialOn: boolean = window.location.pathname == '/';

	let logo: HTMLDivElement;

	let notification: HTMLDivElement;
	let isNotificationVisible: boolean = false;

	onMount(async () => {
		await checkNotificationStatus();
		let avatarUrl = await getAvatarUrl();
		logoSrc.set(avatarUrl);
	});

	notificationStatus.subscribe(() => checkNotificationStatus());

	//Close filter if Folder appears
	openedPanel.subscribe((value) => {
		if (value == 'folder') {
			isFilterVisible = false;
			filterRotation.set(180);
		}
	});

	function checkNotificationStatus() {
		getNotificationToken().then((token) => {
			if (token === undefined) {
				switchNotificationIconTo('off');
			} else {
				switchNotificationIconTo('on');
			}
		});
	}

	function handleFilterClick() {
		var loc = window.location.pathname;
		if (loc != '/') {
			if (filterIcon) {
				isForbidden = true;
				setTimeout(() => (isForbidden = false), 300);
			}
			return;
		}
		isFilterVisible = !isFilterVisible;
		if (isFilterVisible) {
			filterRotation.set(0);
			isFolderVisible = false;
			openedPanel.set('filter');
		} else {
			filterRotation.set(180);
			openedPanel.set('');
		}
	}

	function handleFolderClick() {
		if (get(openedPanel) === 'folder') isFolderVisible = true;
		isFolderVisible = !isFolderVisible;
		if (isFolderVisible) {
			openedPanel.set('folder');
		} else {
			openedPanel.set('');
		}

		var loc = window.location.pathname;
		if (loc != '/') {
			window.location.href = '/';
		} else {
			isTutorialOn = false;
		}
	}

	function handleNotificationClick() {
		checkNotificationStatus();
		isNotificationVisible = !isNotificationVisible;
	}

	function handleProfileClick() {
		var loc = window.location.pathname;
		if (loc != '/profile') window.location.href = '/profile';
	}

	function switchNotificationIconTo(status: string) {
		if (status !== 'off' && status !== 'on') new Error('Incorrect notification status');

		if (notification)
			notification.style.background = `url('/images/notification-${status}.svg') no-repeat center / cover`;
	}

	async function signOut() {
		await logOut();
		window.location.href = '/login';
	}

	logoSrc.subscribe((src) => {
		if (logo) logo.style.background = `url('${src}') no-repeat center / cover`;
	});
</script>

<nav class="p-3">
	<div class="nav__el left">
		<div on:click={handleFolderClick} class="logo cursor-pointer">
			<div class:spinner={isTutorialOn == true} class="logo__img" />
			<span class="logo__text select-none">ABRICOS</span>
		</div>
	</div>

	<div class="nav__el right">
		<div class="menu">
			<div
				on:click={handleFilterClick}
				bind:this={filterIcon}
				class:reverse-spinner={isForbidden == true}
				class="menu__el cursor-pointer"
				id="filter"
				style="transform: rotate({$filterRotation}deg);"
			/>
			<div
				bind:this={notification}
				on:click={handleNotificationClick}
				class="menu__el cursor-pointer"
				id="notification"
			/>
			<div class="menu__el cursor-pointer" id="logout" on:click={signOut} />

			<div bind:this={logo} class="user-logo cursor-pointer" on:click={handleProfileClick} />
		</div>
	</div>
</nav>
<div class="notification-container">
	<Notification bind:isVisible={isNotificationVisible} />
</div>
<FilterBar isActive={isFilterVisible} on:filter={(e) => dispatch('filter', e.detail)} />

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
		background: url('/images/filter.svg') no-repeat center / cover;
	}

	#notification {
		background: url('/images/notification-off.svg') no-repeat center / cover;
	}

	#logout {
		background: url('/images/logout.svg') no-repeat center / cover;
	}

	.user-logo {
		width: 6em;
		height: 80%;

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

		background: url('/images/abricos.svg') no-repeat center / 90%;
	}

	.spinner {
		animation: spin 3s linear infinite;
	}

	.reverse-spinner {
		animation: reverse-spin 0.3s linear 1;
	}

	@keyframes reverse-spin {
		0% {
			transform: rotate(180deg);
		}
		25% {
			transform: rotate(170deg);
		}
		50% {
			transform: rotate(180deg);
		}
		75% {
			transform: rotate(190deg);
		}
		100% {
			transform: rotate(180deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		2.5% {
			transform: rotate(15deg);
		}
		5% {
			transform: rotate(0deg);
		}
		7.5% {
			transform: rotate(-15deg);
		}
		10% {
			transform: rotate(0deg);
		}
	}

	@media (max-width: 500px) {
		.logo__text {
			display: none;
		}
	}
</style>
