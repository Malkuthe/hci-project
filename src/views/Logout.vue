<template>
    <div id="logout">
        <p>You have successfully logged out. <router-link to='/'>Click here to return to main page</router-link></p>
        <p>Automatically redirecting you in {{ logoutTimer }} seconds...</p>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'logout',
        computed: {
            ...mapState([
                'logoutTimer'
            ])
        }
    }
</script>