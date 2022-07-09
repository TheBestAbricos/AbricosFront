<script lang="ts">
	import { getCurrentUserInfo } from "$lib/firestore";
	import type { TagType } from "$lib/types/card";
	import PaletteIcon from '../shared/PaletteIcon.svelte'
	import TletterIcon from '../shared/TletterIcon.svelte'
	import CancelIcon from '../shared/CancelIcon.svelte'
	import BinIcon from '../shared/BinIcon.svelte'

	let T_color: string = "grey"	//text color
	let B_color: string = "grey"	//background

	let tag_input: HTMLInputElement;
	let tag: HTMLDivElement;
	let tagBack: HTMLDivElement;
	let tags: Array<TagType>;
	let isTagVisible: boolean = false

	const tagExistsText = 'Tag exists'		// error message for existing tag
	const tagsMaxCount = 4					// max tags count
	const tagsMaxCountText = 'Max tags'		// error message for existing tag
	
	getCurrentUserInfo().then(data => {
		tags = data.tags
	})

	const resetColorPicker = () => {
		T_color = "grey"	
		B_color = "grey"
	}

	const handlTextColorPickerChange = (e: Event) => {
		if (tag_input && e.target instanceof HTMLInputElement) {
			tag_input.style.color = e.target.value
			T_color = e.target.value
		}
	}

	const handlBackColorPickerChange = (e: Event) => {
		if (tag_input && e.target instanceof HTMLInputElement) {
			tag_input.style.backgroundColor = e.target.value
			B_color = e.target.value
		}
	}

	const clearTagInput = () => {
		if (tag_input) {
			tag_input.value = ''
			tag_input.style.color = '#000'
			tag_input.style.backgroundColor = '#ffffff'
		}
	}

	const getCurrentTagStyle = () => {
		return `color: ${tag.style.color}; background-color: ${tag.style.backgroundColor}`
	}

	const handleTagFocus = () => {
		if (tag_input) {
			if (tag_input.value == tagExistsText || tag_input.value == tagsMaxCountText) {
				clearTagInput()
			}
		}
	}
	
	const handleBinClick = (tag: TagType) => {
		console.log(tag);
		
		// update tags
		getCurrentUserInfo().then(data => {
			tags = data.tags
		})
	}

	const handleAddTagClick = () => {
		if (tags) {
			if (tags.length > tagsMaxCount) {
				clearTagInput()
				resetColorPicker()

				tag_input.style.color = 'red'
				tag_input.value = tagsMaxCountText
				return
			}

			for(let i = 0; i < tags.length; i++) {
				let e = tags[i]
				if (e.text.toLocaleLowerCase() === tag_input.value.toLocaleLowerCase()) {
					clearTagInput()
					tag_input.style.color = 'red'
					tag_input.value = tagExistsText

					return
				}
			}
		}
		
		// send tagCreate requests
		clearTagInput()
		resetColorPicker()
	}
</script>

<div class="w-10/12 m-5 flex flex-col gap-4">
	<div class='container'>
		<div class="tags">
			{#if tags}
				{#each tags as tag}
					<div class='tag-bin'>
						<div class='tag' style="background-color: {tag.color}; color: {tag.textColor}">{tag.text}</div>
						<BinIcon on:click={() => handleBinClick(tag)} color='red'/>
					</div>
				{/each}
			{/if}
		</div>

		<div>
			{#if isTagVisible}
				{#if tag} 
					<div class='tag' style={getCurrentTagStyle()}>{tag.innerText}</div>
					<div class='tag-change'>
						<CancelIcon color='red'/>
						<BinIcon color='red'/>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>

<div class='tag-form'>
	<input bind:this={tag_input} on:focus={handleTagFocus} type="text" name="tag" id="tag" class="new-tag" placeholder="Enter tag" maxlength="10"/>
	<div class="tools">
		<div class="tool">
			<input on:change={handlTextColorPickerChange} type="color" id="t" value="#0000">
			<label for="t"><TletterIcon bind:color={T_color}/></label>
		</div>

		<div class="tool">
			<input on:change={handlBackColorPickerChange} type="color" id="palette" name="head" value="#FFFFFF">
			<label for="palette"><PaletteIcon bind:color={B_color}/></label>
		</div>
	</div>
	<div on:click={handleAddTagClick} class='add-tag'>
		<img src="images/plus.svg" alt="">
	</div>
</div>

<style>
	input[type="text"] {
		width: 8em;
	}

	input[type="color"] {
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
		align-items: center;
		justify-content: center;

		padding: 0.2rem;
		margin-left: 0.7rem;
		width: 12rem;

		border: 1px solid rgba(0, 0, 0, 28%);
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

	.tag-change {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		
		gap: 1rem;
	}
</style>
