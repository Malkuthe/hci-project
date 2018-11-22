<template>
    <div class='day' :class="{ 'active': active }">
        {{ day }}
    </div>
</template>

<script>
export default {
    name: 'section-day',
    props: {
        day: {
            type: String,
            required: true
        },
        days: {
            type: String,
            required: true
        }
    },
    computed: {
        active() {
            if(this.days.indexOf(this.day) != -1) return true
            return false
        }
    }
}
</script>

<style lang='scss'>
    .day {
        color: rgba($grey,0.6);
        font-weight: bold;
        display: inline-block;
        margin-left: 0.4em;

        &.active {
            color: $blue;
        }
    }
</style>
