<script lang="ts">
	import { notificationStatus } from '$lib/stores';
	import { getAllUserCards, getNotificationToken, setNotificationToken } from '$lib/firestore';
	import SaveButton from './shared/SaveButton.svelte';
	import CancelButton from './shared/CancelButton.svelte';
	import ToggleSwitch from './shared/ToggleSwitch.svelte';
	import { deleteTokenFromTgBot, sendTokenToTgBot } from '$lib/notificationManager';

	export let isVisible: boolean = false;

	$: isVisible, checkNotificationToken();
	const bot_url = 'https://t.me/inno_frontend_bot';

	let token_input: HTMLInputElement;
	let notificationState: boolean = false;
	let toggleState: boolean = true;

	const checkNotificationToken = () => {
		getNotificationToken().then((token) => {
			if (token === undefined) {
				toggleState = false;
				notificationState = false;
				notificationStatus.set(false);
			} else {
				toggleState = true;
				notificationState = true;
				notificationStatus.set(true);
			}
		});
	};

	const botImgClickHandler = (): void => {
		// redirect to tg bot
		window.open(bot_url, '_blank')!.focus();
	};

	const backClickHanlder = (): void => {
		// hide notification form
		isVisible = false;
	};

	const cancelButtonClickHandler = () => {
		isVisible = false;

		if (token_input) token_input.value = '';
	};

	const saveButtonInitClickHanlder = async () => {
		if (!token_input.value) {
			token_input.focus();
			return;
		}

		try {
			await sendTokenToTgBot(token_input.value);
			await setNotificationToken(token_input.value); // set token in firebase  for current user

			isVisible = false;
		} catch (err) {
			token_input.value = '';
			token_input.placeholder = 'Wrong token';
		}
	};

	const saveButtonToggleClickHanlder = async () => {
		if (!toggleState) {
			await deleteTokenFromTgBot();
			await setNotificationToken(undefined); // delete token from firebase for current user
		}

		isVisible = false;
	};
</script>

{#if isVisible}
	<div on:click|stopPropagation={backClickHanlder} class="back">
		<div on:click|stopPropagation class="container select-none">
			<div class="label">
				<p>Notifications</p>
			</div>

			<div class="body mt-8">
				{#if !notificationState}
					<img
						class="pulse cursor-pointer mt-3 mb-3"
						on:click={botImgClickHandler}
						src="images/tg-bot.svg"
						alt="tg-bot"
					/>

					<input bind:this={token_input} type="text" placeholder="Enter code" />

					<div class="buttons">
						<SaveButton on:click={saveButtonInitClickHanlder} />
						<CancelButton on:click={cancelButtonClickHandler} />
					</div>
				{:else}
					<div class="notification-status">
						{#if toggleState}
							Notification enabled
						{:else}
							Notification will be disabled
						{/if}

						<ToggleSwitch
							bind:checked={toggleState}
							on:change={() => (toggleState = !toggleState)}
						/>
					</div>

					<div class="buttons">
						<SaveButton on:click={saveButtonToggleClickHanlder} />
						<CancelButton on:click={cancelButtonClickHandler} />
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

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

	.notification-status {
		display: flex;
		flex-direction: column;
		align-items: center;

		gap: 0.5em;
	}
</style>
