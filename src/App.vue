<template>
  <div class="wrapper">
    <header class="header">
      <h1 class="site-title">time-memo</h1>
    </header>    
    <div class="apps-wrapper">      
      <div class="side-app">      
        <div id="app">
          <MemoApp />
          <TodoApp />
          <TimeGraph :cards="cards" />
        </div>
      </div>
      <div class="main-app">
        <TaskCard 
        @showDialog="reflectDialog" 
        @toggleDialog="reflectDialog" 
        @receiveHold="createCard"
        @resetHold="resetHold"
        @deleteCard="deleteCard"
        @addTime="addTime"
        @removeTime="removeTime"
        @receiveEditedCard="reflectEditCard"
        @submitEditCard="reflectEditCard"
        @takeCards="takeCards"
        @editCard="reflectEditToHold"
        :hold="hold"
        :isDialog="isDialog"
        :cards="cards"
        />               
      </div>
    </div>    
  </div>
</template>

<script>
import "reset-css";
import TaskCard from "./components/task-card.vue";
import MemoApp from "./components/memo.vue";
import TodoApp from "./components/todo.vue";
import TimeGraph from "./components/time-graph.vue";

export default {
  name: "App",
  components: {
    MemoApp,    
    TodoApp,
    TaskCard,
    TimeGraph
  },
  data: () => ({
    cards: [
      {minute:"30",title:"Let's push +30!",totalTime:0},
      {minute:"10",title:"Let's edit!",totalTime:0},
      {minute:"60",title:"Delete All!",totalTime:0},
      ],
    labels: [],
    isEditDialog: false,    
    isDialog: false,    
    hold: 
      { title: "",minute:"",totalTime:0}      
  }),
  methods: {
    resetHold() {
      this.hold = {        
        minute: "",
        title: "",
        totalTime: 0        
      };
      this.$delete(this.hold,'cardIndex')
    },
    setCards(newValue) {
      this.cards = newValue;
    },
    reflectDialog(newValue) {
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
    },
    reflectEditToHold(newValue) {
      this.hold = newValue;
    },    
    reflectEditCard(editedCard) {      
      const cardIndex = editedCard.cardIndex;
      this.cards.splice(cardIndex,1,editedCard)
    },
    deleteCard(index) {
      if (confirm("delete OK ?")) {
        this.cards.splice(index, 1);
      }
    },
    addTime(index) {      
      this.cards[index].totalTime += parseInt(this.cards[index].minute);
    },
    removeTime(index) {
      const card = this.cards[index];      
      if(card.totalTime > 0 && card.totalTime > card.minute) {        
        card.totalTime -= parseInt(card.minute);
      } else {
        card.totalTime = 0;
      }
    },
    takeCards(newValue) {
      this.cards= newValue;
    }       
  },
  computed: {
    screenHeight() {      
      const screenHeight = 	document.documentElement.clientHeight;         
      return (screenHeight - 200) + 'px';
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
  }
  .apps-wrapper {
    display: flex;
    justify-content: space-between;
  }
}

#app {
  color: #2c3e50;
}
.main-app {
  display: flex;  
  width: calc(100vw - 437px);  
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
