<template>
    <div id="login" class="card">

        <div id="form">
            
            <div id="login-form">
                <label for='username' class='username'>Username</label>
                <input 
                    v-model='username' 
                    class='username' 
                    placeholder='Username' />
                <label for='password' class='password'>Password</label>
                <input 
                    v-model='password' 
                    class='password' 
                    :type='loginType' 
                    placeholder='Password' />

                <button @click='tryLogin'>Login</button>
            </div>

            <div id="login-help">
                <transition :duration="1000" name="unfold">
                    <div v-if='errorLogin' class="alert error">Login failed. Incorrect username or password</div>
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

            #login-form{
                display: grid;
                grid-template-columns: 80px auto 1fr;
                grid-template-rows: repeat(auto-fill,35px);
                grid-template-areas: 'label input extra';
                grid-row-gap: 1.4em;

                label {
                    grid-area: label;
                    font-size: 100%;
                    display: flex;
                    align-items: center;
                    
                    &.username {
                        grid-row: 1 / 2;
                    }

                    &.password {
                        grid-row: 2 / 3;
                    }
                }

                input {
                    grid-area: input;
                    width: 250px;
                    height: 30px;
                    border-radius: 3px;
                    appearance: none;
                    border: none;
                    padding-left: 4px;
                    border: 2px solid $dark-blue-grey;
                    transition: 0.5s;

                    &.username {
                        grid-row: 1 / 2;
                    }

                    &.password {
                        grid-row: 2 / 3;
                    }

                    &:focus {
                        outline: 0;
                        border: 2px solid $brown;
                    }
                }

                button {
                    all: unset;
                    grid-area: input;
                    grid-row: 3 / 4;
                    padding: 10px 20px;
                    width: fit-content;
                    margin-left: auto;
                    background: $blue;
                    border-radius: 3px;
                    color: $pale-blue;
                    font-size: 80%;
                    transition: background-color 0.33s;
                    box-shadow: 
                        0 2px 2px 0 rgba(0,0,0,0.14), 
                        0 3px 1px -2px rgba(0,0,0,0.12), 
                        0 1px 5px 0 rgba(0,0,0,0.2);
                    
                    &:hover {
                        background: $light-blue;
                    }

                    &:active {
                        background: $dark-blue;
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
