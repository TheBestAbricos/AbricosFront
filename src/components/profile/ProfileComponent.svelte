<script lang="ts">
	import ProfileContent from './ProfileContent.svelte';
	import ProfileMenu from './ProfileMenu.svelte';
	import TagsContent from './TagsContent.svelte';

	let contentType: String = 'profile';

	function handleMessage(event: CustomEvent) {
		contentType = event.detail.text;
	}
</script>

<div class="flex mt-20 w-full justify-center p-10">
	<ProfileMenu on:message={handleMessage} />
	<div class="container w-96 h-96">
		<div class="label">
			<p class="select-none">{contentType}</p>
		</div>
		{#if contentType.toLowerCase() == 'profile'}
			<ProfileContent />
		{:else if contentType.toLowerCase() == 'security'}
			<!-- <TagsContent /> -->
		{:else if contentType.toLowerCase() == 'tags'}
			<TagsContent />
		{/if}
	</div>
</div>

<style>
	.container {
		border-radius: 10%;
		border: 1px solid rgba(0, 0, 0, 28%);

		display: flex;
		flex-direction: column;

		background-color: white;
	}

	.label {
		height: 3rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		border-bottom: 1px solid rgba(0, 0, 0, 28%);
	}
</style>
