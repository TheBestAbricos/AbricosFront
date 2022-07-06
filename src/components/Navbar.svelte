<script lang="ts">
    let flt: HTMLDivElement;
</script>

<nav>
    <div class="nav__el left">
        <div class="logo">
            <div class="logo__img"></div>
            <span class="logo__text">ABRICOS</span>
        </div>
    </div>

    <div class="nav__el right">
        <div class="menu">
            <div bind:this={flt} class="menu__el" id="filter"></div>
            <div class="menu__el" id="notification"></div>
            <div class="menu__el" id="logout"></div>

            <div class="user-logo"></div> 
        </div>
    </div>
</nav>

<style>
    nav {
        widows: 100%;
        height: 6%;

        display: flex;
        flex-direction: row;
        align-items: stretch;

        border-bottom: 1px solid rgba(0, 0, 0, 0.28);
    }

    .nav__el {
        width: 50%;

        display: flex;
    }

    .nav__el.right {
        justify-content: right;
    }

    .nav__el.left {
        justify-content: left;
    }
    

    .menu {
        margin-right: 2%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;

        gap: 20%;
    }

    .menu__el {
        width: 3em;
        height: 40%;
    }

    #filter {
        background: url('images/filter.svg') no-repeat center / cover;
    }

    #notification {
        background: url('images/notification-off.svg') no-repeat center / cover;
    }

    #logout {
        background: url('images/logout.svg') no-repeat center / cover;
    }

    .user-logo{
        width: 6em;
        height: 80%;

        background: url('images/user-default-logo.png') no-repeat center / cover;
        border-radius: 50%;
    }

    .logo {
        margin-left: 2%;

        display: flex;
        align-items: center;
        gap: 5%;
    }

    .logo span {
        font-size: 120%;
    }

    .logo__img {
        width: 3em;
        height: 3em;

        background: url('images/abricos.svg') no-repeat center / 90%;
    }
</style>