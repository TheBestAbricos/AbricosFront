<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	// eslint-disable-next-line import/no-unresolved, import/extensions
	import { openedPanel } from '$lib/stores';

	let arrows: HTMLDivElement;
	let isArrowsVisible = true;
	onMount(() => {
		openedPanel.subscribe((value) => {
			if (value === 'folder') {
				isArrowsVisible = false;
			} else {
				setTimeout(() => {
					isArrowsVisible = true;
				}, 200);
			}
		});
	});
</script>

{#if isArrowsVisible}
	<div transition:fade id="arrowAnim" bind:this={arrows}>
		<div class="arrowSliding">
			<div class="arrow">
				<img src="/images/arrow.png" alt="arrow" />
			</div>
		</div>
		<div class="arrowSliding delay1">
			<div class="arrow">
				<img src="/images/arrow.png" alt="arrow" />
			</div>
		</div>
		<div class="arrowSliding delay2">
			<div class="arrow">
				<img src="/images/arrow.png" alt="arrow" />
			</div>
		</div>
	</div>
{/if}

<style>
	#arrowAnim {
		width: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.arrow {
		width: 2.5rem;
		background-color: transparent;
		transform: rotate(-90deg);
	}

	.arrowSliding {
		position: absolute;
		-webkit-animation: slide 4s linear infinite;
		animation: slide 4s linear infinite;
	}

	.delay1 {
		-webkit-animation-delay: 1.25s;
		animation-delay: 1.25s;
		transform: translateY(3rem);
		opacity: 0;
	}
	.delay2 {
		-webkit-animation-delay: 2.5s;
		animation-delay: 2.5s;
		opacity: 0;
	}
	@-webkit-keyframes slide {
		0% {
			opacity: 0;
			transform: translateY(3rem);
		}
		33% {
			opacity: 1;
			transform: translateY(2rem);
		}
		66% {
			opacity: 1;
			transform: translateY(1rem);
		}
		100% {
			opacity: 0;
			transform: translateY(0rem);
		}
	}
	@keyframes slide {
		0% {
			opacity: 0;
			transform: translateY(3rem);
		}
		33% {
			opacity: 1;
			transform: translateY(2rem);
		}
		66% {
			opacity: 1;
			transform: translateY(1rem);
		}
		100% {
			opacity: 0;
			transform: translateY(0rem);
		}
	}
</style>
