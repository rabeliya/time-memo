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
        <!-- <p class="time-display">{{ cards[index].calcedTime }}</p> -->                    
        <p class="time-display">{{ calcedTime(index) }}</p>        
        <div class="button-wrapper">
          <button class="plus button" @click="addMin(index)">+</button>                  
          <button class="minus button" @click="removeMin(index)">-</button>
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
    // editingCard:[],
    editingCard:{
      title:"",
      color:"",
      minute:"",
      count:"",
      cardIndex:"",
    },
    isDialog: false,
    isEditDialog: false,
    hold:
      { title: "", color: "",minute:"",count:0}
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
        count: this.hold.count,    
      };
      this.cards.push(card);
      this.hold.title = "";
      this.hold.color = "";
      this.hold.minute = "";      
    },
    addMin(index) {
      this.cards[index].count ++;
    },
    removeMin(index) {
      if(this.cards[index].count > 0) {        
        this.cards[index].count --;
      }
    },
       calcedTime(index) {
      return this.cards[index].minute * this.cards[index].count;
    },
    showEditDialog() {
      this.isEditDialog = true;
    },
    editCard(index) {
          this.editingCard.title = this.cards[index].title;
          this.editingCard.color = this.cards[index].color;
          this.editingCard.minute = this.cards[index].minute;
          this.editingCard.count = this.cards[index].count;                   
          this.editingCard.cardIndex = index;                   
    },
    reflectEditingCard() {
      const cardIndex = this.editingCard.cardIndex;
            const resultCard = {
        title: this.editingCard.title,
        color: this.editingCard.color,
        minute: this.editingCard.minute,
        count: this.editingCard.count,    
      };
      this.cards.splice(cardIndex,1,resultCard)
    },
    deleteCard(index) {
      if (confirm("delete OK ?")) {
        this.cards.splice(index, 1);
      }
    },
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