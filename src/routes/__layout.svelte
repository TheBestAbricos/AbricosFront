<script async lang="ts">
	import * as fb from '$lib/firebase';
	import '../app.css';
</script>

{#await fb.initPersistance() then}
	<slot />
{/await}
