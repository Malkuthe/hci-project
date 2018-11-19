<template>
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
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'account-address',
    data() {
        return {
            editAddressMode: false,
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
    #address {
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
</style>
