<template>
    <div class='lecture-entry' :id="'lecture-entry--' + affix">
    </div>
</template>

<script>
export default {
    name: 'lecture-entry',
    props: {
        term: {
            type: Object,
            required: true
        },
        course: {
            type: Object,
            required: true
        },
        section: {
            type: Object,
            required: true
        }
    },
    computed: {
        affix() {
            return this.section.code + '-' 
                    + this.course.code + '-' 
                    + this.term.code
        }
    }
}
</script>

<style>

</style>
