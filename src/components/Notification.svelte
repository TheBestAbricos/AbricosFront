<script lang='ts' context='module'>
    import { get } from 'svelte/store';
    import { noficationStatus } from '$lib/stores'
    import SaveButton from "./shared/SaveButton.svelte";
    import CancelButton from "./shared/CancelButton.svelte";
    import ToggleSwitch from "./shared/ToggleSwitch.svelte";

    const url_server = 'google.com'
    const url_bot = 'https://web.telegram.org/k/#@volunsup_bot'
    const url_turn_off_notifications = 'google.com'

    let container: HTMLDivElement;
    let back: HTMLDivElement;
    let input: HTMLInputElement;

    export let toggledChecked: boolean = true

    export const hideContainter = () => {
        back.style.display = 'none'

        clearContainerInput()
    }

    export const revealContainer = () => {
        if (container) {
            toggledChecked = get(noficationStatus)
            
            back.style.display = 'block'

            clearContainerInput()
        }
    }

    const clearContainerInput = () => {
        if (input)
            input.value = ''
    }

    const botImgClickHandler = () => window.location.href = url_bot

    const sendId = async() => {
        if (!input.value) {
            input.focus()
            return
        }

        let res = await fetch(url_server)
        
        if (!res.ok) {
            input.value = ''
            input.placeholder = 'Wrong code'

            return
        }
            
        noficationStatus.set(true)
        toggledChecked = true
        
        hideContainter()
    }

    const sendNotificationStatus = async () => {
        if (toggledChecked === false) {
            let res = await fetch(url_turn_off_notifications)
            //TODO: add res handling
        }

        noficationStatus.set(toggledChecked)

        hideContainter()
    }

</script>
<div bind:this={back} on:click|stopPropagation class='back'>
<div bind:this={container} class='container'>
    <div class='label'>
        <p>Notifications</p>
    </div>
    <div class='body'>
        {#if $noficationStatus == false}
            <img on:click={botImgClickHandler} src="images/tg-bot.svg" alt="tg-bot">

            <input bind:this={input} type="text" placeholder="Enter code"> 

            <div class="buttons">
                <SaveButton on:click={sendId}/>
                <CancelButton on:click={hideContainter}/>
            </div>
        {:else}
            <div class='notifications-on'>
                Notification enabled
                <ToggleSwitch on:change={()=> toggledChecked = !toggledChecked} bind:checked={toggledChecked}/>
            </div>

            <div class="buttons">
                <SaveButton on:click={sendNotificationStatus}/>
                <CancelButton on:click={hideContainter}/>
            </div>
        {/if}

    </div>
</div>
</div>
<style>
    .back {
        top: 0;
        left: 0;
        position: absolute;
        z-index: 100000000;

        width: 100vw;
        height: 100vh;
    }

    .container {
        position: absolute;
        width: 20rem;
        height: 20rem;
        
        border-radius: 10%;
        border: 1px solid rgba(0, 0, 0, 28%);

        display: flex;
        flex-direction: column;

        background-color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

    }

    .label {
        height: 3rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border-bottom: 1px solid rgba(0, 0, 0, 28%);
    }

    .body {
        width: 100%;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        margin-top: 3rem;

    }

    .body input {
        text-align: center;
        border-radius: 1em;
        border: 1px solid rgba(0, 0, 0, 28%);
    }

    .body img {
        width: 30%;

        border-radius: 50%;
    }

    .body .buttons {
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    .notifications-on {
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 0.5em;
    }
</style>