<template>
    <div id="security">
        <h2>Security</h2>
        <div v-if='!editPassMode'>
            <p><b>Current Password:</b> {{ mockUser.password }} <br /> <span class="hint">This is only shown in the prototype to demonstrate that the user can change their password.</span></p>
            <p><a href="javascript:void(0);" v-on:click='editPassword'><fa-icon icon="edit" /> Change Password</a></p>
        </div>
        <div v-if='editPassMode'>
            <form id='password-form'
                @submit.prevent='handleSubmitPass'
                @input='clearPassErrs'>
                <div id='current-pass-container' class='field'>
                    <label for="current-pass">Current Password <span v-if='errCurrent' class='err'> <fa-icon icon='exclamation-triangle' /> Incorrect password!</span></label>
                    <input
                        name='current-pass'
                        v-model='currentPass'
                        id='current-pass'
                        type='password'
                        placeholder='Current Password' />
                </div>
                <div id='new-pass-container' class='field'>
                    <label for="new-pass">New Password</label>
                    <input
                        name='new-pass'
                        v-model='newPass'
                        id='new-pass'
                        type='password'
                        placeholder='New Password' />
                </div>
                <div id='confirm-pass-container' class='field'>
                    <label for="confirm-pass">Confirm Password <span v-if='errConfirm' class="err"><fa-icon icon='exclamation-triangle' /> Passwords do not match!</span></label>
                    <input
                        name='confirm-pass'
                        v-model='confirmPass'
                        id='confirm-pass'
                        type='password'
                        placeholder='Confirm Password' />
                </div>
                <div id='buttons-container'>
                    <button
                        name='cancel'
                        class='cancel'
                        type='button'
                        @click='cancelPassword'>Cancel</button>
                    <button
                        name='clear'
                        class='clear'
                        type='button'
                        @click='clearPassword'>Clear</button>
                    <button
                        name='submit'
                        class='submit'
                        type='submit'
                        form='password-form' >Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'account-security',
    data() {
        return {
            editPassMode: false,
            errCurrent: false,
            errConfirm: false,
            currentPass: '',
            newPass: '',
            confirmPass: ''
        }
    },
    methods: {
        ...mapMutations([
            'editUserData'
        ]),
        editPassword() {
            this.editPassMode = true
        },
        clearPassErrs() {
            this.errConfirm = false
            this.errCurrent = false
        },
        clearPassword() {
            this.currentPass = ''
            this.newPass = ''
            this.confirmPass = ''
            this.clearPassErrs()
        },
        cancelPassword() {
            this.clearPassword()
            this.editPassMode = false
        },
        handleSubmitPass() {
            console.log("Handling Password Submission")
            if (this.currentPass != this.mockUser.password) {
                this.errCurrent = true;
            }

            if (this.newPass != this.confirmPass) {
                this.errConfirm = true;
            }

            if (this.errConfirm || this.errCurrent) {
                return;
            }

            this.editUserData({
                key: 'password',
                data: this.newPass
            })

            this.clearPassword()
            this.editPassMode = false
        }
    },
    computed: {
        ...mapState([
            'mockUser'
        ])
    }
}
</script>

<style lang="scss" scoped>
    #security {
        #password-form {
            display: grid;
            grid-column-gap: 30px;
            grid-template-columns: repeat(2,1fr);
            grid-template-rows: repeat(3,auto);
            grid-template-areas:
                'current-pass current-pass'
                'next-pass confirm-pass'
                'buttons buttons';

            #current-pass-container {
                grid-area: current-pass;
            }

            #next-pass-container {
                grid-area: next-pass;
            }

            #confirm-pass-container {
                grid-area: confirm-pass;
            }

            #buttons-container {
                grid-area: buttons;
            }
        }
    }
</style>
