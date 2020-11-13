<template>
  <div class="wrapper">
    <header class="header">
      <h1>time-memo</h1>
    </header>
    <!-- <PageHeader class="header"/> -->
    <div class="apps-wrapper">      
      <div class="side-app">
      <!-- <div class="side-app"  v-bind:style="{height:screenHeight}"> -->
        <div id="app">
          <MemoApp />
          <TodoApp />
          <TimeGraph :cards="cards" />
        </div>
      </div>
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
    </div>    
  </div>
</template>

<script>
import "reset-css";
import TaskCard from "./components/task-card.vue";
import MemoApp from "./components/memo.vue";
// import PageHeader from "./components/header.vue";
import TodoApp from "./components/todo.vue";
import TimeGraph from "./components/time-graph.vue";

export default {
  name: "App",
  components: {
    MemoApp,
    // PageHeader,
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
      { title: "",minute:"",totalTime:0}      
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
        minute: this.hold.minute,
        totalTime: this.hold.totalTime,    
      };
      this.cards.push(card);            
      this.hold.title = "";      
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
  computed: {
    screenHeight() {      
      const screenHeight = 	document.documentElement.clientHeight;         
      return (screenHeight - 200) + 'px';
    }
  }
     
}
</script>
<style lang="scss">

$header_h: 60px; 

.wrapper {   
  .header {
    background: #000;
    height: $header_h;
    width: 100vw;
    position: fixed;
    z-index: 10;
    h1 {
      font-size: 1rem;
      color: #fff;
      margin: 0;
      padding: 20px;
    }
  }
  .apps-wrapper {
    display: flex;
    justify-content: space-between;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main-app {
  display: flex;
  justify-content: center;
  width: calc(100vw - 515px);  
  position: absolute;
  top: $header_h;
  right: 0;
  padding: 70px 0 70px 70px;
}
.side-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: $header_h;
  height: calc(100% - 60px);
  overflow: auto;
  padding: 0 50px;
  background: #fff;
}
</style>
