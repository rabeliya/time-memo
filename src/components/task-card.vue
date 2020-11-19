<template>
  <div>
    <transition appear>
      <CardDialog v-if="this.isDialog" :isDialog="isDialog" @closeDialog="reflectDialog" v-bind.sync="hold" @submit="emitHoldData" @submitEditCard="submitEditCard"/>    
    </transition>
    <ul class="card-list">
      <li v-for="(card,index) in cards" :key="card.id" class="task-card">
        <div class="card-header">
          <span class="delete-card" @click="emitDelete(index)"><img src="../assets/close.svg" width="16" class="pointer"></span>
          <span class="edit-card pointer" @click="editCard(index);showDialog()"><img src="../assets/dots.svg" width="16"></span>          
        </div>        
        <div class="card-contents">
          <div class="card-title-wrapper">
            <span class="card-color" v-bind:style="{background:cardColor(index)}">
            </span>
            <p class="card-title">     
              {{ card.title }}
            </p>
          </div>
          <div class="total-min-wrapper">
              <p class="total-min">{{ card.totalTime }} <span class="mini-letter">min</span></p>        
          </div>                                  
          <div class="button-wrapper">
            <button class="minus button pointer" @click="emitRemoveTime(index)"><span v-bind:style="   {color:cardColor(index)}" class="codes">-</span>{{ card.minute }}</button>
            <button class="plus button pointer" @click="emitAddTime(index)"><span v-bind:style="   {color:cardColor(index)}" class="codes">+</span>{{ card.minute }}</button>                  
          </div>
        </div>
      </li>
      <li>
        <CreateCard @showDialog="reflectDialog" :isDialog="isDialog" @resetHold="resetHold"/>
      </li>
    </ul>
  </div>
</template>
<script>
import CardDialog from "./task-components/dialog.vue";
import CreateCard from "./task-components/create-card.vue";

export default {
  name: "TaskCard",
  components: {
    CardDialog,
    CreateCard,
  },
  props: {
    isDialog: Boolean,    
    title: String,    
    minute: String,
    cards: Array,
    hold: Object,
  },
  methods: {
    resetHold() {
      this.$emit('resetHold');
    },
    reflectDialog(newValue) {
      this.$emit('toggleDialog', newValue)            
    },
    showDialog() {      
      this.$emit('showDialog',this.isDialog )      
    },
    emitAddTime(index) {
      this.$emit('addTime',index);
    },
    emitRemoveTime(index) {
      this.$emit('removeTime',index);
    },
    emitHoldData() {
      this.$emit("receiveHold",this.hold);      
    },
    submitEditCard() {
      this.$emit('submitEditCard',this.hold)
    },
    editCard(index) {                     
      const holdObj = {...this.cards[index],cardIndex:index};
      this.$emit('editCard',holdObj);                         
    },
    emitDelete(index) {      
      this.$emit('deleteCard',index)      
    },
  },
  computed: {
    cardColor() {
      return function(index) {        
        if( index % 12 === 0 ) return '#D35335'
        if( index % 12 === 1 ) return '#DB9E42'
        if( index % 12 === 2 ) return '#E4D447'
        if( index % 12 === 3 ) return '#9FB852'
        if( index % 12 === 4 ) return '#269B59'
        if( index % 12 === 5 ) return '#199C9B'
        if( index % 12 === 6 ) return '#00A0CD'
        if( index % 12 === 7 ) return '#287BAB'
        if( index % 12 === 8 ) return '#4B4584'
        if( index % 12 === 9 ) return '#9C4F89'
        if( index % 12 === 10 ) return '#D2568D'
        if( index % 12 === 11 ) return '#D2556A'        
      }
    }
  }
}  
</script>
<style lang="scss" scoped>

.card-list {
  display: flex;  
  --gap: 20px;
  flex-wrap: wrap;  
  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
  width: calc(100% + var(--gap));
    & > * {
     margin: var(--gap) 0 0 var(--gap);
  }  
  .task-card {
    background: $card-color;
    box-shadow: $shadow;
    width: 190px;
    height: 250px;
    padding: 16px; 
    margin-bottom: 40px;
    .card-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 16px;      
    }        
  }
  .card-contents {
    display: flex;    
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    .card-title-wrapper {
      display: flex;
      width: 100%;
      margin: 0 0 24px;    
      .card-color {
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        box-shadow: $shadow;        
      }
      .card-title {
        margin: 0 auto;
      }
    }
    .total-min-wrapper {
      display: flex;  
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 50px;
      box-shadow: $shadow;
      border-radius: 20px;
      margin-bottom: 27px;
      .total-min {
        font-size: 24px;
        .mini-letter {
          font-size: 14px;
        }
      }
    }
    .button-wrapper {
      display: flex;
      justify-content: space-between;
      width: 145px;      
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 35px;
        background: $card-color;
        box-shadow: $shadow;        
        border-radius: 30px;
        .codes {
          font-size: 24px;
          margin-right: 5px;          
        }
      }
    }
  }
}
.v-enter-active, .v-leave-active {
  transition: opacity .5s;
}

.v-enter, .v-leave-to {
  opacity: 0;
}
</style>