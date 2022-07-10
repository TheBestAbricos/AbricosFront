<script lang="ts">
	import { getCurrentUserInfo } from '$lib/firestore';
	import type { TagType } from '$lib/types/card';
	import { addTag, removeTag } from '$lib/firestore';
	import PaletteIcon from '../shared/PaletteIcon.svelte';
	import TletterIcon from '../shared/TletterIcon.svelte';
	import BinIcon from '../shared/BinIcon.svelte';
	import { onMount } from 'svelte';

	let T_color: string = 'grey'; //text color
	let B_color: string = 'grey'; //background

	let tag_input: HTMLInputElement;
	let tags: Array<TagType>;
	let isIninStage: boolean = true;

	const tagExistsText = 'Tag exists'; // error message for existing tag
	const tagsMaxCount = 4; // max tags count
	const tagsMaxCountText = 'Max tags'; // error message for existing tag

	onMount(() => {
		if (isIninStage) {
			tag_input.style.backgroundColor = 'white';
			tag_input.style.color = 'black';
		} else {
			tag_input.style.backgroundColor = B_color;
			tag_input.style.color = T_color;
		}
	});

	getCurrentUserInfo().then((data) => {
		tags = data.tags;
	});

	const resetColorPicker = () => {
		T_color = 'grey';
		B_color = 'grey';

		isIninStage = true;
	};

	const handlTextColorPickerChange = (e: Event) => {
		if (tag_input && e.target instanceof HTMLInputElement) {
			tag_input.style.color = e.target.value;
			T_color = e.target.value;

			isIninStage = false;
		}
	};

	const handlBackColorPickerChange = (e: Event) => {
		if (tag_input && e.target instanceof HTMLInputElement) {
			tag_input.style.backgroundColor = e.target.value;
			B_color = e.target.value;

			isIninStage = false;
		}
	};

	const clearTagInput = () => {
		if (tag_input) {
			tag_input.value = '';
			tag_input.style.color = '#000';
			tag_input.style.backgroundColor = '#ffffff';
		}
	};

	const handleTagFocus = () => {
		if (tag_input) {
			if (tag_input.value == tagExistsText || tag_input.value == tagsMaxCountText) {
				clearTagInput();
			}
		}
	};

	const handleBinClick = (tag: TagType) => {
		tags = tags.filter((t) => t != tag);
		removeTag(tag).then(() => {
			getCurrentUserInfo().then((data) => {
				tags = data.tags;
			});
		});
	};

	const handleAddTagClick = (tag: TagType) => {
		if (tag.text.trim().length === 0) {
			tag_input.focus();

			return;
		}

		if (tag.text === tagExistsText) {
			return;
		}

		if (tags) {
			if (tags.length > tagsMaxCount) {
				clearTagInput();
				resetColorPicker();

				tag_input.style.color = 'red';
				tag_input.value = tagsMaxCountText;
				return;
			}

			for (let i = 0; i < tags.length; i++) {
				let e = tags[i];
				if (e.text.toLocaleLowerCase() === tag_input.value.toLocaleLowerCase()) {
					clearTagInput();
					tag_input.style.color = 'red';
					tag_input.value = tagExistsText;

					return;
				}
			}
		}

		if (isIninStage) {
			tag.color = 'white';
			tag.textColor = 'black';
		}

		// tags.push(tag)

		addTag(tag).then(() => {
			getCurrentUserInfo().then((data) => {
				tags = data.tags;
			});
		});

		clearTagInput();
		resetColorPicker();
	};
</script>

<div class="w-10/12 m-5 flex flex-col gap-4">
	<div class="container">
		<div class="tags">
			{#if tags}
				{#each tags as tag}
					<div class="tag-bin">
						<div class="tag" style="background-color: {tag.color}; color: {tag.textColor}">
							{tag.text}
						</div>
						<div class="bin-container">
							<BinIcon on:click={() => handleBinClick(tag)} color="red" />
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<div class="tag-form">
	<input
		bind:this={tag_input}
		on:focus={handleTagFocus}
		type="text"
		name="tag"
		id="tag"
		class="new-tag"
		placeholder="Enter tag"
		maxlength="10"
	/>
	<div class="tools">
		<div class="tool">
			<input on:change={handlTextColorPickerChange} type="color" id="t" value="#0000" />
			<div class="tool-container">
				<label for="t"><TletterIcon bind:color={T_color} /></label>
			</div>
		</div>

		<div class="tool">
			<input
				on:change={handlBackColorPickerChange}
				type="color"
				id="palette"
				name="head"
				value="#FFFFFF"
			/>
			<div class="tool-container">
				<label for="palette"><PaletteIcon bind:color={B_color} /></label>
			</div>
		</div>
	</div>
	<div
		on:click={() =>
			handleAddTagClick({ text: tag_input.value, textColor: T_color, color: B_color })}
		class="add-tag"
	>
		<img src="images/plus.svg" alt="" />
	</div>
</div>

<style>
	input[type='text'] {
		width: 8em;
	}

	input[type='color'] {
		opacity: 0%;
		height: 0em;
		width: 0em;
	}

	.container {
		display: flex;

		align-items: center;
		gap: 1rem;
	}

	.tag-form {
		width: 100%;

		display: flex;
		justify-content: center;

		gap: 1em;
	}

	.tags {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		padding: 0.2rem;
		margin-left: 0.7rem;
		width: 12rem;
		gap: 0.5rem;

		border-radius: 1rem;
	}

	#tag {
		width: 11em;
	}

	.tag {
		padding-left: 0.4rem;
		padding-right: 0.4rem;
		display: inline;

		border: 1px solid rgba(0, 0, 0, 28%);
		border-radius: 3rem;
		text-align: center;

		cursor: default;
	}

	.tag-bin {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.new-tag {
		border: 1px solid rgba(0, 0, 0, 28%);
		border-radius: 3rem;
		text-align: center;
	}

	.tools {
		display: flex;
		flex-direction: row;

		gap: 0.4em;
	}

	.tool {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.add-tag {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.add-tag img {
		width: 2em;
		height: 2em;
	}

	.add-tag:hover {
		transition-delay: 100ms;
		transform: scale(1.1);
	}

	.bin-container:hover {
		animation: spin 0.2s linear infinite;
	}

	.tool-container:hover {
		transform: scale(1.1);
	}

	.bin-container:active {
		animation: myAnimation 0.2s linear 1s;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(0deg);
		}
		75% {
			transform: rotate(4deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}

	@keyframes myAnimation {
		0% {
			opacity: 1;
			transform: rotateX(90deg);
		}
		50% {
			opacity: 0.5;
			transform: rotateX(0deg);
		}
		100% {
			display: none;
			opacity: 0;
			transform: rotateX(90deg);
		}
	}
</style>
