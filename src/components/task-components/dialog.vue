<template>
  <div class="dialog-wrapper">
    <div class="dialog-bg" @click="toggleDialog"></div>
    <div class="dialog">
      <form class="dialog-form">
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
        <div class="button-wrapper">
          <button class="cancel-button" type="button" @click="toggleDialog">cancel</button>
          <button type="button" class="ok-button" @click="submitForm">OK</button>          
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  props: {
    isDialog: Boolean,    
    title: String,    
    minute: String,
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
      this.$emit('toggle',this.isDialog );
    },    
    submitForm(){
        this.$v.$touch();
        if(this.$v.$invalid){
            alert('input all forms !');
        }else{
            this.$emit('toggle',this.isDialog );
            this.$emit('submit');
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
  }    
}
</script>
<style lang="scss" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.error {
	color: #8a0421;
	border-color: #dd0f3b;
  background-color: #ffd9d9!important;
  font-size: 14px;
}
.error-message {
  color: #8a0421;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 16px;
}
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
    padding: 50px;
    opacity: 1;      
    background: #F5F5F5;
    border-radius: 13px;
    .button-wrapper {
      display: flex;
      justify-content: space-between;
      width: 200px;
      align-self: flex-end;
      &.show {
        display: block;
      }
      button {
        width: 90px;
        padding: 5px 0;
        font-weight: bold;
        border: none;
        border-radius: 20px;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16); 
        cursor: pointer;
        &:focus {
          outline: none;
        }
        &:hover {
          opacity:0.8;
        }
      }
      .ok-button {
        background: #1473E6;
        color: #fff;        
      }
      .cancel-button {
        border: darkgray 3px solid;
        color: #6e6e6e;
      }
    }
  }
}
.dialog-form {
  display: flex;
  flex-direction: column;  
  width: 400px;
  margin-bottom: 30px;
  label {
    width: 20%;
    font-size: 14px;
    margin-bottom: 8px;
    border-bottom: #9f9f9f 1px solid;
  }
  .title-input {
    width: 100%;
    height: 24px;
    margin-bottom: 14px;
    background: #F5F5F5;
    border:darkgray 1px  solid;
  }  
  .time-input {
    width: 50px;
    height: 30px;
    margin-bottom: 70px;
    background: #F5F5F5;  
    border:darkgray 1px  solid;
  }
}
</style>