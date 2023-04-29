<script setup>
</script>

<template>
  <main>
    <section class="sec-title">
      <input type="text" v-if="nameList.editable" v-model="nameList.text"
        v-on:keyup.enter="nameList.editable = !nameList.editable">
      <h1 v-else v-text="nameList.text"></h1>
      <div @click="nameList.editable = !nameList.editable">
        <button class="edit"><font-awesome-icon icon="fa-solid fa-pen" /></button>
      </div>
    </section>

    <section class="sec-list">
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <input type="text" v-if="todo.editable" v-model="todo.text" v-on:keyup.enter="updateEditable(todo)">

          <div v-else class="itens">
            <input type="checkbox" id="check" v-model="todo.checked" @change="updateTodo(todo)">
            <s v-if="todo.checked" v-text="todo.text"></s>
            <p v-else v-text="todo.text"></p>
          </div>

          <div class="itens">
            <div @click="updateEditable(todo)">
              <button class="edit"><font-awesome-icon icon="fa-solid fa-pen" /></button>
            </div>
            <div @click="deleteTodo(todo)">
              <button class="delete"><font-awesome-icon icon="fa-solid fa-trash" /></button>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <!-- <footer> -->
    <button class="add" @click="addTodo">&#43;</button>
    <!-- </footer> -->
  </main>
</template>

<script>

export default {
  name: 'TodoApp',
  data() {
    return {
      todos: [],
      nameList: {},
      id: null
    };
  },
  created() {
    this.getAllTodos()
    this.nameList = JSON.parse(localStorage.getItem('nameList')) || { text: 'ToDo List', editable: false }
    this.id = JSON.parse(localStorage.getItem('id')) || 1
  },
  methods: {
    getAllTodos() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || []
    },
    addTodo() {
      const input = prompt('Enter a new task');
      if (input == null || input.trim() == '') return
      this.todos.push({ id: this.id++, text: input, editable: 0, checked: 0 })
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter(task => task.id !== todo.id)
    },
    updateTodo(todo) {
      return
    },
    updateEditable(todo) {
      if (todo.text.trim() !== '') todo.editable = !todo.editable
      if (!todo.editable) this.updateTodo(todo)
    },
  },
  watch: {
    nameList: {
      handler() {
        localStorage.setItem('nameList', JSON.stringify(this.nameList))
      },
      deep: true
    },
    todos: {
      handler() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
      },
      deep: true
    },
    id: {
      handler() {
        localStorage.setItem('id', JSON.stringify(this.id))
      },
      deep: true
    },
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.sec-title {
  display: flex;
  color: #eee;
  gap: 1rem;
  padding: .5rem;
  align-items: center;
  justify-content: center;
}

.sec-title>input[type='text'] {
  background-color: #131a18;
  font-size: 32px;
}

.sec-title .edit {
  border: none;
  border-radius: 10px;
  background-color: #006FB2;
  color: white;
  place-items: center;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
}

.sec-title .edit:hover {
  cursor: pointer;
  background-color: #135985;
}

input[type='text'] {
  background-color: #292B33;
  border: none;
  color: white;
  margin: 1rem;
  font-size: 16px;
}

input[type='text']:hover,
input[type='text']:focus {
  outline: none;
}

h1 {
  font-size: 40px;
  margin: 0.5rem;
}

s {
  margin: 1rem 0;
}

.sec-list {
  padding-bottom: 2.5rem;
  width: 100%;
}

.sec-list .edit {
  border: none;
  border-radius: 5px;
  background-color: #006FB2;
  color: white;
  place-items: center;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
}

.sec-list .edit:hover {
  cursor: pointer;
  background-color: #3e414b;
}

.sec-list .delete {
  border: none;
  border-radius: 5px;
  color: white;
  place-items: center;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  background-color: #7e1212;
}

.sec-list .delete:hover {
  cursor: pointer;
  background-color: #3e414b;
}

.itens {
  display: inline-flex;
  gap: 1rem;
  padding: .5rem;
  align-items: center;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 1rem;
  background-color: #292B33;
  border-radius: 3px;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
}

li>p {
  margin: 0;
}

footer {
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  place-items: center;
}

.add {
  border: none;
  background-color: #006FB2;
  color: white;
  width: 64px;
  height: 64px;
  font-size: 3rem;
  border-radius: 50%;
}

.add:hover {
  background-color: #135985;
}
</style>
