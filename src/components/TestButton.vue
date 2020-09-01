<template>
    <button>{{title.name}}</button>
</template>

<script>
    export default {
        // 名字大写也行 TestButton, vue 会自动处理
        name: "test-button",
        props: ['title'],
    }
</script>

<style scoped>

</style>