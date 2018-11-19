<template>
    <div id="basic-info">
        <div id="picture">
            <fa-icon icon="user-circle" size="8x" />
        </div>
        <div id="details">
            <p><b>Name:</b> {{ user.name.first + " " }} {{ user.name.middle + " " }} {{ user.name.last }}</p>
            <p><b>Student Number:</b> {{ user.studentNum }}</p>
            <p><b>Student Email:</b> {{ user.studentEmail }}</p>
            <p><b>Phone Number:</b> {{ user.phoneNum }}</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'basic-info',
    data() {
        return {
            user: {
                name: {
                    first: this.$store.state.mockUser.name.first,
                    middle: this.$store.state.mockUser.name.middle,
                    last: this.$store.state.mockUser.name.last
                },
                studentNum: this.$store.state.mockUser.studentNum,
                studentEmail: this.$store.state.mockUser.studentEmail,
                phoneNum: this.$store.state.mockUser.phoneNum
            }
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
    #basic-info {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;

        #picture {
            text-align: center;
            grid-column: 1 / 2;
            grid-row: 1 / -1;
        }

        #details {
            grid-column: 2 / -1;
            grid-row: 1 / -1;
            padding-right: 15px;

            p:first-child {
                margin-top: 0px;
            }
        }
    }
</style>
