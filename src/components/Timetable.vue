<template>
    <div id="timetable" class='card'>
        <h2>Timetable <router-link class='link' to='/registration'>Go to Registration <fa-icon icon='arrow-right' /></router-link></h2>
        <form id='timetable-form'>
            <div id='term-container' class='field'>
                <label for='timetable-term'>Select Term:</label>
                <v-select
                    name='timetable-term'
                    v-model='term'
                    id='timetable-term'
                    :options='courses.terms'
                    :searchable='true'
                    :allow-empty='false'
                    :hide-selected='true'
                    track-by='name'
                    label='name' />
            </div>
        </form>
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
import { mapState, mapMutations } from 'vuex'
import TimeBlock from '@/components/TimeBlock.vue'

export default {
    name: 'timetable',
    components: {
        timeBlock: TimeBlock
    },
    data() {
        return {
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
        ...mapMutations([
            'editUserData'
        ]),
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
        blocks() {
            var blocks = []
            var block, dept, course, section, i

            for (const d in this.mockUser.registeredCourses[this.term.code]) {
                dept = this.mockUser.registeredCourses[this.term.code][d]
                for (const c in dept) {
                    course = dept[c]

                    for (const s in course) {
                        section = course[s]
                        
                        for (i = 0; i < section.days.length; i++) {
                            block = {
                                term: this.term.code,
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

            for (const d in this.mockUser.waitlistedCourses[this.term.code]) {
                dept = this.mockUser.waitlistedCourses[this.term.code][d]
                for (const c in dept) {
                    course = dept[c]

                    for (const s in course) {
                        section = course[s]
                        
                        for (i = 0; i < section.days.length; i++) {
                            block = {
                                term: this.term.code,
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
    .timetable {
        margin-top: 1em;
    }
</style>

<style lang='scss'>
$row-height: 1fr;
$col-width: minmax(auto,1fr);

.timetable {
    display: grid;
    grid-template-columns: [x-start] $col-width [x-end mon] $col-width [tue] $col-width [wed] $col-width [thu] $col-width [fri] $col-width [sat] $col-width [sun] $col-width [week-end];
    grid-template-rows: auto 500px;

    & > div {
        height: 100%;
        width: 100%;
    }

    .labels-x {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid $dark-grey;
        border-bottom: 0;
        background-color: rgba($grey,0.15);
        box-sizing: border-box;
        grid-column: mon / week-end;
        grid-row: 1 / 2;
        display: grid;
        grid-template-columns: [mon] $col-width [tue] $col-width [wed] $col-width [thu] $col-width [fri] $col-width [sat] $col-width [sun] $col-width [week-end];
        grid-template-rows: auto;
        // margin-right: -0.5px;

        > div {
            border-right: 1px solid $grey;

            &:last-child {
                border-right: 0;
            }
        }
    }

    .table-scroller {
        grid-column: x-start / week-end;
        grid-row: 2 / -1;
        display: grid;
        border-top-left-radius: 3px;
        border-bottom-right-radius: 3px;
        border: solid 1px $dark-grey;
        box-sizing: border-box;
        background: $pale-grey;

        grid-template-columns: [x-start] $col-width [x-end mon] $col-width [tue] $col-width [wed] $col-width [thu] $col-width [fri] $col-width [sat] $col-width [sun] $col-width [week-end];
        grid-template-rows: auto;

        & > div {
            max-height: 500px;
            grid-column: 1 / -1;
            grid-row: 1 / -1
        }

        .vb-dragger {
            grid-column: -2 / -1;
            grid-row: 1 / -1;
        }
    }

    .vb > .vb-dragger {
        z-index: 5;
        width: 12px;
        right: 0;
    }
    
    .vb > .vb-dragger > .vb-dragger-styler {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: rotate3d(0,0,0,0);
        transform: rotate3d(0,0,0,0);
        -webkit-transition:
            background-color 100ms ease-out,
            margin 100ms ease-out,
            height 100ms ease-out;
        transition:
            background-color 100ms ease-out,
            margin 100ms ease-out,
            height 100ms ease-out;
        background-color: rgba($brown,0.3);
        margin: 5px 5px 5px 0;
        border-radius: 20px;
        height: calc(100% - 10px);
        display: block;
    }
    
    .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba($brown,.3);
    }
    
    .vb > .vb-dragger:hover > .vb-dragger-styler {
        background-color: rgba($brown,.5);
        height: 100%;
    }
    
    .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
        background-color: rgba($brown,.5);
        height: 100%;
    }
    
    .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba($brown,.5);
    }

    .table-container {
        grid-column: x-start / week-end;
        grid-row: time-0720 / day-end;
        border-top-left-radius: 3px;
        border-bottom-right-radius: 3px;
        display: grid !important;
        grid-template-columns: [x-start] $col-width [x-end mon] $col-width [tue] $col-width [wed] $col-width [thu] $col-width [fri] $col-width [sat] $col-width [sun] $col-width [week-end];
        grid-template-rows:
        [time-0720] $row-height
        [time-0730] $row-height
        [time-0740] $row-height
        [time-0750] $row-height
        [time-0800] $row-height
        [time-0810] $row-height
        [time-0820] $row-height
        [time-0830] $row-height
        [time-0840] $row-height
        [time-0850] $row-height
        [time-0900] $row-height
        [time-0910] $row-height
        [time-0920] $row-height
        [time-0930] $row-height
        [time-0940] $row-height
        [time-0950] $row-height
        [time-1000] $row-height
        [time-1010] $row-height
        [time-1020] $row-height
        [time-1030] $row-height
        [time-1040] $row-height
        [time-1050] $row-height
        [time-1100] $row-height
        [time-1110] $row-height
        [time-1120] $row-height
        [time-1130] $row-height
        [time-1140] $row-height
        [time-1150] $row-height
        [time-1200] $row-height
        [time-1210] $row-height
        [time-1220] $row-height
        [time-1230] $row-height
        [time-1240] $row-height
        [time-1250] $row-height
        [time-1300] $row-height
        [time-1310] $row-height
        [time-1320] $row-height
        [time-1330] $row-height
        [time-1340] $row-height
        [time-1350] $row-height
        [time-1400] $row-height
        [time-1410] $row-height
        [time-1420] $row-height
        [time-1430] $row-height
        [time-1440] $row-height
        [time-1450] $row-height
        [time-1500] $row-height
        [time-1510] $row-height
        [time-1520] $row-height
        [time-1530] $row-height
        [time-1540] $row-height
        [time-1550] $row-height
        [time-1600] $row-height
        [time-1610] $row-height
        [time-1620] $row-height
        [time-1630] $row-height
        [time-1640] $row-height
        [time-1650] $row-height
        [time-1700] $row-height
        [time-1710] $row-height
        [time-1720] $row-height
        [time-1730] $row-height
        [time-1740] $row-height
        [time-1750] $row-height
        [time-1800] $row-height
        [time-1810] $row-height
        [time-1820] $row-height
        [time-1830] $row-height
        [time-1840] $row-height
        [time-1850] $row-height
        [time-1900] $row-height
        [time-1910] $row-height
        [time-1920] $row-height 
        [time-1930] $row-height [day-end];

        .labels-y {
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            border-right: 1px solid $dark-grey;
            background-color: rgba($grey,0.15);
            box-sizing: border-box;
            grid-column: x-start / x-end;
            grid-row: time-0720 / day-end;
            display: grid;
            // height: calc(100% + 1px);
            margin-top: -0.5px;
            grid-template-rows:
            [time-0720] $row-height
            [time-0730] $row-height
            [time-0740] $row-height
            [time-0750] $row-height
            [time-0800] $row-height
            [time-0810] $row-height
            [time-0820] $row-height
            [time-0830] $row-height
            [time-0840] $row-height
            [time-0850] $row-height
            [time-0900] $row-height
            [time-0910] $row-height
            [time-0920] $row-height
            [time-0930] $row-height
            [time-0940] $row-height
            [time-0950] $row-height
            [time-1000] $row-height
            [time-1010] $row-height
            [time-1020] $row-height
            [time-1030] $row-height
            [time-1040] $row-height
            [time-1050] $row-height
            [time-1100] $row-height
            [time-1110] $row-height
            [time-1120] $row-height
            [time-1130] $row-height
            [time-1140] $row-height
            [time-1150] $row-height
            [time-1200] $row-height
            [time-1210] $row-height
            [time-1220] $row-height
            [time-1230] $row-height
            [time-1240] $row-height
            [time-1250] $row-height
            [time-1300] $row-height
            [time-1310] $row-height
            [time-1320] $row-height
            [time-1330] $row-height
            [time-1340] $row-height
            [time-1350] $row-height
            [time-1400] $row-height
            [time-1410] $row-height
            [time-1420] $row-height
            [time-1430] $row-height
            [time-1440] $row-height
            [time-1450] $row-height
            [time-1500] $row-height
            [time-1510] $row-height
            [time-1520] $row-height
            [time-1530] $row-height
            [time-1540] $row-height
            [time-1550] $row-height
            [time-1600] $row-height
            [time-1610] $row-height
            [time-1620] $row-height
            [time-1630] $row-height
            [time-1640] $row-height
            [time-1650] $row-height
            [time-1700] $row-height
            [time-1710] $row-height
            [time-1720] $row-height
            [time-1730] $row-height
            [time-1740] $row-height
            [time-1750] $row-height
            [time-1800] $row-height
            [time-1810] $row-height
            [time-1820] $row-height
            [time-1830] $row-height
            [time-1840] $row-height
            [time-1850] $row-height
            [time-1900] $row-height
            [time-1910] $row-height
            [time-1920] $row-height 
            [time-1930] $row-height [day-end];
            grid-template-columns: auto;
    
            #am-7 {
                grid-row: time-0720 / time-0800;
            }
    
            #am-8 {
                grid-row: time-0800 / time-0900;
            }
    
            #am-9 {
                grid-row: time-0900 / time-1000;
            }
    
            #am-10 {
                grid-row: time-1000 / time-1100;
            }
    
            #am-11 {
                grid-row: time-1100 / time-1200;
            }
    
            #pm-12 {
                grid-row: time-1200 / time-1300;
            }
    
            #pm-1 {
                grid-row: time-1300 / time-1400;
            }
    
            #pm-2 {
                grid-row: time-1400 / time-1500;
            }
    
            #pm-3 {
                grid-row: time-1500 / time-1600;
            }
    
            #pm-4 {
                grid-row: time-1600 / time-1700;
            }
    
            #pm-5 {
                grid-row: time-1700 / time-1800;
            }
    
            #pm-6 {
                grid-row: time-1800 / time-1900;
            }
    
            #pm-7 {
                grid-row: time-1900 / day-end;
            }
    
            & > div {
                min-height: 50px;
                border-bottom: 1px solid $grey;
                &:last-child {
                    border-bottom: 0;
                }
            }
        }
    }

    .labels-x, .labels-y {
        & > div {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
    }
}
</style>