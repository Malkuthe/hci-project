<template>
    <div id="account" class="card">
        <h1>Account Details</h1>
        <div id="account-details">
            <basic-info />
            <account-security />
            <account-address />
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/Account/BasicInfo.vue'
import Security from '@/components/Account/Security.vue'
import Address from '@/components/Account/Address.vue'

export default {
    name: 'account',
    components: {
        BasicInfo,
        accountSecurity: Security,
        accountAddress: Address
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

            #basic-info {
                grid-column: 1 / 4;
                grid-row: 1 / -2;
            }

            #security {
                grid-column: 1 / 4;
                grid-row: -2 / -1;
                padding-right: 15px;
            }

            #address {
                grid-column: 4 / -1;
                grid-row: 1 / -1;
                padding-left: 15px;
            }
        }

        h1 {
            grid-column: 1 / -1;
            margin-top: 0px;
        }
    }
</style>
