<template>
    <div id="login">
        <label for='username'>Username</label>
        <input v-model='username' id='username' placeholder='Username' />
        <label for='password'>Password</label>
        <input v-model='password' id='password' placeholder='Password' />
        <button @click='tryLogin'>Login</button>
        <div v-if='errorLogin' class="alert error">Login failed. Incorrect username or password</div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
            errorLogin: false
        }
    },
    methods: {
        ...mapMutations([
            'login'
        ]),
        tryLogin() {
            if (this.username.toLowerCase() == this.mockUser.username.toLowerCase() && this.password == this.mockUser.password) {
                this.errorLogin = false
                this.login()
                this.$router.push(this.$route.query.redirect || '/')
            } else {
                this.errorLogin = true
            }
            return
        },
    },
    computed: {
        ...mapState([
            'loggedIn',
            'mockUser'
        ])
    }
}
</script>

<style lang="scss" scoped>

</style>
