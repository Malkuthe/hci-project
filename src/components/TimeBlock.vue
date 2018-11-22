<template>
    <div 
        :id="id" 
        class='time-block' 
        :class='[status, day, {drop: dropConfirm}]'
        :style="{
            'grid-column': day + '/ span 1',
            'grid-row-start': start,
            'grid-row-end': end
        }">
        <transition name='fade' mode='out-in'>
            <div class='info' v-if='!dropConfirm' key='info'>
                <div class='top'>
                <span>{{ course.toUpperCase() }}</span><br />
                <span>{{ section.code.toUpperCase() }}</span><br />
                <span>({{ statusText }})</span><br /><br />
                <span>{{ formattedTime(section.start) }} – {{ formattedTime(section.end) }}</span><br /><br />
                </div>
                <div class='bot'>
                    <button
                        type='button'
                        class='drop red'
                        name='drop'
                        @click='dropThisSection'>Drop</button>
                </div>
            </div>
            <div class='info drop-confirm' v-if='dropConfirm' key='drop'>
                <div class='top'>
                    <fa-icon icon='exclamation-triangle' />You are about to drop this course. Are you sure?
                </div>
                <div class='bot'>
                    <button
                        type='button'
                        class='drop-no red'
                        name='drop-no'
                        @click='dropConfirm = false'>No</button>
                    <button
                        type='button'
                        class='drop-yes red'
                        name='drop-yes'
                        @click='dropThisSection'>Yes</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name:'time-block',
    data() {
        return {
            dropConfirm: false
        }
    },
    props: {
        term: {
            type: String,
            required: true
        },
        dept: {
            type: String,
            required: true
        },
        course: {
            type: String,
            required: true
        },
        section: {
            type: Object,
            required: true
        },
        lab: {
            type: String,
            required: true
        },
        lecture: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        day: {
            type: String,
            required: true
        }
    },
    methods: {
        ...mapMutations([
            'dropRegisteredLecture',
            'dropRegisteredLab',
            'dropWaitlistedLecture',
            'dropWaitlistedLab'
        ]),
        formattedTime(time) {
            var hour = time.substr(0,2)
            var hourInt = parseInt(hour,10)
            var min = time.substr(2)
            var tod = 'AM'
            
            if (hourInt > 12 || hourInt == 0) tod = 'PM'

            return hour + ':' + min + ' ' + tod
        },
        dropThisSection() {
            if(!this.dropConfirm) {
                this.dropConfirm = true;
                return;
            }

            var dropData = {
                term: this.term,
                dept: this.dept,
                course: this.course,
                section: this.section.code,
                lab: this.lab,
                lecture: this.lecture
            }

            if (this.status == 'registered') {

                if (this.lab == '' || this.lecture == '') {
                    this.dropRegisteredLecture(dropData)
                } else {
                    this.dropRegisteredLab(dropData)
                }

            } else {

                if (this.lab == '' || this.lecture == '') {
                    this.dropWaitlistedLecture(dropData)
                } else {
                    this.dropWaitlistedLab(dropData)
                }

            }

            this.dropConfirm = false;
        }
    },
    computed: {
        id() {
            return this.course + '-' + this.section.code + '-' + this.day
        },
        start() {
            return 'time-' + this.section.start
        },
        end() {
            return 'time-' + this.section.end
        },
        statusText() {
            return this.status.charAt(0).toUpperCase() + this.status.substr(1);
        }
    }
}
</script>

<style lang='scss' scoped>
    .fade-enter-active, .fade-leave-active {
        transition: 0.33s;
    }

    .fade-leave, .fade-leave-active, .fade-leave-to {
        display: none;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
        display: none;
    }

    .time-block {
        background-color: rgba($light-blue,0.4);
        border: 1px solid $blue;
        padding: 10px;
        font-weight: bold;
        font-size: 80%;

        &.waitlisted {
            background-color: rgba($light-blue,0.1);
            border: 1px solid rgba($blue,0.4);
        }

        &.drop {
            background-color: rgba($red,0.15);
            border: 1px solid $red;
        }

        &.mon {
            border-left: 0;
        }

        &.sun {
            border-right: 0;
        }

        .info {
            display: flex;
            flex-direction: column;
            height: 100%;

            .bot {
                text-align: right;
                justify-self: flex-end;
                margin-top: auto;

                button {
                    height: unset;
                    min-width: unset;
                    padding: 3px 5px;
                    margin-right: 10px;

                    &:last-child{
                        margin-right: 0;
                    }
                }
            }

            &.drop-confirm {
                font-weight: normal;
                font-style: italic;
                color: darken($red,10);
            }
        }

    }

</style>
