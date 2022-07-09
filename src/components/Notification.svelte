<script lang="ts" context="module">
	import { get } from 'svelte/store';
	import { noficationStatus } from '$lib/stores';
	import SaveButton from './shared/SaveButton.svelte';
	import CancelButton from './shared/CancelButton.svelte';
	import ToggleSwitch from './shared/ToggleSwitch.svelte';
	import { getNotificationToken, setNotificationToken } from '$lib/firestore';

	const url_server = 'https://a321-188-130-155-167.eu.ngrok.io/';
	const url_bot = 'https://t.me/inno_frontend_bot';

	let container: HTMLDivElement;
	let back: HTMLDivElement;
	let input: HTMLInputElement;

	export let toggledChecked = true;

	export const hideContainter = () => {
		back.style.display = 'none';

		clearContainerInput();
	};

	export const revealContainer = () => {
		toggledChecked = get(noficationStatus);

		back.style.display = 'block';

		clearContainerInput();
	};

	const clearContainerInput = () => {
		if (input) input.value = '';
	};

	const botImgClickHandler = () => window.open(url_bot, '_blank')!.focus();

	const sendId = async () => {
		if (!input.value) {
			input.focus();
			return;
		}

		let res = await fetch(url_server + 'webhooks/verifyToken/' + input.value + '/');

		if (!res.ok) {
			input.value = '';
			input.placeholder = 'Wrong code';

			return;
		}

		noficationStatus.set(true);
		toggledChecked = true;

		let oldInputValue = input.value;

		hideContainter();

		setNotificationToken(oldInputValue);
	};

	const sendNotificationStatus = async () => {
		if (toggledChecked === false) {
			console.log(await getNotificationToken());
			let res = await fetch(
				url_server + 'webhooks/unlinkTelegram/' + (await getNotificationToken()) + '/'
			);
			setNotificationToken(undefined);
		}

		noficationStatus.set(toggledChecked);

		hideContainter();
	};
</script>

<div bind:this={back} on:click|stopPropagation={hideContainter} class="back">
	<div bind:this={container} on:click|stopPropagation class="container select-none">
		<div class="label">
			<p>Notifications</p>
		</div>
		<div class="body mt-8">
			{#if $noficationStatus == false}
				<img
					class="pulse cursor-pointer mt-3 mb-3"
					on:click={botImgClickHandler}
					src="images/tg-bot.svg"
					alt="tg-bot"
				/>

				<input bind:this={input} type="text" placeholder="Enter code" />

				<div class="buttons">
					<SaveButton on:click={sendId} />
					<CancelButton on:click={hideContainter} />
				</div>
			{:else}
				<div class="notifications-on">
					Notification enabled
					<ToggleSwitch
						on:change={() => (toggledChecked = !toggledChecked)}
						bind:checked={toggledChecked}
					/>
				</div>

				<div class="buttons">
					<SaveButton on:click={sendNotificationStatus} />
					<CancelButton on:click={hideContainter} />
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.pulse {
		animation: epileptic-pulse 2s infinite;
	}
	@keyframes epileptic-pulse {
		0% {
			transform: scale(1);
			box-shadow: 0px 0px 2px rgb(104, 104, 104);
		}
		33% {
			transform: scale(1.05);
			box-shadow: 0px 0px 5px rgb(104, 104, 104);
		}
		50% {
			box-shadow: 0px 0px 10px rgb(104, 104, 104);
		}
		66% {
			transform: scale(1.05);
			box-shadow: 0px 0px 5px rgb(104, 104, 104);
		}
		100% {
			transform: scale(1);
			box-shadow: 0px 0px 2px rgb(104, 104, 104);
		}
	}
	.back {
		top: 0;
		left: 0;
		position: absolute;
		z-index: 100000000;

		width: 100vw;
		height: 100vh;
	}

	.container {
		position: absolute;
		width: 20rem;
		height: 20rem;

		border-radius: 10%;
		border: 1px solid rgba(0, 0, 0, 28%);

		display: flex;
		flex-direction: column;

		background-color: white;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
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
		gap: 1.5rem;

		/* margin-top: 3rem; */
	}

	.body input {
		text-align: center;
		border-radius: 1em;
		border: 1px solid rgba(0, 0, 0, 28%);
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

	.notifications-on {
		display: flex;
		flex-direction: column;
		align-items: center;

		gap: 0.5em;
	}
</style>
