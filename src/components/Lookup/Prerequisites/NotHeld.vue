<template>
    <div v-if='prereq != null' class='prerequisite-notheld prerequisite' :id='prereq'>
        <span class='code'><b>{{ code }}</b></span>
        <span v-if='met' class='met'><fa-icon icon='check-circle' /></span>
        <span v-if='!met' class='unmet'><fa-icon icon='times-circle' /></span>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'prerequisite-notheld',
    props: {
        prereq: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters([
            'findCourse'
        ]),
        ...mapState([
            'mockUser'
        ]),
        course() {
            return this.findCourse(this.prereq)
        },
        coursesHeld() {
            return this.mockUser.coursesHeld
        },
        code() {
            var split = this.prereq.match(/[a-zA-z]+|[0-9]+/gi)
            split[0] = split[0].toUpperCase();
            split[1] = split[1].toUpperCase();
            return split[0] + " " + split[1];
        },
        met() {
            if (!this.mockUser.coursesHeld.hasOwnProperty(this.prereq)) return true
            return false
        }
    }
}
</script>
