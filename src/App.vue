<template>
  <div id="app">
    <todo/>
    <a class="help" href="https://github.com/mingzhezc123/minch-todolist#功能描述(使用說明)" target="_blank">用途介紹</a>
  </div>
</template>

<script>
import Todo from './components/todos'

export default {
  name: 'App',
  components: {
    Todo
  }
}
</script>

<style lang="stylus" scoped>
  .help
    color #333
    text-decoration none
    margin-left 1.5em
</style>

