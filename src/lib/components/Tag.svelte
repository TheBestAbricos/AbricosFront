<script lang="ts">
	import type { TagType } from '$lib/types/card';
	
	export let tag: TagType;
</script>

<div
	class="tag rounded-2xl hover:text-gray-900 hover:ring-2 hover:ring-gray-300 select-none"
	style="background-color:{tag.color ? tag.color : '#fff'};color:{tag.textColor
		? tag.textColor
		: '#000'}"
>
	{tag.text}
</div>

<style>
	.tag {
		height: 2rem;
		min-width: 3rem;
		text-align: center;
		padding: 0.5rem;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border: 1px solid grey;
		/* border-radius: 20px; */
		box-sizing: border-box;
		flex-wrap: nowrap;
		transition-duration: 200ms;
		font-size: 0.75em;
	}
	.tag:hover {
		transform: scale(1.02);
		transform: rotate(-1deg);
		/* box-shadow: 0 0 10px 0px grey; */
	}
	.tag:not(:last-child) {
		margin-right: 0.2rem;
	}
</style>
