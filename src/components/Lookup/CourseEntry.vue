<template>
    <div class='course-entry' 
         :id="'course-entry--' + affix"
         :class="{ 'active': show }">
        <span class='course-name' :id="'course-name--' + affix">{{ course.name }}</span>
        <span class='course-code' :id="'course-code--' + affix">({{ code }})</span>
        <div v-if='err' class='error'>
            <div class='prereq-error' v-if='!prereqsMet'>
                <span class='warning'><fa-icon icon='exclamation-triangle' /></span> Prerequisites not met!
            </div>
            <div class='registration-error' v-if='!notAlreadyRegistered'>
                <span class='warning'><fa-icon icon='exclamation-triangle' />
                    You are already registered to this course!</span>
            </div>
            <div class='waitlisted-error' v-if='!notAlreadyWaitlisted'><span class='warning'><fa-icon icon='exclamation-triangle' /> You are already waitlisted for this course!</span></div>
        </div>
        <p> {{ course.description }} </p>
        <h4 v-if='hasPrereqs'>Prerequisites:</h4>
        <div v-if='hasPrereqs' class='prerequisites-container'>
            <prereqs-held
                v-for='heldPrereq in heldPrereqs'
                :prereq='heldPrereq'
                :key='heldPrereq' />
            <prereqs-graded
                v-for='gradedPrereq in gradedPrereqs'
                :prereq='gradedPrereq'
                :key='gradedPrereq.code' />
        </div>
        <h4 v-if='hasNotHeldPrereqs'>Not to be held with:</h4>
        <div v-if='hasNotHeldPrereqs' class='prerequisites-container'>
            <prereqs-not-held
                v-for='notHeldPrereq in notHeldPrereqs'
                :prereq='notHeldPrereq'
                :key='notHeldPrereq' />
        </div>
        <div class='sections-container'>
            <div class='sections-header' @click='show = !show'>
                Sections
                <div class='chevron'>
                    <span class='text'>[click here to toggle]</span> <fa-icon
                        :icon="show ? 'chevron-circle-down' : 'chevron-circle-left'" />
                </div>
            </div>
            <div v-if='show'>
                <lecture-entry 
                    v-for='section in lectures'
                    :key='section.code'
                    :term='term'
                    :dept='dept'
                    :course='course'
                    :section='section'
                    :can-register='!err' />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import PrereqsHeld from '@/components/Lookup/Prerequisites/Held.vue'
import PrereqsGraded from '@/components/Lookup/Prerequisites/Graded.vue'
import PrereqsNotHeld from '@/components/Lookup/Prerequisites/NotHeld.vue'
import LectureEntry from '@/components/Lookup/LectureEntry.vue'

