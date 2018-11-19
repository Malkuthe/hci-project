<template>
    <div id="logout" class="card">
        <h2>You have successfully logged out.</h2>
        <p>Automatically redirecting you in <span id="timer">{{ logoutTimer }}</span> seconds...</p>
        <small><router-link to='/'>Click here to manually return to the main page.</router-link></small>
    </div>
</template>

<style lang="scss" scoped>
    #logout {
        width: 50%;
        margin-left: auto;
        margin-right: auto;

        #id {
            font-weight: bold;
            font-size: 125%;
        }
    }
</style>


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