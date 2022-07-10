<script lang="ts">
    import Logo from "./shared/Logo.svelte";
    import {logIn, createAccount} from "$lib/firebase"
    import type { User } from "firebase/auth";
    import type * as fbApp from "firebase/app";
    import { codes } from "$lib/errorCodeTranslator";

    export let isRegister: boolean;
    
    let email: string;
    let password: string;
    let errorMessage: string = "";
    async function onLoginClick() : Promise<void> {
        if(email.length == 0 || password.length == 0) return;
        try {
            const user = await logIn(email, password);
            if(user.user) {
                window.location.href = "/";
            }
        }
        catch(e) {
            let fbError = e as fbApp.FirebaseError;
            errorMessage = (codes as any)[fbError.code] ?? fbError.code;
        }
    }
    async function onRegisterClick() : Promise<void> {
        if(email.length == 0 || password.length == 0) return;
        try {
            const user = await createAccount(email, password);
            if(user.user) {
                window.location.href = "/";
            }
        }
        catch(e) {
            let fbError = e as fbApp.FirebaseError;
            errorMessage = (codes as any)[fbError.code] ?? fbError.code;
        }
    }
    function onEnterClick(e: KeyboardEvent) {
        if(e.key == "Enter") {
            onLoginClick();
        }
    }
</script>

<div class="login_box">
    <div class="form_container">
        <Logo withText={true}/>
        <form class="auth_form">
            <input type="text" class="auth_input" placeholder="Email" on:keypress={onEnterClick} bind:value={email}>
            <input type="password" class="auth_input" placeholder="Password"  on:keypress={onEnterClick} bind:value={password}>
        </form>
        <div class="error_message">
            {#if errorMessage !== ""}
                {errorMessage}
            {/if}
        </div>
        <div class="auth_buttons_section">
            <button class="auth_button auth_button_login" data-auth="signin" on:click={onLoginClick}>Sign in</button>
            <button class="auth_button auth_button_signup" data-auth="signup" on:click={onRegisterClick}>Register</button>
        </div>
    </div>
</div>



<style>
    .error_message {
        color: red;
        margin: 10px auto 0 auto;
        text-align: center;
    }
    .auth_button {
        padding: 7px 25px;
        display: flex;
        justify-content: center;
        border: rgba(0, 0, 0, 0.28) 1px solid;
        border-radius: 30px;
        font-size: 12px;
    }
    .auth_button_signup {
        background-color: rgba(207, 167, 231, 1);
    }
    .auth_buttons_section {
        margin: 37px 0;
        display: flex;
        justify-content: space-around;
    }
    .auth_form {
        display: flex;
        flex-direction: column;
    }
    .auth_input {
        border: rgba(0, 0, 0, 0.28) 1px solid;
        border-radius: 30px;
        margin: 17px 0 ;
        padding: 10px 0 10px 17px;
        font-size: 20px;
    }
    .auth_input:nth-child(2) {
        margin: 0;
    }
    .login_box {
        margin: 0 20px;
        padding: 20px;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .form_container {
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        border-radius: 30px;
        border: rgba(0, 0, 0, 0.28) 1px solid;
        width: 400px;
        padding: 18px 53px 0 53px;
    }
</style>