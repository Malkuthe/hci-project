<template>
    <div id="nav">

        <div id="branding">
            Borealis
        </div>

        <div id="nav__links">
            <ul>
                <li><router-link v-if='loggedIn' to='/'>Home</router-link></li>
                <li><router-link v-if='loggedIn' to='/registration'>Registration</router-link></li>
                <li><router-link v-if='loggedIn' to='/account'>My Account</router-link></li>
                <li v-if="loggedIn"><a to='/logout' v-on:click="doLogout" href="javascript:void(0)">Log Out</a></li>
            </ul>
        </div>

    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import router from '@/router'

export default {
    name: 'navbar',
    methods: {
        ...mapMutations([
            'logout'
        ]),
        doLogout() {
            this.logout();
            router.push('/logout');
        }
    },
    computed: {
        ...mapState([
            'loggedIn'
        ])
    }
}
</script>

<style lang="scss" scoped>
    #nav {
        background-color: $gold;
        border-bottom: 5px solid $brown;
        box-sizing: border-box;
        display: grid;
        grid: auto;
        align-items: center;
        padding: 0;

        #branding, #nav__links {
            grid-row: 1 / -1;
        }

        #branding {
            font-size: 3em;
            font-family: 'Lora', 'Helvetica', serif;
            text-align: left;
            padding-left: 30px;
            float: left;
        }

        #nav__links {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            ul {
                list-style: none;
                margin-top: none;
                margin-bottom: none;
                padding-left: none;

                li {
                    float: left;
                    margin-right: 1.2em;
                }
            }
        }
    }
</style>
