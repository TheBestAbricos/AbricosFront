<script lang="ts">
	import { getCurrentUserInfo } from "$lib/firestore";
	import type { TagType } from "$lib/types/card";
	import Tag from "../Tag.svelte";

	let T_color_piker: HTMLInputElement;	//text
	let B_color_piker: HTMLInputElement;	//background
	let tag_input: HTMLInputElement;
	let tags: Array<TagType>;

	const tagExistsText = 'Tag exists'

	getCurrentUserInfo().then(data => {
		tags = data.tags
	})

	const handlTextColorPickerChange = () => {
		if (tag_input)
			tag_input.style.color = T_color_piker.value
	}

	const handlBackColorPickerChange = () => {
		if (tag_input)
			tag_input.style.backgroundColor = B_color_piker.value
	}

	const clearTagInput = () => {
		if (tag_input) {
			tag_input.value = ''
			tag_input.style.color = '#000'
			tag_input.style.backgroundColor = '#ffffff'
		}
	}

	const handleTagFocus = () => {
		if (tag_input) {
			if (tag_input.value == tagExistsText) {
				clearTagInput()
			}
		}
	}

	const handleAddTagClick = () => {
		if (tags) {
			for(let i = 0; i < tags.length; i++) {
				let e = tags[i]
				if (e.text.toLocaleLowerCase() === tag_input.value.toLocaleLowerCase()) {
					clearTagInput()
					tag_input.style.color = 'red'
					tag_input.value = 'Tag exists'

					return
				}
			}
		}
		
		//send tagCreate requests
	}
</script>

<div class="w-8/12 m-5 flex flex-col gap-4">
	<div class="tags">
		{#if tags}
			{#each tags as tag}
				<div style="background-color: {tag.color}; color: {tag.textColor}"class='tag'>{tag.text}</div>
			{/each}
		{/if}
	</div>
</div>

<div class='tag-form'>
	<input bind:this={tag_input} on:focus={handleTagFocus} type="text" name="tag" id="tag" class="new-tag" placeholder="Enter tag" maxlength="20"/>
	<div class="tools">
		<div class="tool">
			<input bind:this={T_color_piker} on:change={handlTextColorPickerChange} type="color" id="t" value="#0000">
			<label for="t"><img class='T' src="images/T.svg" alt="T"></label>
		</div>

		<div class="tool">
			<input bind:this={B_color_piker} on:change={handlBackColorPickerChange} type="color" id="palette" name="head" value="#FFFFFF">
			<label for="palette"><img class='palette'src="images/palette.svg" alt="palette"></label>
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
		width: 1.4em;
	}

	.tag-form {
		width: 100%;

		display: flex;
		justify-content: center;

		gap: 1em;
	}

	#tag {
		width: 11em;
	}

	.tag {
		border: 1px solid rgba(0, 0, 0, 28%);
		border-radius: 3rem;

		text-align: center;
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
	
	.add-tag img {
		width: 2em;
		height: 2em;
	}
</style>
