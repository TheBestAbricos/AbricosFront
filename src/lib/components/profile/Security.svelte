<script lang='ts'>
import { getCurrentUser } from "$lib/firebase";

    import { onMount } from "svelte";

    let email: string; 

    onMount(async () => {
        email = getCurrentUser().email!;
    });
</script>
<div class='container'>
    <p>Email: {email}!</p>
</div>

<style>
    .container  {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>