export default {
    name: 'course-entry',
    components: {
        prereqsHeld: PrereqsHeld,
        prereqsGraded: PrereqsGraded,
        prereqsNotHeld: PrereqsNotHeld,
        lectureEntry: LectureEntry
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
        folded: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            show: !this.folded
        }
    },
    computed: {
        ...mapState([
            'mockUser'
        ]),
        code: function() {
            var split = this.course.code.match(/[a-zA-z]+|[0-9]+/gi)
            split[0] = split[0].toUpperCase();
            split[1] = split[1].toUpperCase();
            
            return split[0] + " " + split[1];
        },
        affix() {
            return this.course.code + '-' + this.term.code
        },
        lectures() {
            if (!this.course.sections) return null
            var sections = []

            for (var i = 0; i < this.course.sections.length; i++) {
                sections.push(this.course[this.course.sections[i]]);
            }

            return sections
        },
        err() {
            return !(this.prereqsMet && this.noTimeConflicts && this.notAlreadyRegistered && this.notAlreadyWaitlisted)
        },
        hasPrereqs() {
            if (this.course.prerequisites) return true
            return false
        },
        hasHeldPrereqs() {
            if (!this.hasPrereqs) return false
            if (this.course.prerequisites.held) return true
            return false
        },
        heldPrereqs() {
            if (!this.hasPrereqs) return null
            if (!this.hasHeldPrereqs) return null
            return this.course.prerequisites.held
        },
        hasGradedPrereqs() {
            if (!this.hasPrereqs) return false
            if (this.course.prerequisites.graded) return true
            return false
        },
        gradedPrereqs() {
            if (!this.hasPrereqs) return null
            if (!this.hasGradedPrereqs) return null
            return this.course.prerequisites.graded
        },
        hasNotHeldPrereqs() {
            if (!this.hasPrereqs) return false
            if (this.course.prerequisites.notheld) return true
            return false
        },
        notHeldPrereqs() {
            if (!this.hasPrereqs) return null
            if (!this.hasNotHeldPrereqs) return null
            return this.course.prerequisites.notheld
        },
        prereqsMet() {
            if (!this.course.prerequisites) return true
            if (Object.keys(this.course.prerequisites).length === 0) return true
            var i
            var meetsHeld = true;
            var meetsNotHeld = true;
            var meetsGraded = true;

            var coursesHeld = this.mockUser.coursesHeld;
            if (this.course.prerequisites.held) {
                var heldPrereqs = this.course.prerequisites.held
                for (i = 0; i < heldPrereqs.length; i++) {
                    var heldPrereq = heldPrereqs[i]
                    if (!coursesHeld.hasOwnProperty(heldPrereq)) { meetsHeld = false;
                        break;
                    } 
                }
            }

            if(this.course.prerequisites.notheld) {
                var notHeldPrereqs = this.course.prerequisites.notheld
                for (i = 0; i < notHeldPrereqs.length; i++) {
                    var notHeldPrereq = notHeldPrereqs[i]
                    if (coursesHeld.hasOwnProperty(notHeldPrereq)) {
                        meetsNotHeld = false;
                        break;
                    }
                }
            }

            if (this.course.prerequisites.graded) {
                var gradedPrereqs = this.course.prerequisites.graded
                for (i = 0; i < gradedPrereqs.length; i++) {
                    var gradedPrereq = gradedPrereqs[i]
                    var code = gradedPrereq.code
                    var grade = gradedPrereq.grade
                    if (coursesHeld.hasOwnProperty(code)) {
                        if(coursesHeld[code].grade.toLowerCase() > grade) {
                            meetsGraded = false;
                            break;
                        }
                    } else {
                        meetsGraded = false;
                        break;
                    }
                }
            }

            return meetsHeld && meetsNotHeld && meetsGraded
        },
        noTimeConflicts() {
            return true
        },
        notAlreadyRegistered() {
            if(!this.mockUser.registeredCourses) return true
            if(Object.keys(this.mockUser.registeredCourses).length === 0) return true
            if(!this.mockUser.registeredCourses[this.term.code]) return true
            if(!this.mockUser.registeredCourses[this.term.code][this.dept.code]) return true
            if(this.mockUser.registeredCourses[this.term.code][this.dept.code].hasOwnProperty(this.course.code)) return false
            return true
        },
        notAlreadyWaitlisted() {
            if(!this.mockUser.waitlistedCourses) return true
            if(Object.keys(this.mockUser.waitlistedCourses).length === 0) return true
            if(!this.mockUser.waitlistedCourses[this.term.code]) return true
            if(!this.mockUser.waitlistedCourses[this.term.code][this.dept.code]) return true
            if(this.mockUser.waitlistedCourses[this.term.code][this.dept.code].hasOwnProperty(this.course.code)) return false
            return true
        }
    }
}
</script>

<style lang='scss'>
    .course-entry {
        border-top: 1px solid $grey;
        padding: 20px 10px;

        .error {
            background-color: rgba($red,0.15);
            font-size: 90%;
            font-style: italic;
            padding: 10px;
            margin-top: 0.4em;
            color: $red;
            border-radius: 3px;
            border: 1px solid $red;
        }

        & > h4 {
            margin-top: 0.8em;
            margin-bottom: 0.4em;

            &:first-child {
                margin-top: 0.2em;
            }
        }

        .clickable {
            &:hover {
                background-color: rgba($grey,0.10);
            }

            &:active {
                background-color: rgba($grey,0.2);
            }
        }

        .course-name {
            font-weight: bold;
        }

        .course-code {
            margin-left: 0.6em;
            font-size: 80%;
        }

        &:last-child {
            border-bottom: 0;
        }

        .prerequisites-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: auto;
            grid-column-gap: 30px;
            margin-bottom: 0.4em;
        }

        .sections-container {
            border-top: 1px solid $grey;
            margin: 0.4em -10px -20px -10px;

            .sections-header {
                background: rgba($grey,0.5);
                font-size: 90%;
                cursor: pointer;
                font-weight: bold;
                padding-top: 10px;
                padding-bottom: 0.6em;
                padding-left: 10px;
                border-bottom: 1px solid $grey;
                box-sizing: border-box;
                border-left: 10px solid rgba($brown,0.4);
                border-bottom: 1px solid $grey;
                padding: 10px;

                & > .chevron {
                    float: right;

                    .text {
                        font-weight: normal;
                        font-size: 80%;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .buttons-container {
        text-align: right;
        margin-top: 10px;

        button {
            margin-right: 15px;
            min-width: unset;
            height: 25px;

            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>
