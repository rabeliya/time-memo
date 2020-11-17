<template>
  <div id="todoApp">
    <h2>ToDo</h2>
    <ul v-if="todos.length > 0">
      <li v-for="(todo, index) in todos" :key="todo.id" class="todo">
        <input type="checkbox" v-model="todo.isDone" class="todo-check" />
        <span :class="{ done: todo.isDone }">{{ todo.title }}</span>
        <span @click="deleteItem(index)" class="command">[X]</span>
      </li>
    </ul>
    <ul v-else class="no-task-info">
      <li>All Tasks Done !</li>
    </ul>
    <form @submit.prevent="addItem">
      <input type="text" v-model="newItem" placeholder=" type something !" />
    </form>
  </div>
</template>
<script>
export default {
  data: ()=> ({
    newItem: "",
    todos: [
      {
        title: "check functions !",
        isDone: false,
      },
      {
        title: "try something !",
        isDone: false,
      },
      {
        title: "push X button !",
        isDone: false,
      },
    ]
  }),   
  watch: {
    todos: {
      handler: function () {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
      deep: true,
    },
  },
  mounted: function () {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  },
  methods: {
    addItem: function () {
      const item = {
        title: this.newItem,
        isDone: false,
      };
      this.todos.push(item);
      this.newItem = "";
    },

    deleteItem: function (index) {
      if (confirm("delete OK ?")) {
        this.todos.splice(index, 1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>

#todoApp {
  background: $card-color;
  box-shadow: $shadow;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  min-height: 200px;
  padding: 20px;
  margin-bottom: 80px;
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    li.todo {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 10px;
      width: 240px;
      min-height: 40px;
      margin-bottom: 15px;
      background: $second-color;
      box-shadow: $shadow;
      font-size: 1rem;
    }
  }
  .no-task-info {
    margin-bottom: 16px;
  }
  form {
    font-size: 1rem;
    input[type="text"] {
      background: $second-color;
      box-shadow: $shadow;
      width: 240px;
      height: 40px;
      border: none;      
    }
  }
}

li.todo {
  .todo-check {
    margin-right: 15px;
  }
  .command {
    font-size: 12px;
    margin-left: 15px;
  }
}

#todoApp li > span.done {
  text-decoration: line-through;
}
</style>
