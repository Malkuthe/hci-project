<template>
    <div id="nav">

        <div id="branding">
            Borealis
        </div>

        <div id="nav__links">
            <ul>
                <li><router-link v-if='loggedIn' to='/'>Home</router-link></li>
                <li><router-link v-if='loggedIn' to='/about'>About</router-link></li>
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
        height: 20px;
        background-color: $gold;
        border-bottom: 5px solid $brown;

        #branding, #nav__links {
            height: 100%;
            display: flex;
            align-items: center;
        }

        #branding {
            float: left;
            font-size: 3em; 
        }

        #nav__links {
            float: right;
            
            ul {
                list-style: none;

                li {
                    float: left;
                    margin-right: 1.2em;
                }
            }
        }
    }
</style>
