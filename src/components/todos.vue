<template>
  <section class="todoapp">
    <header class="header">
      <h1>Minchの備忘録</h1>
      <input class="new-todo" placeholder="下面要做什麽呢?" autofocus="" v-model="newTodo" @keyup.enter="addTodo">
    </header>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main" v-show="showTodos">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
      <label for="toggle-all">壹鍵全完成</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <li  v-for="(todo, index) in filteredTodos" :key="'todo-' + index" :class="{completed: todo.completed, editing: todo === editedTodo}">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)" v-cloak>{{todo.title}}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input class="edit" v-model="todo.title" v-focus="todo === editedTodo" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" @blur="cancelEdit(todo)">
        </li>
      </ul>
    </section>
    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer" v-show="showTodos">
      <!-- This should be `0 items left` by default -->
      <span class="todo-count"><strong v-cloak>{{activeCount}}</strong> 項沒完成</span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <a :class="{selected: visibility === 'all'}" href="#/" @click="visibility='all'">全部項目</a>
        </li>
        <li>
          <a :class="{selected: visibility === 'active'}" href="#/active" @click="visibility='active'">尚沒完成</a>
        </li>
        <li>
          <a :class="{selected: visibility === 'completed'}" href="#/completed" @click="visibility='completed'">已經完成</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed" @click="removeCompleted" v-show="completedCount">清理已經完成項目</button>
    </footer>
  </section>
</template>

<script>
import { filters, todoStorage, visibility } from 'common/common'
export default {
  name: 'Todo',
  data () {
    return {
      newTodo: '',
      todos: todoStorage.fetch(),
      editedTodo: null,
      beforeEditCache: '',
      visibility
    }
  },
  computed: {
    showTodos() {
      return this.todos.length > 0
    },
    activeCount() {
      return filters.active(this.todos).length
    },
    completedCount() {
      return filters.completed(this.todos).length
    },
    allDone: {
      get() {
        return this.activeCount === 0
      },
      set(val) {
        this.todos.map(todo => {
          todo.completed = val
        })
      }
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    }
  },
  methods: {
    addTodo() {
      this.newTodo = this.newTodo.trim()
      if (!this.newTodo) {
        return
      }
      this.todos.unshift({
        title: this.newTodo,
        completed: false
      })
      this.newTodo = ''
    },
    removeTodo(todo) {
      let index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
    },
    editTodo(todo) {
      this.editedTodo = todo
      this.beforeEditCache = todo.title
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },
    cancelEdit(todo) {
      if (this.editedTodo) {
        todo.title = this.beforeEditCache
        this.editedTodo = null
      }
    },
    removeCompleted() {
      this.todos = filters.active(this.todos)
    }
  },
  // 指令集合
  directives: {
    focus: {
      update(el) {
        el.focus()
      }
    }
  },
  watch: {
    todos: {
      deep: true,
      handler: todoStorage.save
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import 'todomvc-app-css/index.css'
  /* [v-cloak] {
    display: none !important;
  } */
</style>
