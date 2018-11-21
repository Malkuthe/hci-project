<template>
    <div class='course-entry' 
         :id="'course-entry--' + affix">
        <span class='course-name' :id="'course-name--' + affix">{{ course.name }}</span>
        <span class='course-code' :id="'course-code--' + affix">({{ code }})</span>
        <div v-if='err' class='error'>
            <div class='prereq-error' v-if='!prereqsMet'>
                <span class='warning'><fa-icon icon='exclamation-triangle' /></span> Prerequisites not met!
            </div>
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
                :key='gradedPrereq' />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import PrereqsHeld from '@/components/Lookup/Prerequisites/Held.vue'
import PrereqsGraded from '@/components/Lookup/Prerequisites/Graded.vue'

export default {
    name: 'course-entry',
    components: {
        prereqsHeld: PrereqsHeld,
        prereqsGraded: PrereqsGraded
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
        folded: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        console.log(this.gradedPrereqs);
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
        err() {
            return !(this.prereqsMet && this.noTimeConflicts && this.notAlreadyRegistered)
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
                var notHeldPrereqs = this.course.prerequisites.notHeld
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
                    console.log(code);
                    if (coursesHeld.hasOwnProperty(code)) {
                        console.log(coursesHeld.hasOwnProperty(code))
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
            return true
        }
    }
}
</script>

<style lang='scss'>
    .course-entry {
        min-height: 80px;
        border-bottom: 1px solid $grey;
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

        h4 {
            margin-top: 0.2em;
            margin-bottom: 0.4em;
        }

        &:hover {
            background-color: rgba($grey,0.10);
        }

        &:active {
            background-color: rgba($grey,0.2);
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
        }
    }
</style>
