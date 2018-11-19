<template>
    <div id="account" class="card">
        <h1>Account Details</h1>
        <div id="account-details">
            <div id="picture">
                <fa-icon icon="user-circle" size="8x"/>
            </div>
            <div id="basic-info">
                <p><b>Name:</b> {{ mockUser.name.first }} {{ mockUser.name.middle }} {{ mockUser.name.last }}</p>
                <p><b>Student Number:</b> {{ mockUser.studentNum }}</p>
                <p><b>Student Email:</b> {{ mockUser.studentEmail }}</p>
                <p><b>Phone Number:</b> {{ mockUser.phoneNum }}</p>
            </div>
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
            <div id="address">
                <div class="section-header">
                    <span id="address-header"><b>Address</b></span>
                    <span class="edit" v-if="!editAddressMode">
                        <small><a href="javascript:void(0);" v-on:click="editAddress">
                            [<fa-icon icon="edit" />Edit]
                        </a></small>
                    </span>
                </div>
                <div v-if="!editAddressMode">
                    {{ mockUser.address.line1 }} <br />
                    <span v-if="mockUser.address.line2">{{ mockUser.address.line2 }} <br /></span>
                    {{ mockUser.address.city }}, {{ mockUser.address.province }} <br />
                    {{ mockUser.address.postcode }}
                </div>
                <div v-if="editAddressMode">
                    <form id='address-form' @submit.prevent='handleSubmitAddress'>
                        <div id='line1-container' class='field'>
                            <label for="line1">Address Line 1</label>
                            <input 
                                name='line1'
                                v-model='line1'
                                id='line1' 
                                type='text'
                                placeholder='Address Line 1' />
                        </div>
                        <div id='line2-container' class='field'>
                            <label for='line2'>Address Line 2 (optional)</label>
                            <input
                                name='line2'
                                v-model='line2'
                                id='line2'
                                type='text'
                                placeholder='Address Line 2' />
                        </div>

                        <div id='city-container' class='field'>
                            <label for='city'>City</label>
                            <input
                                name='city'
                                v-model='city'
                                id='city'
                                type='text'
                                placeholder='City' />
                        </div>

                        <div id='province-container' class='field'>
                            <label for='province'>Province</label>
                            <v-select 
                                name='province'
                                v-model='province'
                                id='province'
                                :options='provinces' />
                        </div>

                        <div id='postcode-container' class='field'>
                            <label for='postcode'>Postal Code</label>
                            <input
                                name='postcode'
                                v-model='postcode'
                                id='postcode'
                                type='text'
                                placeholder='Postal Code' />
                        </div>

                        <div id='buttons-container'>
                            <button
                                name='cancel'
                                class='cancel'
                                type='button'
                                @click='cancelAddressForm'>Cancel</button>
                            <button
                                name='clear'
                                class='clear'
                                type='button'
                                @click='clearAddressForm'>Clear</button>
                            <button
                                name='submit'
                                class='submit'
                                type='submit'
                                form='address-form' >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'account',
    data() {
        return {
            editPassMode: false,
            editAddressMode: false,
            currentPass: '',
            newPass: '',
            confirmPass: '',
            errConfirm: false,
            errCurrent: false,
            line1: this.$store.state.mockUser.address.line1,
            line2: this.$store.state.mockUser.address.line2,
            city: this.$store.state.mockUser.address.city,
            province: this.$store.state.mockUser.address.province,
            postcode: this.$store.state.mockUser.address.postcode,
            provinces: [
                'Alberta',
                'British Columbia',
                'Manitoba',
                'New Brunswick',
                'Newfoundland and Labrador',
                'Northwest Territories',
                'Nova Scotia',
                'Nunavut',
                'Ontario',
                'Prince Edward Island',
                'Quebec',
                'Saskatchewan',
                'Yukon'
            ]
        }
    },
    computed: {
        ...mapState([
            'mockUser'
        ])
    },
    methods: {
        ...mapMutations([
            'editUserData'
        ]),
        editAddress() {
            this.editAddressMode = true
        },
        clearAddressForm() {
            console.log('trying to clear form')
            this.line1 = ''
            this.line2 = ''
            this.city = ''
            this.province = ''
            this.postcode = ''
        },
        cancelAddressForm() {
            this.line1 = this.mockUser.address.line1
            this.line2 = this.mockUser.address.line2
            this.city = this.mockUser.address.city
            this.province = this.mockUser.address.province
            this.postcode = this.mockUser.address.postcode
            this.editAddressMode = false
        },
        handleSubmitAddress() {
            var newAddress = {
                line1: this.line1,
                line2: this.line2,
                city: this.city,
                province: this.province,
                postcode: this.postcode
            }
            this.editUserData({
                key: 'address',
                data: newAddress })
            this.editAddressMode = false;
        },
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
    }
}
</script>

<style lang="scss" scoped>
    #account {
        text-align: left;

        #account-details {
            display: grid;
            grid-template-columns: repeat(6,1fr);
            grid-template-rows: repeat(3, auto);

            #picture {
                text-align: center;
                grid-column: 1 / 2;
                grid-row: 1 / -2;
            }

            #basic-info {
                grid-column: 2 / 4;
                grid-row: 1 / -2;
                padding-right: 15px;

                p:first-child {
                    margin-top: 0px;
                }
            }

            #security {
                grid-column: 1 / 4;
                grid-row: -2 / -1;
                padding-right: 15px;

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

            #address {
                grid-column: 4 / -1;
                grid-row: 1 / -1;
                padding-left: 15px;
                border-left: 1px solid rgba($dark-blue-grey,0.85);
                border-right: 0;
                border-image: linear-gradient(rgba(0,0,0,0),rgba($dark-blue-grey,0.85) 30%, rgba($dark-blue-grey,0.85) 70%, rgba(0,0,0,0));
                border-style: solid;
                border-image-slice: 1;
                
                .section-header {
                    margin-bottom: 0.5em;
                }

                #address-form {
                    display: grid;
                    grid-template-columns: repeat(3,1fr);
                    grid-template-rows: repeat(5, auto);
                    grid-template-areas:
                        'line1 line1 line1'
                        'line2 line2 line2'
                        'city province province'
                        'postcode postcode postcode'
                        'buttons buttons buttons';
                    grid-column-gap: 30px;
                    
                    #line1-container {
                        grid-area: line1;
                    }

                    #line2-container {
                        grid-area: line2;
                    }

                    #city-container {
                        grid-area: city;
                    }

                    #province-container {
                        grid-area: province;
                    }

                    #postcode-container {
                        grid-area: postcode;
                    }

                    #buttons-container {
                        grid-area: buttons;
                    }
                }
            }
        }

        h1 {
            grid-column: 1 / -1;
            margin-top: 0px;
        }
    }
</style>
