<template>
    <div class='lecture-entry section-entry' 
        :id="'lecture-entry--' + affix"
        :class="{ 'no-bottom-padding': hasLabs }">
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
        <div class='registration-buttons buttons-container' v-if='!hasLabs'>
            <span v-if='dropConfirm' class='error drop-confirm'><fa-icon icon='exclamation-triangle' /> You are about to drop this course. Are you sure?</span>
            <span v-if='!canRegister && !(alreadyRegistered || alreadyWaitlisted) && !dropConfirm && !hasTimeConflict' class='error cannot-register'><fa-icon icon='exclamation-triangle' /> You cannot register for this section! View the course entry above for more details</span>
            <span v-if='(alreadyRegistered || alreadyWaitlisted) && !dropConfirm && !hasTimeConflict' class='error already-registered'><fa-icon icon='exclamation-triangle' />You are already registered/waitlisted for this section!</span>
            <span v-if='hasTimeConflict && !(alreadyRegistered || alreadyWaitlisted) && !dropConfirm' class='error time-conflict'><fa-icon icon='exclamation-triangle' />This section currently has a time conflict with {{ hasTimeConflict }}</span>
            <button
                name='waitlist'
                class='waitlist'
                :type="registerButtonType"
                :class="{'disabled': (alreadyRegistered || alreadyWaitlisted || hasTimeConflict || !canRegister) }"
                @click='waitlistThisLecture'
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
                @click='dropThisLecture'
                v-if='dropConfirm' >Yes</button>
            <button
                name='drop'
                class='drop red'
                type='button'
                @click='dropThisLecture'
                v-if='(alreadyRegistered || alreadyWaitlisted ) && !dropConfirm' >Drop</button>
            <button
                name='register'
                class='register'
                :type="registerButtonType"
                :class="{'disabled': (alreadyRegistered || alreadyWaitlisted || hasTimeConflict || !canRegister) }"
                @click='registerThisLecture'
                v-if='!dropConfirm' >Register</button>
        </div>
        <div class='labs-tooltip' v-if='hasLabs'>
            <p><fa-icon icon='exclamation-triangle' /> Register to this class by registering to one of the laboratory sections below.</p>
        </div>
        <div class='labs' v-if='hasLabs'>
            <div class='header' @click='showLabs = !showLabs'>
                <div class='title'>
                    Laboratories
                </div>
                <div class='chevron'>
                    <span class='text'>[click here to toggle]</span> 
                    <fa-icon :icon=" showLabs ? 'chevron-circle-down' : 'chevron-circle-left'" />
                </div>
            </div>
            <div v-if='showLabs'>
                <lab-section
                    v-for='lab in labs'
                    :key='lab.code'
                    :term='term'
                    :course='course'
                    :dept='dept'
                    :section='lab'
                    :lecture='section'
                    :can-register='!err' />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Day from '@/components/Lookup/Day.vue'
import LabSection from '@/components/Lookup/LabEntry.vue'

export default {
    name: 'lecture-entry',
    components: {
        sectionDay: Day,
        labSection: LabSection
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
            'registerLecture',
            'waitlistLecture',
            'dropRegisteredLecture',
            'dropWaitlistedLecture'
        ]),
        registerThisLecture() {
            if (this.err) return
            var registerLecture = {}
            registerLecture[this.section.code] = this.section
            var registerCourse = {}
            registerCourse[this.course.code] = registerLecture
            var registerDept = {}
            registerDept[this.dept.code] = registerCourse
            var registerTerm = {}
            registerTerm[this.term.code] = registerDept
            
            this.registerLecture(registerTerm)
        },
        waitlistThisLecture() {
            if (this.err) return
            var registerLecture = {}
            registerLecture[this.section.code] = this.section
            var registerCourse = {}
            registerCourse[this.course.code] = registerLecture
            var registerDept = {}
            registerDept[this.dept.code] = registerCourse
            var registerTerm = {}
            registerTerm[this.term.code] = registerDept
            
            this.waitlistLecture(registerTerm)
        },
        dropThisLecture() {
            if (!this.dropConfirm) {
                this.dropConfirm = true
                return
            }
            var details = {
                term: this.term.code,
                dept: this.dept.code,
                course: this.course.code,
                section: this.section.code
            }

            if(this.alreadyRegistered) {
                this.dropRegisteredLecture(details)
            }

            if(this.alreadyWaitlisted) {
                this.dropWaitlistedLecture(details)
            }
            this.dropConfirm = false
        }
    },
    computed: {
        ...mapState([
            'mockUser',
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
        hasLabs() {
            if (!this.section.labs) return false
            if (this.section.labs.length <= 0) return false
            return true
        },
        labs() {
            if(!this.hasLabs) return null
            var labs = []

            for(var i = 0; i < this.section.labs.length; i++) {
                labs.push(this.course[this.section.labs[i]]);
            }

            return labs;
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
            return false
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

<style lang='scss'>
    .section-entry {
        box-sizing: border-box;
        border-left: 10px solid rgba($brown,0.4);
        border-bottom: 1px solid $grey;
        padding: 10px;
        min-height: 80px;

        .error {
            margin-right: 8px;
        }

        &.no-bottom-padding {
            padding-bottom: 0;
        }

        & > .header {
            margin-bottom: 0.5em;

            .name {
                font-size: 100%;
                font-weight: bold;
            }

            .crn {
                font-size: 80%;
                margin-left: 0.5em;
            }
        }

        .basic-info {
            font-size: 90%;
            display: grid;
            grid-template-columns: 2fr 1fr 3fr;
            grid-template-rows: auto;
        }

        .labs {
            margin-left: -10px;
            margin-right: -10px;

            & > .header {
                border-top: 1px solid $grey;
                background-color: rgba($grey,0.3);
                cursor: pointer;
                margin-top: 0.6em;
                margin-bottom: 0px;
                padding: 10px;
                font-size: 90%;
                font-weight: bold;
                border-bottom: 1px solid $grey;
                display: grid;
                grid-template-columns: auto;
                grid-template-rows: auto;
                box-sizing: border-box;
                border-left: 10px solid rgba($brown,0.4);
                border-bottom: 1px solid $grey;
                padding: 10px;

                > .title {
                    grid-column: 1 / -2;
                    align-self: center;
                    justify-self: start;
                }

                > .chevron, >.title {
                    grid-row: 1 / -1;
                }

                > .chevron {
                    grid-column: -2 / -1;
                    align-self: center;
                    justify-self: end;

                    .text {
                        font-weight: normal;
                        font-size: 80%;
                        margin-right: 10px;
                    }
                }
            }
        }

        .info-table {

            .table-body {

                & > div {

                }

                .dates {
                    font-size: 80%;
                }

                .location {
                    grid-column: 9 / 11;
                }

                .attributes {
                    grid-column: 11 / 13;
                }
            }

            .header {

                .campus {
                    grid-column: 1 / 2;
                    grid-row: 1 / 3;
                }

                .slots {
                    grid-column: 2 / 5;
                    grid-row: 1 / 2;
                    border-bottom: 1px solid $grey;
                }

                .waitlist {
                    grid-column: 5 / 8;
                    grid-row: 1 / 2;
                    border-bottom: 1px solid $grey;
                }

                .dates {
                    grid-column: 8 / 9;
                    grid-row: 1 / 3;
                }

                .location {
                    grid-column: 9 / 11;
                    grid-row: 1 / 3;
                }

                .attributes {
                    grid-column: 11 / 13;
                    grid-row: 1 / 3;
                    border-right: none;
                }
            }
        }
    }
</style>
