<template>
    <div class='lab-entry section-entry' :id="'lab-entry--' + affix">
        <div class='header'>
            <span class='name'>{{ name }}</span> 
            <span class='crn'>(CRN: {{ section.crn }})</span>
        </div>
        <div class='basic-info'>
            <span class='instructor'><b>Instructor:</b> {{ section.instructor }}</span>
            <span class='credit'><b>Credits:</b> {{ section.credits }}</span>
            <span class='days'>
                <b>Schedule:</b> {{ start }} – {{ end }}
                <section-day day='M' :days='section.days' />
                <section-day day='T' :days='section.days' />
                <section-day day='W' :days='section.days' />
                <section-day day='R' :days='section.days' />
                <section-day day='F' :days='section.days' />
            </span>
        </div>
        <div class='info-table'>
            <div class='header'>
                <div class='campus'>Campus</div>
                <div class='slots'>Slots</div>
                <div class='waitlist'>Waitlist</div>
                <div class='dates'>Dates</div>
                <div class='location'>Location</div>
                <div class='attributes'>Attributes</div>
                <div class='slots-max'>Max</div>
                <div class='slots-actual'>Actual</div>
                <div class='slots-remaining'>Rem.</div>
                <div class='waitlist-max'>Max</div>
                <div class='waitlist-actual'>Actual</div>
                <div class='waitlist-remaining'>Rem.</div>
            </div>
            <div class='table-body'>
                <div class='campus'>{{ section.campus }}</div>
                <div class='slots-max'>{{ section.slots.max }}</div>
                <div class='slots-actual'>{{ section.slots.actual }}</div>
                <div class='slots-remaining'>{{ section.slots.max - section.slots.actual }}</div>
                <div class='waitlist-max'>{{ section.waitlist.max }}</div>
                <div class='waitlist-actual'>{{ section.waitlist.actual }}</div>
                <div class='waitlist-remaining'>{{ section.waitlist.max - section.waitlist.actual }}</div>
                <div class='dates'>
                    <div>{{ section.startDate }} – </div>
                    <div>{{ section.endDate }}</div>
                </div>
                <div class='location'>{{ section.location }}</div>
                <div class='attributes'>{{ section.details }}</div>
            </div>
        </div>
        <div class='registration-buttons buttons-container'>
            <span v-if='dropConfirm' class='error drop-confirm'><fa-icon icon='exclamation-triangle' /> You are about to drop this course. Are you sure?</span>
            <span v-if='!canRegister && !(alreadyRegistered || alreadyWaitlisted) && !dropConfirm && !hasTimeConflict' class='error cannot-register'><fa-icon icon='exclamation-triangle' /> You cannot register for this section! View the course entry above for more details</span>
            <span v-if='(alreadyRegistered || alreadyWaitlisted) && !dropConfirm && !hasTimeConflict' class='error already-registered'><fa-icon icon='exclamation-triangle' />You are already registered/waitlisted for this section!</span>
            <span v-if='hasTimeConflict && !(alreadyRegistered || alreadyWaitlisted) && !dropConfirm' class='error time-conflict'><fa-icon icon='exclamation-triangle' />This section currently has a time conflict with {{ hasTimeConflict }}</span>
            <button
                name='waitlist'
                class='waitlist'
                :type="registerButtonType"
                :class="{'disabled': (alreadyRegistered || alreadyWaitlisted || hasTimeConflict || !canRegister) }"
                @click='waitlistThisLab'
                v-if='!dropConfirm' >Waitlist</button>
            <button
                name='drop-no'
                class='drop-no red'
                type='button'
                @click='dropConfirm = false'
                v-if='dropConfirm' >No</button>
            <button
                name='drop-yes'
                class='drop-yes red'
                type='button'
                @click='dropThisLab'
                v-if='dropConfirm' >Yes</button>
            <button
                name='drop'
                class='drop red'
                type='button'
                @click='dropThisLab'
                v-if='(alreadyRegistered || alreadyWaitlisted ) && !dropConfirm' >Drop</button>
            <button
                name='register'
                class='register'
                :type="registerButtonType"
                :class="{'disabled': (alreadyRegistered || alreadyWaitlisted || hasTimeConflict || !canRegister) }"
                @click='registerThisLab'
                v-if='!dropConfirm' >Register</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Day from '@/components/Lookup/Day.vue'

