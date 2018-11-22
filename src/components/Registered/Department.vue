<template>
    <div class='list-department' :id="'list-department--' + dept">
        <h4>{{ department }}</h4>
        <div v-for='course in courses' :key='course[0]'>
            <list-section
                v-for='section in sections(course)'
                :key='section'
                :term='term'
                :dept='dept'
                :course='course'
                :section='section'
                :lecture='lecture(course,section)'
                :lab='lab(course,section)'
                :status='status' />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Section from '@/components/Registered/Section.vue'

export default {
    name: 'list-department',
    props: {
        term: {
            type: String,
            required: true
        },
        dept: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    components: {
        listSection: Section
    },
    data() {
        return {
            location: this.status.toLowerCase() == 'registered' ? 'registeredCourses' : 'waitlistedCourses'
        }
    },
    methods: {
        sections(course) {
            var crs = this.mockUser[this.location][this.term][this.dept][course]
            var sections = []

            for (const section in crs) {
                sections.push(section);
            }

            return sections
        },
        lecture(course,section) {
            var sec = this.mockUser[this.location][this.term][this.dept][course][section]

            if (!sec.lab && !sec.lecture) return ''
            if (sec.lab) return section
            if (sec.lecture) return sec.lecture
        },
        lab(course,section) {
            var sec = this.mockUser[this.location][this.term][this.dept][course][section]

            if (!sec.lab && !sec.lecture) return ''
            if (sec.lecture) return section
            if (sec.lab) return sec.lab
        }
    },
    computed: {
        ...mapState([
            'mockUser',
            'courses'
        ]),
        courses() {
            
            var dept = this.mockUser[this.location][this.term][this.dept]

            var courses = []
            for(const course in dept) {
                courses.push(course);
            }
            return courses
        },
        department() {
            var result = this.dept.replace(/-/g,' ').split(' ');
            for(var i = 0; i < result.length; i++) {
                result[i] = result[i].charAt(0).toUpperCase() + result[i].substr(1);
            }
            result = result.join(' ');
            return result;
        }
    }
}
</script>

<style lang='scss' scoped>
    .list-department{
        h4 {
            margin-bottom: 0.4em;
        }
    }
</style>
