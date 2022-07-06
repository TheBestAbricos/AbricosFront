<script lang="ts">
    export let withText: boolean;
</script>

<div class="logo_container">
    <img src="/images/logo.svg" alt="" class="logo_svg">
    {#if withText}
        <span class="logo_text">Abricos</span>
    {/if}
</div>

<style>
    .logo_svg {
        margin-right: 10px;
    }
    .logo_container{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
    .logo_text {
        font-weight: 500;
        font-size: 40px;
        text-transform: uppercase;
    }
</style>