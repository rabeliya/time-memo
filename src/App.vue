<template>
  <div class="wrapper">
    <PageHeader />
    <div class="apps-wrapper">
      <div class="main-app">
        <TaskCard />
      </div>
      <div class="side-app">
        <div id="app">
          <MemoApp />
          <TodoApp />
        </div>
      </div>
    </div>
    <footer class="footer">footer</footer>
  </div>
</template>

<script>
import "normalize.css";
import TaskCard from "./components/taskCard.vue";
import MemoApp from "./components/memo.vue";
import PageHeader from "./components/header.vue";
import TodoApp from "./components/todo.vue";

export default {
  name: "App",
  components: {
    MemoApp,
    PageHeader,
    TodoApp,
    TaskCard
  },
};
</script>
<style lang="scss">
.wrapper {
  .apps-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .footer {
    background: #000;
    color: #fff;
    font-size: 20px;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.side-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 50px;
  width: 400px;
  background: #000;
}
</style>
