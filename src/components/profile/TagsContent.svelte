<script>
</script>

<div class="w-6/12 m-5 flex flex-col gap-4">
	<div class="border rounded-lg flex flex-col pt-2 w-full">
		{#each [1, 2, 3, 4, 5] as i}
			<p class="bg-gray-300 text-center p-1 mx-3 my-1 text-sm rounded-lg">tag</p>
		{/each}
		<p class="m-auto text-xs p-2 text-gray-400">Max count: 10</p>
	</div>

	<input
		type="text"
		name="tag"
		id="tag"
		class="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ring-gray-200"
	/>
</div>
