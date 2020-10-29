<template>
  <div>
    <OptionDialog v-if="this.isDialog" v-bind:value="isDialog" @toggle="reflectDialog" v-bind.sync="hold" @submit="createCard()"/>
    <EditDialog v-if="isEditDialog" :value="isEditDialog" v-bind.sync="editingCard" @closeEditDialog="reflectEditDialog" @submit="reflectEditingCard()"/>
    <ul class="card-list">
      <li v-for="(card,index) in cards" :key="card.id" class="task-card">        
        <span class="delete-card-button" @click="deleteCard(index)">[×]</span>
        <span class="edit-card" @click="editCard(index);showEditDialog()">...</span>
        <p class="card-header">
          <span class="card-color" v-bind:style="{background:cards[index].color }"></span>
          <span>{{ cards[index].minute }}</span>
          {{ cards[index].title }}</p>                                  
        <p class="time-display">{{ cards[index].totalTime }}</p>        
        <div class="button-wrapper">
          <button class="minus button" @click="removeTime(index)">-</button>
          <button class="plus button" @click="addTime(index)">+</button>                  
        </div>
      </li>
      <li>
        <CreateCard @toggle="reflectDialog" v-bind:value="isDialog"/>
      </li>
    </ul>
  </div>
</template>
<script>
import OptionDialog from "./task-components/dialog.vue";
import EditDialog from "./task-components/edit-dialog.vue";
import CreateCard from "./task-components/create-card.vue";

export default {
  name: "App",
  components: {
    OptionDialog,
    CreateCard,
    EditDialog
  },
  data: () => ({
    cards: [],   
    editingCard:{
      title:"",
      color:"",
      minute:"",
      totalTime:"",
      cardIndex:"",
    },
    isDialog: false,
    isEditDialog: false,
    hold:
      { title: "", color: "",minute:0,totalTime:0}
  }),
  methods: {
    reflectDialog(newValue) {
      this.isDialog = newValue;
    },
    reflectEditDialog(newValue) {
      this.isEditDialog = newValue;
    },
    createCard() {
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
    showEditDialog() {
      this.isEditDialog = true;
    },
    editCard(index) {
          this.editingCard.title = this.cards[index].title;
          this.editingCard.color = this.cards[index].color;
          this.editingCard.minute = this.cards[index].minute;
          this.editingCard.totalTime = this.cards[index].totalTime;                   
          this.editingCard.cardIndex = index;                   
    },
    reflectEditingCard() {
      const cardIndex = this.editingCard.cardIndex;
            const resultCard = {
        title: this.editingCard.title,
        color: this.editingCard.color,
        minute: this.editingCard.minute,
        totalTime: this.editingCard.totalTime,    
      };
      this.cards.splice(cardIndex,1,resultCard)
    },
    deleteCard(index) {
      if (confirm("delete OK ?")) {
        this.cards.splice(index, 1);
      }
    },
  },  
  computed: {
    cardsComputed: {
      get: function() {
        return this.cards;
      },
      set: function(newValue) {
        this.cards.$emit("cards", newValue);
      }
    }
  }
}
</script>
<style lang="scss" scoped>

li {
  list-style: none;
}

.card-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-inline-start: 0;  
  padding: 40px;
  .card-header {
    display: flex;        
    .card-color {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin-right: 16px;
    }
  }
  .task-card {
    background: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    width: 190px;
    height: 250px;
    padding: 20px;
    margin-bottom: 40px;    
    .edit-card {
      cursor: pointer;
    }
  }
}
</style>