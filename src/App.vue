<template>
  <div class="wrapper">
    <PageHeader />
    <div class="apps-wrapper">
      <div class="main-app">
        <TaskCard @showEditDialog="reflectShowEditDialog" @closeEditDialog="reflectCloseEditDialog"
        @closeDialog="reflectCloseDialog" 
        @toggleDialog="reflectDialog" :isDialog="isDialog" :isEditDialog="isEditDialog"
        v-bind.sync="hold"
        :cards="cards"
        @receiveHold="createCard"
        @deleteCard="deleteCard"
        @receiveEditedCard="reflectEditCard"
        @addTime="addTime"
        @removeTime="removeTime"
        @takeCards="takeCards"/>       
      </div>
      <div class="side-app">
        <div id="app">
          <MemoApp />
          <TodoApp />
          <TimeGraph :cards="cards" />
        </div>
      </div>
    </div>
    <footer class="footer">footer</footer>
  </div>
</template>

<script>
import "normalize.css";
import TaskCard from "./components/task-card.vue";
import MemoApp from "./components/memo.vue";
import PageHeader from "./components/header.vue";
import TodoApp from "./components/todo.vue";
import TimeGraph from "./components/time-graph.vue";

export default {
  name: "App",
  components: {
    MemoApp,
    PageHeader,
    TodoApp,
    TaskCard,
    TimeGraph
  },
  data: () => ({
    cards: [],
    labels: [],
    isEditDialog: false,    
    isDialog: false,    
    hold: 
      { title: "", color: "",minute:"",totalTime:0}      
  }),
  methods: {
    setCards(newValue) {
      this.cards = newValue;
    },
    reflectShowEditDialog(newValue) {
      this.isEditDialog = newValue;
      this.isEditDialog = true;
    },
    reflectCloseEditDialog(newValue) {
      this.isEditDialog = newValue;
      this.isEditDialog = false;
    },
    reflectDialog(newValue) {
      this.isDialog = newValue;
      this.isDialog = !this.isDialog;
    },    
    reflectCloseDialog(newValue) {
      this.isDialog = newValue;
      this.isDialog = !this.isDialog;
    },
    createCard(newValue) {      
      this.hold = newValue;
      const card = {
        title: this.hold.title,
        color: this.hold.color,
        minute: this.hold.minute,
        totalTime: this.hold.totalTime,    
      };
      this.cards.push(card);            
      this.hold.title = "";
      this.hold.color = "";
      this.hold.minute = "";
    },
    deleteCard(index) {
      if (confirm("delete OK ?")) {
        this.cards.splice(index, 1);
      }
    },    
    reflectEditCard(editedCard) {      
      const cardIndex = editedCard.cardIndex;
      this.cards.splice(cardIndex,1,editedCard)
    },
    addTime(index) {      
      this.cards[index].totalTime += parseInt(this.cards[index].minute);
    },
    removeTime(index) {      
      if(this.cards[index].totalTime > 0 && this.cards[index].totalTime > this.cards[index].minute) {        
        this.cards[index].totalTime -= parseInt(this.cards[index].minute);
      } else {
        this.cards[index].totalTime = 0;
      }
    },
    takeCards(newValue) {
      this.cards= newValue;
    }       
  },  
  watch: {
    cards: {
      handler: function () {
        localStorage.setItem("cards", JSON.stringify(this.cards));        
      },
      deep: true,
    },
  },
  mounted: function () {
    this.cards = JSON.parse(localStorage.getItem("cards")) || [];    
  },   
}
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
  padding-left: 40px;
  width: 400px;
  background: #000;
}
</style>
