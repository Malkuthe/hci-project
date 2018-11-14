<template>
    <div id="nav">

        <div id="branding">
            Borealis
        </div>

        <div id="nav__links">
            <ul>
                <li><router-link to='/'>Home</router-link></li>
                <li><router-link to='/about'>About</router-link></li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    name: 'navbar'
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
