<template>
    <div class='department' 
         :id="'department-entry--' + affix" >
        <div class='department-header' 
             :id="'department-header--' + affix"
             :class="{'active':show}"
             @click='show = !show' >
            <div class='department-name' 
                 :id="'department-name--' + affix">
                {{ dept.name }}
            </div>
            <div class='department-toggle-button'
                 :id="'department-toggle-button--' + affix">
                <fa-icon :icon="!show ? 'chevron-circle-left' : 'chevron-circle-down'" />
            </div>
        </div>
        <div v-if='show'>
            <course-entry v-for='course in deptCourses'
                :key='course.code'
                :course='course'
                :term='term' />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import CourseEntry from '@/components/Lookup/CourseEntry.vue'

export default {
    name: 'department-entry',
    props: {
        dept: {
            type: Object,
            required: true
        },
        term: {
            type: Object,
            required: true
        },
        folded: {
            type: Boolean,
            default: false
        }
    },
    components: {
        courseEntry: CourseEntry
    },
    data() {
        return {
            show: !this.folded
        }
    },
    computed: {
        ...mapState([
            'courses'
        ]),
        deptCourses: function() {
            var courseCodes = this.courses[this.term.code][this.dept.code].courses
            var courses = []
            for (var i = 0; i < courseCodes.length; i++) {
                var course = this.courses[this.term.code][this.dept.code][courseCodes[i]]
                courses.push(course);
            }

            return courses
        },
        affix() {
            return this.dept.code + '-' + this.term.code
        }
    },
    mounted() {
        console.log(this.dept)
    }
}
</script>

<style lang='scss' scoped>
    .department {

        &:first-child {
            .department-header{
                border-top: 0;
            }
        }

        &:last-child {
            .department-header:not(.active) {
                margin-bottom: -1px;
            }
        }

        .department-header{
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: auto;
            border-top: 1px solid $grey;
            border-bottom: 1px solid $grey;

            &:not(.active) {
                border-bottom: 0;
            }
            
            .department-name {
                grid-column: 1 / -2;
                font-weight: bold;
                font-size: 120%;
            }

            .department-toggle-button {
                grid-column: -2 / -1;
                align-self: center;
                justify-self: right;
            }
        }
    }
</style>
