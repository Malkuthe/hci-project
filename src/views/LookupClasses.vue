<template>
    <div id='lookup-classes-container'>
        <div id='sidebar' class='card'>
            <h2>Courses</h2>
            <form>
                <div class='field'>
                    <label for='term'>Term:</label>
                    <v-select
                        name='term'
                        v-model='term'
                        id='term'
                        :options='courses.terms'
                        :searchable='true'
                        track-by='name'
                        label='name' />
                </div>
            </form>
            <div v-if='registeredDepartments.length > 0'>
            <h3>Registered</h3>
                <list-department 
                    v-for='dept in registeredDepartments'
                    :key="'registered-' + dept"
                    :term='term.code'
                    :dept='dept'
                    status='registered' />
            </div>
            <div v-if='waitlistedDepartments.length > 0'>
                <h3>Waitlisted</h3>
                <list-department 
                    v-for='dept in waitlistedDepartments'
                    :key="'waitlisted-' + dept"
                    :term='term.code'
                    :dept='dept'
                    status='waitlisted' />
            </div>
        </div>
        <transition name='slide-left'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Department from '@/components/Registered/Department.vue'

export default {
    name: 'lookup-page',
    components: {
        listDepartment: Department
    },
    methods: {
        ...mapMutations([
            'editUserData'
        ])
    },
    computed: {
        ...mapState([
            'mockUser',
            'courses'
        ]),
        term: {
            set(term) {
                this.editUserData({
                    key: 'selectedTerm',
                    data: term
                })
            },
            get() {
                return this.mockUser.selectedTerm
            }
        },
        registeredDepartments() {
            var termCourses = this.mockUser.registeredCourses[this.term.code]
            var depts = []
            for (const d in termCourses) {
                depts.push(d)
            }
            depts = depts.sort()
            return depts
        },
        waitlistedDepartments() {
            var termCourses = this.mockUser.waitlistedCourses[this.term.code]
            var depts = []
            for (const d in termCourses) {
                depts.push(d)
            }
            depts = depts.sort()
            return depts
        }
    }
}
</script>

<style lang="scss">
    #lookup-classes-container {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: auto;
        grid-column-gap: 30px;
        text-align: left;

        h2:first-child {
            margin-top: 0;
        }

        #sidebar {
            grid-column: 1 / 4;
            grid-row: 1 / -1;
        }

        #lookup, #timetable {
            grid-column: 4 / -1;
            grid-row: 1 / -1;
        }
    }
</style>
