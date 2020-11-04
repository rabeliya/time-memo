<template>
  <div>
    <OptionDialog v-if="this.isDialog" :isDialog="isDialog" @toggle="reflectCloseDialog" v-bind.sync="hold" @submit="emitHoldData()"/>
    <EditDialog v-if="isEditDialog" :value="isEditDialog" v-bind.sync="editingCard" @closeEditDialog="reflectEditDialog" @submit="emitEditCard()"/>
    <ul class="card-list">
      <li v-for="(card,index) in cards" :key="card.id" class="task-card">        
        <span class="delete-card-button" @click="emitDelete(index)">[×]</span>
        <span class="edit-card" @click="editCard(index);emitShowEditDialog()">...</span>
        <p class="card-header">
          <span class="card-color" v-bind:style="{background:cards[index].color }"></span>
          <span>{{ cards[index].minute }}</span>
          {{ cards[index].title }}</p>                                  
        <p class="time-display">{{ cards[index].totalTime }}</p>        
        <div class="button-wrapper">
          <button class="minus button" @click="emitRemoveTime(index)">-</button>
          <button class="plus button" @click="emitAddTime(index)">+</button>                  
        </div>
      </li>
      <li>
        <CreateCard @showDialog="reflectDialog" :isDialog="isDialog"/>
      </li>
    </ul>
  </div>
</template>
<script>
import OptionDialog from "./task-components/dialog.vue";
import EditDialog from "./task-components/edit-dialog.vue";
import CreateCard from "./task-components/create-card.vue";

export default {
  name: "TaskCard",
  components: {
    OptionDialog,
    CreateCard,
    EditDialog
  },
  props: {
    isEditDialog: Boolean,
    isDialog: Boolean,    
    title: String,
    color: String,
    minute: String,
    cards: Array,
  },
  data: () => ({      
    editingCard:{
      title:"",
      color:"",
      minute:"",
      totalTime:"",
      cardIndex:"",
    },    
    hold:
      { title: "", color: "",minute:"0",totalTime:0}
  }),
  methods: {
    reflectDialog(newValue) {
      this.$emit('toggleDialog', newValue)            
    },
    reflectCloseDialog(newValue) {
      this.$emit('closeDialog', newValue)            
    },
    reflectEditDialog(newValue) {      
      this.$emit('closeEditDialog', newValue)      
    },
    emitAddTime(index) {
      this.$emit('addTime',index);
    },
    emitRemoveTime(index) {
      this.$emit('removeTime',index);
    },
    emitShowEditDialog() {
      this.$emit('showEditDialog', this.isEditDialog)      
    },
    emitHoldData() {
      this.$emit("receiveHold",this.hold);      
    },
    editCard(index) {          
      // 参照渡しにならないための工夫          
          const holdObj = {...this.cards[index],cardIndex:index};                   
          this.editingCard = holdObj;
    },
    emitEditCard() {
      this.$emit('receiveEditedCard',this.editingCard);      
    },
    emitDelete(index) {      
      this.$emit('deleteCard',index)      
    },
  },  
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