export default {
    name: 'lab-entry',
    components: {
        sectionDay: Day
    },
    props: {
        term: {
            type: Object,
            required: true
        },
        course: {
            type: Object,
            required: true
        },
        dept: {
            type: Object,
            required: true
        },
        section: {
            type: Object,
            required: true
        },
        lecture: {
            type: Object,
            required: true
        },
        canRegister: {
            type: Boolean,
            required: true
        },
        folded: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            show: !this.folded,
            showLabs: false,
            dropConfirm: false
        }
    },
    methods: {
        ...mapMutations([
            'registerLab',
            'waitlistLab',
            'dropRegisteredLab',
            'dropWaitlistedLab'
        ]),
        registerThisLab() {
            if (this.err) return
            var registerLab = {}
            registerLab[this.section.code] = this.section
            registerLab[this.section.code].lecture = this.lecture.code
            var registerLecture = {}
            registerLecture[this.lecture.code] = this.lecture
            registerLecture[this.lecture.code].lab = this.section.code
            var registerCourse = {}
            registerCourse[this.course.code] = {...registerLecture,...registerLab}
            var registerDept = {}
            registerDept[this.dept.code] = registerCourse
            var registerTerm = {}
            registerTerm[this.term.code] = registerDept
            
            this.registerLab(registerTerm)
        },
        waitlistThisLab() {
            if (this.err) return
            var registerLab = {}
            registerLab[this.section.code] = this.section
            registerLab[this.section.code].lecture = this.lecture.code
            var registerLecture = {}
            registerLecture[this.lecture.code] = this.lecture
            registerLecture[this.lecture.code].lab = this.section.code
            var registerCourse = {}
            registerCourse[this.course.code] = {...registerLecture,...registerLab}
            var registerDept = {}
            registerDept[this.dept.code] = registerCourse
            var registerTerm = {}
            registerTerm[this.term.code] = registerDept
            
            this.waitlistLab(registerTerm)
        },
        dropThisLab() {
            if (!this.dropConfirm) {
                this.dropConfirm = true
                return
            }
            var details = {
                term: this.term.code,
                dept: this.dept.code,
                course: this.course.code,
                lab: this.section.code,
                lecture: this.lecture.code
            }

            if(this.alreadyRegistered) {
                this.dropRegisteredLab(details)
            }

            if(this.alreadyWaitlisted) {
                this.dropWaitlistedLab(details)
            }
            this.dropConfirm = false
        }
    },
    computed: {
        ...mapState([
            'mockUser'
        ]),
        affix() {
            return this.section.code + '-' 
                    + this.course.code + '-' 
                    + this.term.code
        },
        name() {
            return this.course.code.toUpperCase() + ' ' + this.section.code.toUpperCase();
        },
        start() {
            var hour = this.section.start.substr(0,2)
            var hourInt = parseInt(hour,10)
            var time = 'AM'
            var minute = this.section.start.substr(2,2)
            
            if(hourInt > 12) {
                hour = (hourInt - 12).toString(10).padStart(2,'0');
                time = 'PM'
            }
            return hour + ':' + minute + ' ' + time
        },
        err() {
            return this.alreadyRegistered || this.alreadyWaitlisted || this.hasTimeConflict || !this.canRegister
        },
        end() {
            var hour = this.section.end.substr(0,2)
            var hourInt = parseInt(hour,10)
            var time = 'AM'
            var minute = this.section.end.substr(2,2)
            
            if(hourInt > 12) {
                hour = (hourInt - 12).toString(10).padStart(2,'0');
                time = 'PM'
            }
            return hour + ':' + minute + ' ' + time
        },
        alreadyRegistered() {
            if(!this.mockUser.registeredCourses) return false
            if(this.mockUser.registeredCourses.length == 0) return false
            if(Object.keys(this.mockUser.registeredCourses).length === 0) return false
            if(!this.mockUser.registeredCourses[this.term.code]) return false
            if(!this.mockUser.registeredCourses[this.term.code][this.dept.code]) return false
            if(!this.mockUser.registeredCourses[this.term.code][this.dept.code][this.course.code]) return false
            if(this.mockUser.registeredCourses[this.term.code][this.dept.code][this.course.code].hasOwnProperty(this.section.code)) return true
            return false
        },
        alreadyWaitlisted() {
            if(!this.mockUser.waitlistedCourses) return false
            if(this.mockUser.waitlistedCourses.length == 0) return false
            if(Object.keys(this.mockUser.waitlistedCourses).length === 0) return false
            if(!this.mockUser.waitlistedCourses[this.term.code]) return false
            if(!this.mockUser.waitlistedCourses[this.term.code][this.dept.code]) return false
            if(!this.mockUser.waitlistedCourses[this.term.code][this.dept.code][this.course.code]) return false
            if(this.mockUser.waitlistedCourses[this.term.code][this.dept.code][this.course.code].hasOwnProperty(this.section.code)) return true
        },
        hasTimeConflict() {
            if(!this.mockUser.waitlistedCourses && !this.mockUser.registeredCourses) return false
            if(Object.keys(this.mockUser.registeredCourses).length === 0 && Object.keys(this.mockUser.waitlistedCourses).length === 0) return false
            if(!this.mockUser.registeredCourses[this.term.code] && !this.mockUser.waitlistedCourses[this.term.code]) return false
            var registeredConflict = false
            var waitlistedConflict = false
            var thisStart = parseInt(this.section.start,10)
            var thisEnd = parseInt(this.section.end,10)
            var secStart, secEnd
            var timeConflictedCourse = null

            for (const department in this.mockUser.registeredCourses[this.term.code]) {
                if (registeredConflict) break
                const dept = this.mockUser.registeredCourses[this.term.code][department]
                for (const crs in dept) {
                    if (registeredConflict) break
                    
                    const course = dept[crs]
                    for (const section in course) {
                        const sec = course[section]
                        secStart = parseInt(sec.start,10)
                        secEnd = parseInt(sec.end,10)
                        if(registeredConflict) break

                        if(!registeredConflict && thisStart >= secStart && thisStart <= secEnd) {
                            registeredConflict = true
                        }
                        if(!registeredConflict && thisEnd >= secStart && thisEnd <= secEnd) { 
                            registeredConflict = true
                        }
                        if(!registeredConflict && secStart >= thisStart && secStart <= thisEnd) {
                            registeredConflict = true
                        }
                        if(!registeredConflict && secEnd >= thisStart && secEnd <= thisEnd) {
                            registeredConflict = true
                        }

                        if(registeredConflict) {
                            timeConflictedCourse = crs.toUpperCase() + ' ' + sec.code.toUpperCase()
                        }
                    }
                }
            }

            if (!registeredConflict) {
                for (const department in this.mockUser.waitlistedCourses[this.term.code]) {
                    if(waitlistedConflict) break

                    const dept = this.mockUser.waitlistedCourses[this.term.code][department]

                    for (const crs in dept) {
                        if (waitlistedConflict) break

                        const course = dept[crs]
                        for (const section in course) {
                            if(waitlistedConflict) break
                            const sec = course[section]
                            secStart = parseInt(sec.start,10)
                            secEnd = parseInt(sec.end,10)

                            if(!waitlistedConflict && thisStart >= secStart && thisStart <= secEnd) {
                                waitlistedConflict = true
                            }
                            if(!waitlistedConflict && thisEnd >= secStart && thisEnd <= secEnd) { 
                                waitlistedConflict = true
                            }
                            if(!waitlistedConflict && secStart >= thisStart && secStart <= thisEnd) {
                                waitlistedConflict = true
                            }
                            if(!waitlistedConflict && secEnd >= thisStart && secEnd <= thisEnd) {
                                waitlistedConflict = true
                            }

                            if(waitlistedConflict) {
                                timeConflictedCourse = crs.toUpperCase() + ' ' + sec.code.toUpperCase()
                            }
                        }
                    }
                }
            }

            return timeConflictedCourse
        },
        registerButtonType() {
            if (this.alreadyRegistered || !this.canRegister || this.hasTimeConflict) return 'disabled'
            return 'button'
        }
    }
}
</script>

<style lang='scss' scoped>
</style>