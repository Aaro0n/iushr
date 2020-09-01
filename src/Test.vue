<template>
    <div id="example">
        <p>Original message: "{{ message }}"</p>
        <!--reversedMessage() 注意把这个设置成方法-->
        <p>Computed reversed message: "{{ reversedMessage() }}"</p>


        <div id="example-for">
            <ul id="example-2">
                <!--注意空格设置-->
                <li v-for="(item, index) in items" v-bind:key="index">
                    {{item}}
                </li>

                <li v-for="n in 10" v-bind:key="n">{{n}}</li>

                <div v-for="(value, name) in object" v-bind:key="name">
                    {{ name }}: {{ value }}
                </div>
            </ul>

        </div>
    </div>

</template>


<script>
    export default {
        name: "example",
        // props: {message: String},
        data() {
            return {
                message: this.$route.params.id,
                items: {"name": "apple"},
                object: {
                    title: 'How to do lists in Vue',
                    author: 'Jane Doe',
                    publishedAt: '2016-04-10'
                }
            }
        },
        methods: {
            reversedMessage: function () {

                return this.message.split('').reverse().join('')
            }
        }
    }
</script>