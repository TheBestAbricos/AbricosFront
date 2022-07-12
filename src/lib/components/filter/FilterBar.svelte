<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { Timestamp } from 'firebase/firestore';
	import { getCurrentUserInfo } from '$lib/firestore';
	import type { TagType } from '$lib/types/card';
	import type { FilterData } from '$lib/types/filter';
	import CheckBoxFilter from './CheckBoxFilter.svelte';
	import DropDown from './DropDown.svelte';
	import MultiSelect from '../MultiSelect.svelte';
	import SingleSelect from '../SingleSelect.svelte';
	import CancelIcon from '../shared/CancelIcon.svelte';

	export let isActive = false;

	const dispatch = createEventDispatcher();

	let tagsDropDownVisible = false;
	let nextDropDownVisible = false;

	let substring: string | undefined;

	let checked: boolean | undefined;

	let tags: Array<TagType> = [];
	let chosenTags: Array<TagType> = [];

	let timeStamp: Timestamp | undefined;
	let chosenTime: string | undefined;
	const timesSeconds = new Map([
		['30 minutes', 1800],
		['hour', 3600],
		['day', 86400],
		['week', 2592000],
		['mounth', 946080000],
	]);

	const raiseFilterEvent = () => {
		const data: FilterData = {
			tags: chosenTags,
			till: timeStamp,
			text: substring,
			completed: checked,
		};

		dispatch('filter', data);
	};

	$: isActive,
		getCurrentUserInfo().then((data) => {
			tags = data.tags;
		});

	$: substring,
		(() => {
			if (substring?.trim().length === 0) substring = undefined;

			raiseFilterEvent();
		})();

	const handleChosenTag = (event: { detail: { checked: boolean; tag: TagType } }) => {
		if (event.detail.checked) {
			chosenTags = [...chosenTags, event.detail.tag];
		} else {
			chosenTags = chosenTags.filter((item) => item.text !== event.detail.tag.text);
		}

		raiseFilterEvent();
	};

	const choseHanlder = (event: { detail: { choseItem: string | undefined } }) => {
		if (event.detail.choseItem !== undefined) {
			chosenTime = event.detail.choseItem;

			if (chosenTime) {
				const timeSec = timesSeconds.get(chosenTime);
				if (timeSec) {
					const ms = Date.now() + timeSec * 1000;
					timeStamp = Timestamp.fromDate(new Date(ms));
				}
			}
		} else {
			timeStamp = undefined;
		}
		// console.log(timesSeconds.get(chosenTime!)!);

		raiseFilterEvent();
	};

	const checkedHandler = (event: { detail: { checked: boolean } }) => {
		checked = event.detail.checked;
		raiseFilterEvent();
	};

	const handleCancelClick = () => {
		checked = undefined;
		timeStamp = undefined;
		chosenTime = undefined;
		substring = undefined;
		chosenTags = [];

		nextDropDownVisible = false;
		tagsDropDownVisible = false;

		raiseFilterEvent();
	};

	const handleTagsDropVis = (e: { detail: { visible: boolean } }) => {
		tagsDropDownVisible = e.detail.visible;
	};

	const handleNextDropVis = (e: { detail: { visible: boolean } }) => {
		nextDropDownVisible = e.detail.visible;
	};
</script>

{#if isActive}
	<div transition:slide class="lg:absolute w-full flex flex-wrap border-b border-gray-400 p-1">
		<!-- Tags filter -->
		<div class="md:m-0 my-0.5 mx-auto sm:mx-0">
			<DropDown label="Tags" visible={tagsDropDownVisible} on:changeVisible={handleTagsDropVis}>
				<MultiSelect isVisible={true} {tags} {chosenTags} on:handleChosenTag={handleChosenTag} />
			</DropDown>

			<!-- Next filter -->
			<DropDown label="Next" visible={nextDropDownVisible} on:changeVisible={handleNextDropVis}>
				<SingleSelect
					items={Array.from(timesSeconds.keys())}
					chosenItem={chosenTime}
					on:chose={choseHanlder}
				/>
			</DropDown>
		</div>

		<!-- Checked filter -->
		<CheckBoxFilter text="Completed" {checked} on:checked={checkedHandler} />

		<!-- Substring filter -->
		<div class="substring-input flex items-center md:ml-0 sm:ml-12 md:my-0 my-0.5 mx-auto">
			<input type="text" placeholder="Enter text seach" maxlength="30" bind:value={substring} />
			<div class="cancel">
				<CancelIcon on:click={handleCancelClick} />
			</div>
		</div>
	</div>
{/if}

<style>
	input {
		height: 2rem;
		border: 1px solid rgba(0, 0, 0, 28%);
		border-radius: 1rem;
		padding: 1rem;
	}

	.cancel {
		width: 3em;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		transform: rotate(360deg);
		transition: transform 0.5s;
	}

	.cancel:hover {
		transform: rotate(360deg) scale(1.1);
	}

	.cancel:active {
		transform: rotate(0deg);
		transition: 0s;
	}

	.substring-input {
		display: flex;
	}
</style>
