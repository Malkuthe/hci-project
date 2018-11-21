<template>
    <div id='lookup-classes-container'>
        <div id='sidebar' class='card'>
            <h2>Courses</h2>
        </div>
        <transition name='slide-left'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'lookup-page',
}
</script>

<style lang="scss">
    #lookup-classes-container {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: auto;
        grid-column-gap: 30px;
        text-align: left;

        h2:first-child {
            margin-top: 0;
        }

        #sidebar {
            grid-column: 1 / 4;
            grid-row: 1 / -1;
        }

        #lookup, #timetable {
            grid-column: 4 / -1;
            grid-row: 1 / -1;
        }
    }
</style>
