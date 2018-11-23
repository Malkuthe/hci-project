<template>
    <div id='lookup' class='card'>
        <h2>Registration <router-link class='link' to='/registration/timetable'>Go to Timetable <fa-icon icon='arrow-right' /></router-link></h2>
        <div id='lookup-table'>
            <div id='lookup-table-header'>
                <form id='lookup-form'
                    @submit.prevent='handleSubmitLookup'>
                    <div id='term-container' class='field'>
                        <label for='lookup-term'>Term:</label>
                        <v-select
                            name='lookup-term'
                            v-model='term'
                            id='lookup-term'
                            :options='courses.terms'
                            :searchable='true'
                            :allow-empty='false'
                            :hide-selected='true'
                            track-by='name'
                            label='name' />
                    </div>
                    <div id='department-container' class='field'>
                        <label for='department'>Department:</label>
                        <v-select
                            name='department'
                            v-model='department'
                            id='term'
                            :options='courses.departments'
                            :multiple='true'
                            :close-on-select='false'
                            :hide-selected='true'
                            @input='sortDepartments'
                            track-by='name'
                            label='name' />
                    </div>
                </form>
            </div>
        </div>
        <div id="lookup-entry-container" v-if="term && department.length > 0">
            <department-entry 
                v-for='dept in department'
                :key='dept.name'
                :dept='dept'
                :term='term'
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DepartmentEntry from '@/components/Lookup/DepartmentEntry.vue'

export default {
    name: 'lookup-classes',
    components: {
        departmentEntry: DepartmentEntry
    },
    data() {
        return {
            department: this.$store.state.mockUser.selectedDepartment,
            foundCourses: []
        }
    },
    methods: {
        ...mapMutations([
            'editUserData'
        ]),
        getCourses(dept) {
            var courseCodes = this.courses[this.term.code][dept.code].courses
            var courses = []
            for (var i = 0; i < courseCodes.length; i++) {
                var course = this.courses[this.term.code][dept.code][courseCodes[i]]
                courses.push(course);
            }

            return courses
        },
        sortDepartments() {
            this.department.sort(function(a,b) {
                if (a.code < b.code) {
                    return -1
                } else if (a.code > b.code) {
                    return 1
                } else {
                    return 0
                }
            })
        }
    },
    watch: {
        department: function() {
            this.editUserData({
                key: 'selectedDepartment',
                data: this.department
            })
        }
    },
    computed: {
        ...mapState([
            'courses',
            'mockUser'
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
        }
    }
}
</script>

<style lang='scss'>
    #lookup {

        #lookup-table-header {

            #lookup-form {
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                grid-template-rows: auto;
                grid-column-gap: 30px;

                & > div {
                    margin-top: 0;
                }

                #term-container {
                    grid-column: 1 / 6;
                    grid-row: 1 / -1;
                }

                #department-container {
                    grid-column: 6 / -1;
                    grid-row: 1 / -1;
                }
            }
        }

        #lookup-entry-container {
            margin-top: 30px;
            max-height: 500px;
            border-radius: 3px;
            border: 1px solid $grey;
            background-color: $pale-grey;
            box-sizing: border-box;
            overflow-y: auto;
            overflow-x: hidden;

            .department {
                
                .department-header {
                    padding: 10px;
                    background-color: rgba($grey,0.4);

                    h3 {
                        margin: 0;
                    }

                }

            }
        }

    }
</style>
