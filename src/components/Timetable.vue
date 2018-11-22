<template>
    <div id="timetable" class='card'>
        <h2>Timetable</h2><router-link to='/lookup'>Go to Lookup</router-link>
        <div class='timetable'>
            <div class='labels-x'>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
            </div>
            <div v-bar class='table-scroller'>
                <div>
                    <div class='table-container'>
                        <div class='labels-y'>
                            <div id='am-7'>7 AM</div>
                            <div id='am-8'>8 AM</div>
                            <div id='am-9'>9 AM</div>
                            <div id='am-10'>10 AM</div>
                            <div id='am-11'>11 AM</div>
                            <div id='pm-12'>12 PM</div>
                            <div id='pm-1'>1 PM</div>
                            <div id='pm-2'>2 PM</div>
                            <div id='pm-3'>3 PM</div>
                            <div id='pm-4'>4 PM</div>
                            <div id='pm-5'>5 PM</div>
                            <div id='pm-6'>6 PM</div>
                            <div id='pm-7'>7 PM</div>
                        </div>
                        <time-block
                        v-for='block in blocks'
                        :key="key(block)"
                        :term='block.term'
                        :dept='block.dept'
                        :course='block.course'
                        :section='block.section'
                        :lab='lab(block.section)'
                        :lecture='lecture(block.section)'
                        :status='block.status'
                        :day='block.day' />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import TimeBlock from '@/components/TimeBlock.vue'

export default {
    name: 'timetable',
    components: {
        timeBlock: TimeBlock
    },
    data() {
        return {
            term: this.$store.state.mockUser.selectedTerm.code,
            dayCodes: {
                m: 'mon',
                t: 'tue',
                w: 'wed',
                r: 'thu',
                f: 'fri',
                s: 'sat',
                n: 'sun'
            }
        }
    },
    methods: {
        lecture(sec) {
            
            if (!sec.lecture && !sec.lab) return ''
            if (sec.lecture) return sec.lecture
            if (sec.lab) return sec.code

        },
        lab(sec) {

            if (!sec.lecture && !sec.lab) return ''
            if (sec.lab) return sec.lab
            if (sec.lecture) return sec.code

        },
        key(bl) {
            return bl.course + '-' + bl.section.code + '-' + bl.day
        }
    },
    computed: {
        ...mapState([
            'mockUser'
        ]),
        blocks() {
            var blocks = []
            var block, dept, course, section, i

            for (const d in this.mockUser.registeredCourses[this.term]) {
                dept = this.mockUser.registeredCourses[this.term][d]
                for (const c in dept) {
                    course = dept[c]

                    for (const s in course) {
                        section = course[s]
                        
                        for (i = 0; i < section.days.length; i++) {
                            block = {
                                term: this.term,
                                dept: d,
                                course: c,
                                section: section,
                                day: this.dayCodes[section.days.charAt(i).toLowerCase()],
                                status: 'registered'
                            }
                            blocks.push(block);
                        }
                    }
                }
            }

            for (const d in this.mockUser.waitlistedCourses[this.term]) {
                dept = this.mockUser.waitlistedCourses[this.term][d]
                for (const c in dept) {
                    course = dept[c]

                    for (const s in course) {
                        section = course[s]
                        
                        for (i = 0; i < section.days.length; i++) {
                            block = {
                                term: this.term,
                                dept: d,
                                course: c,
                                section: section,
                                day: this.dayCodes[section.days.charAt(i).toLowerCase()],
                                status: 'waitlisted'
                            }
                            blocks.push(block);
                        }
                    }
                }
            }

            return blocks
        }
    }
}
</script>

<style lang='scss'>


</style>
