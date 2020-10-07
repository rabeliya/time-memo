<template>
  <div class="wrapper">
    <PageHeader />
    <div id="app">
      <MemoApp />
    </div>
  </div>
</template>

<script>
import MemoApp from "./components/memo.vue";
import PageHeader from "./components/header.vue";

export default {
  name: "App",
  components: {
    MemoApp,
    PageHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
