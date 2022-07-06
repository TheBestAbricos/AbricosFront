<script lang="ts">
	export let text: string;
</script>

<div class="flex items-center my-3 mx-8">
	<input
		checked
		id="checkbox"
		type="checkbox"
		value=""
		class="w-4 h-4 text-gray-600 bg-gray-100 rounded border-gray-300 hover:cursor-pointer focus:ring-red-500focus:ring-2"
	/>
	<label
		for="checkbox"
		class="ml-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:cursor-pointer"
		>{text}</label
	>
</div>
