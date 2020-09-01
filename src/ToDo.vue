<template>
    <div id="todo-list-example">
        <form v-on:submit.prevent="addNewTodo">
            <label for="new-todo">Add a todo</label>
            <input v-model="newTodoText"
                   id="new-todo"
                   placeholder="E.g. Feed the cat">
            <button>Add</button>
        </form>

        <ul>
            <li is="todo-item"
                v-for="(todo, index) in todos"
                v-bind:key="todo.id"
                v-bind:title="todo.title"
                v-on:remove="todos.splice(index, 1)"></li>
        </ul>


        <input v-model="message" placeholder="edit me">
        <p>Message is: {{ message }}</p>

        <input type="radio" v-model="picked" value="a">
    </div>

</template>


<script>

    export default {
        name: "todo-list-example",
        // props: {message: String},
        data() {
            return {
                message:'',
                newTodoText: '',
                todos: [
                    {
                        id: 1,
                        title: 'Do the dishes',
                    },
                    {
                        id: 2,
                        title: 'Take out the trash',
                    },
                    {
                        id: 3,
                        title: 'Mow the lawn'
                    }
                ],
                nextTodoId: 4
            }
        },
        methods: {
            addNewTodo: function () {
                this.todos.push({
                    id: this.nextTodoId++,
                    title: this.newTodoText
                })
                this.newTodoText = ''
            }
        }
    }
</script>