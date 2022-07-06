<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import FilterBar from '../components/filter/FilterBar.svelte';
    import ProgressIndicator from '../components/ProgressIndicator.svelte';
    import {getCurrentUser} from "$lib/firebase"
</script>

{#await getCurrentUser()}
    <ProgressIndicator/>
{:then user} 
    {#if user}
        <Navbar />
    {:else}
        {window.location.href = "/login"}
    {/if}
{/await}

