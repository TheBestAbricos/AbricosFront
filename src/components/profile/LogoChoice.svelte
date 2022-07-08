<script lang="ts">
    import { logoSrc, logoChoiceMode } from "$lib/stores";

    const handleImgClick = (e: Event) => {
        if (e.target instanceof HTMLImageElement) {
            logoSrc.set(e.target.src)
            logoChoiceMode.set(false)
        }
    }
</script>


<div class="container">
    <div class="row">
	    <img on:click={handleImgClick} class="hover:ring-cyan-600 hover:ring-1 hover:shadow-md cursor-pointer" src="images/profile-images/user-default-logo.png" alt="">
	    <img on:click={handleImgClick} class="hover:ring-cyan-600 hover:ring-1 hover:shadow-md cursor-pointer" src="images/profile-images/1.png" alt="">
	    <img on:click={handleImgClick} class="hover:ring-cyan-600 hover:ring-1 hover:shadow-md cursor-pointer" src="images/profile-images/2.jpeg" alt="">
    </div>
    
    <div class="row">
        <img on:click={handleImgClick} class="hover:ring-cyan-600 hover:ring-1 hover:shadow-md cursor-pointer" src="images/profile-images/3.png" alt="">
        <img on:click={handleImgClick} class="hover:ring-cyan-600 hover:ring-1 hover:shadow-md cursor-pointer" src="images/profile-images/4.jpeg" alt="">
        <img on:click={handleImgClick} class="hover:ring-cyan-600 hover:ring-1 hover:shadow-md cursor-pointer" src="images/profile-images/5.jpeg" alt="">
    </div>

    <div class="row">
        <img on:click={handleImgClick} class="hover:ring-cyan-600 hover:ring-1 hover:shadow-md cursor-pointer" src="images/profile-images/6.png" alt="">
        <img on:click={handleImgClick} class="hover:ring-cyan-600 hover:ring-1 hover:shadow-md cursor-pointer" src="images/profile-images/7.jpeg" alt="">
        <img on:click={handleImgClick} class="hover:ring-cyan-600 hover:ring-1 hover:shadow-md cursor-pointer" src="images/profile-images/8.jpeg" alt="">
    </div>
</div>

<style>    
    .container {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        gap: 2em;
    }
    
    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        gap: 2em
    }

    img {
        width: 5em;
        height: 5em;

        border-radius: 50%;
    }
</style>