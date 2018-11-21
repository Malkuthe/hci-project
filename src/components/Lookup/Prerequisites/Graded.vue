<template>
    <div v-if='prereq != null' class='prerequisite-graded prerequisite' :id='prereq'>
        <span class='code'><b>{{ code }}</b></span>
        <span v-if='met' class='met'><fa-icon icon='check-circle' /></span>
        <span v-if='!met' class='unmet'><fa-icon icon='times-circle' /></span>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'prerequisite-graded',
    props: {
        prereq: {
            type: Object,
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
            return this.findCourse(this.prereq.code)
        },
        coursesHeld() {
            return this.mockUser.coursesHeld
        },
        code() {
            var split = this.prereq.code.match(/[a-zA-z]+|[0-9]+/gi)
            split[0] = split[0].toUpperCase();
            split[1] = split[1].toUpperCase();
            return split[0] + " " + split[1] + " (" + this.prereq.grade.toUpperCase() + ")";
        },
        met() {
            if (this.mockUser.coursesHeld.hasOwnProperty(this.prereq.code)) {
                if(this.mockUser.coursesHeld[this.prereq.code].toLowerCase() <= this.prereq.grade) {
                    return true
                }
            }
            return false
        }
    }
}
</script>