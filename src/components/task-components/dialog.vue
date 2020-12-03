<template>
  <div class="dialog-wrapper">
    <div class="dialog-bg" @click="toggleDialog"></div>
    <div class="dialog">
      <form class="dialog-form">
        <div class="input-content">
          <label>Task Name</label>              
          <input type="text" class="title-input" v-model="titleComputed" placeholder="type title!" :class="{ error : $v.title.$error,'form-control': true }">              
          <span v-if="$v.title.$error" class="error-message">Type any Task Name !</span>
          <span v-if="!$v.title.maxLength" class="error-message">It's NOT within 16letters !</span>        
          <label>Time Span</label>  
          <select class="time-input" v-model="minuteComputed" :class="{ error : $v.minute.$error,'form-control': true }">
              <option disabled value="">minute</option>                
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="90">90</option>
          </select>
          <span v-if="$v.minute.$error" class="error-message">select any minute !</span>
        </div>
        <div class="button-wrapper">
          <button class="cancel-button pointer" type="button" @click="toggleDialog">cancel</button>
          <button type="button" class="ok-button pointer" @click="submitForm">OK</button>          
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  props: {
    title: String,    
    minute: String,
    totalTime: Number,           
    cardIndex: Number,
  },
  data: ()=> ({
  }),
  
  validations: {
    title: {
      required,
      maxLength: maxLength(16),        
    },      
    minute: {
      required,        
    },
  },
  methods: {    
    toggleDialog: function() {      
      this.$store.commit('toggleDialog');
    },    
    submitForm(){
        this.$v.$touch();
        if(this.cardIndex !== undefined) {
            if(this.$v.$invalid){
                alert('input all forms !');
            }else{                
                this.toggleDialog();
                this.$emit('submitEditCard');
            }          
        } else {
            if(this.$v.$invalid){
                alert('input all forms !');
            }else{
                this.toggleDialog();
                this.$emit('submit');
            }
        }
    }
  },
  computed: {
    titleComputed: {
      get: function() {
        return this.title;        
      },
      set: function(newValue) {
        this.$emit("update:title", newValue);
      }
    },
    minuteComputed: {
      get: function() {
        return this.minute;        
      },
      set: function(newValue) {
        this.$emit("update:minute", newValue);
      }
    },
    totalTimeComputed: {
      get: function() {
        return this.totalTime;
      },
      set: function(newValue) {
        this.$emit("update:totalTime", newValue);
      }
    },
  }    
}
</script>
<style lang="scss" scoped>
.dialog-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  width: 100vw;
  height: 100vh;
  .dialog-bg {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.4;    
  }
  .dialog {      
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 500px;
    height: 300px;
    padding: 40px;
    opacity: 1;      
    background: $second-card-color;
    border-radius: 13px;
    .button-wrapper {
      display: flex;
      justify-content: space-between;
      width: 200px;
      align-self: flex-end;
      position: relative;
      z-index: 20;
      &.show {
        display: block;
      }
      button {
        width: 90px;
        padding: 5px 0;
        font-weight: bold;
        border: none;
        border-radius: 20px;
        box-shadow: $shadow;                 
      }
      .ok-button {
        background: #1473E6;
        color: #fff;        
      }
      .cancel-button {
        border: $button-border-color;
        color: #6e6e6e;
      }
    }
  }
}
.dialog-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;
  width: 400px;  
  .input-content {
    display: flex;
    flex-direction: column;  
    label {
      width: 20%;
      font-size: 14px;
      margin-bottom: 8px;
      padding-bottom: 1px;
      border-bottom: $border-color;
    }
    .title-input {
      width: 100%;
      height: 24px;
      margin-bottom: 14px;
      background: $second-card-color;
      border:$border-color;
    }  
    .time-input {
      width: 50px;
      height: 30px;
      margin-bottom: 14px;
      background: $second-card-color;  
      border:$border-color;
    }
  }
}
</style>