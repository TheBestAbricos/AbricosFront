<script lang="ts">
	import { openedPanel } from '$lib/stores';
	import { onMount } from 'svelte';

	export let folders = ['Study', 'University', 'University2', ' University3 University3'];
	onMount(() => {
		openedPanel.subscribe((value) => {
			if (value == 'folder') {
				showPanel();
			} else hidePanel();
		});
	});

	let panel: HTMLDivElement;

	function showPanel() {
		if (panel.classList.contains('panel-hide')) {
			panel.classList.remove('panel-hide');
			panel.classList.add('panel-show');
			openedPanel.set('folder');
		}
	}
	function hidePanel() {
		if (panel.classList.contains('panel-show')) {
			panel.classList.remove('panel-show');
			panel.classList.add('panel-hide');
		}
	}
</script>

<div class="panel panel-hide" bind:this={panel}>
	{#each folders as folder}
		<div class="folder">{folder}</div>
	{/each}
</div>

<style>
	.panel {
		margin: 0.3rem;
		position: absolute;
		left: 0;
		transition: 0.5s ease !important;
	}
	.folder {
		padding: 0.3rem;
		text-align: center;
		width: 10rem;
		border: 1px solid grey;
		border-radius: 5px;
	}
	.folder:not(:last-child) {
		margin-bottom: 0.1rem;
	}
	.panel-hide {
		left: -11rem !important;
		-webkit-transition: 0.5s ease !important;
		-moz-transition: 0.5s ease !important;
		-o-transition: 0.5s ease !important;
		transition: 0.5s ease !important;
	}
	.panel-show {
		left: 0 !important;
		-webkit-transition: 0.5s ease !important;
		-moz-transition: 0.5s ease !important;
		-o-transition: 0.5s ease !important;
		transition: 0.5s ease !important;
	}
</style>
