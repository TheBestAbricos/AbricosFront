// eslint-disable-line
	
	
	import { getCurrentUserInfo } from '$lib/firestore'; declare let $logoChoiceMode:Parameters<Parameters<typeof logoChoiceMode.subscribe>[0]>[0];
	import { logoChoiceMode } from '$lib/stores';
	import ProfileContent from './ProfileContent.svelte';
	import ProfileMenu from './ProfileMenu.svelte';
	import TagsContent from './TagsContent.svelte';
	import LogoChoice from './LogoChoice.svelte';
	import Security from './Security.svelte';

	let contentType: string = 'profile';

	function handleMessage(event: CustomEvent) {
		contentType = event.detail.text;
	}
</script>

<div class="flex sm:flex-row flex-col-reverse mt-3 w-full justify-center p-10">
	<ProfileMenu on:message={handleMessage} />
	<div class="container  sm:w-96 sm:h-96 h-72 mx-auto sm:mx-0 mb-5">
		<div class="label">
			<p class="select-none">{contentType}</p>
		</div>
		{#if contentType.toLowerCase() == 'profile'}
			{#if !$logoChoiceMode}
				<ProfileContent />
			{:else}
				<LogoChoice />
			{/if}
		{:else if contentType.toLowerCase() == 'security'}
			<Security />
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
