<template>
    <div class='list-section' :id="'list-section--' + section">
        <div class='name' v-if='!dropConfirm'>{{ course.toUpperCase() }} {{ section.toUpperCase() }}</div>
        <div class='drop-confirm' v-if='dropConfirm'>
            <span><fa-icon icon='exclamation-triangle' /> Are you sure?</span>
            <button
                type='button'
                class='drop-no red'
                name='drop-no'
                @click='dropConfirm = !dropConfirm'>No</button>
            <button
                type='button'
                class='drop-yes red'
                name='drop-yes'
                @click='dropThisSection'>Yes</button>
        </div>
        <button
            v-if='!dropConfirm'
            type='button'
            class='drop red'
            name='drop'
            @click='dropThisSection'>Drop</button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name:'list-section',
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
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        lab: {
            type: String,
            required: true,
        },
        lecture: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            dropConfirm: false
        }
    },
    methods: {
        ...mapMutations([
            'dropRegisteredLecture',
            'dropRegisteredLab',
            'dropWaitlistedLecture',
            'dropWaitlistedLab'
        ]),
        dropThisSection() {
            if(!this.dropConfirm) {
                this.dropConfirm = true;
                return
            }

            var dropData = {
                term: this.term,
                dept: this.dept,
                course: this.course,
                section: this.section,
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
    }
}
</script>

<style lang='scss' scoped>
    .list-section {
        display: grid;
        grid-template-columns: repeat(6,1fr);
        grid-column-gap: 10px;
        grid-template-rows: auto;
        margin-bottom: 0.4em;

        &:last-child {
            margin-bottom: 0;
        }

        .name {
            grid-column: 1 / -2;
        }

        .drop-confirm {
            grid-column: 1 / -1;
            display: grid;
            grid: inherit;
            color: $red;
            font-size: 90%;
            background-color: rgba($red,0.15);
            border-radius: 3px;
            border: 1px solid $red;
            padding: 5px;

            span {
                grid-column: 1 / 5;
            }

            .drop-no {
                grid-column: 5 / 6;
            }

            .drop-yes {
                grid-column: 6 / 7;
            }
        }

        button {
            grid-column: -2 / -1;
            height: unset;
            min-width: unset;
        }
    }
</style>
