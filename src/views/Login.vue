<template>
    <div id="login" class="card">

        <div id="form">
            
            <form id="login-form" @submit.prevent='tryLogin'>
                <div class='field beside'>
                    <label for='username' class='username'>Username:</label>
                    <input 
                        v-model='username' 
                        class='text-input' 
                        placeholder='Username' />
                </div>
                <div class='field beside'>
                    <label for='password' class='password'>Password:</label>
                    <input 
                        v-model='password' 
                        class='text-input' 
                        :type='loginType' 
                        placeholder='Password' />
                </div>
                <div class='buttons-container'>
                    <button>Login</button>
                </div>
            </form>

            <div id="login-help">
                <transition :duration="1000" name="unfold">
                    <div v-if='errorLogin' class="alert error"><fa-icon icon='exclamation-triangle' /> Login failed. Incorrect username or password</div>
                </transition>
            </div>
        </div>

        <div id="info">
            <h2>Information</h2>
            <p>This is the high-fidelity prototype for the course registration system created for COMP3020 (Human-Computer Interaction) by Group 11.</p>
            <p><b>Members:</b> Shijun Qu, Jiehao Luo, Harris Cheng, John Paulo Baltao</p>
            <p>If you wish to test the system, please log in with the following credentials:</p>
            <p><b>Username:</b> {{ mockUser.username }}<br />
               <b>Password:</b> {{ mockUser.password }}<br /></p>
            <p>Please note that changes made on the user account will be deleted if you navigate away from the prototype or refresh the page.</p>
        </div>

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
            errorLogin: false,
            loginType: 'password'
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

<style lang="scss">
    .unfold-enter-active, .unfold-leave-active {
        transition: opacity 1.5s ease;
    }

    .unfold-enter, .unfold-leave-to {
        opacity: 0;
    }
</style>


<style lang="scss" scoped>
    #login {
        margin-left: auto;
        margin-right: auto;
        width: 80%;
        min-height: 300px;
        display: grid;
        grid-template-columns: 4fr 6fr;
        grid-template-areas: 'form info';

        #form {
            grid-area: form;
            padding-right: 20px;
            border-right: 1px solid rgba($dark-blue-grey,0.85);
            border-left: 0;
            border-image: linear-gradient(rgba(0,0,0,0),rgba($dark-blue-grey,0.85) 30%, rgba($dark-blue-grey,0.85) 70%, rgba(0,0,0,0));
            border-style: solid;
            border-image-slice: 1;

            #login-form {
                .field {
                    input {
                        grid-column: 2 / -1;
                    }
                }
            }

            #login-help {
                margin-top: 1.4em;

                .alert.error {
                    padding: 10px;
                    border: $red;
                    background: rgba($red,0.3);
                    border-radius: 3px;
                    color: $red;
                    font-size: 80%;
                    font-style: italic;
                }
            }
        }

        #info {
            text-align: left;
            padding-left: 20px;
            height: 100%;

            h2:first-child {
                margin-top: 0px;
            }
        }
    }
</style>
