<template>
  <div class="dialog-wrapper">
    <div class="dialog-bg" @click="toggleDialog"></div>
    <div class="dialog">
      <form class="dialog-form">              
        <input type="text" v-model="titleComputed" placeholder="type title!" :class="{ error : $v.title.$error,'form-control': true }">              
        <span v-if="$v.title.$error" class="error-message">Type any title !</span>
        <select v-model="colorComputed" :class="{ error : $v.color.$error,'form-control': true }">
            <option disabled value="">color</option>        
            <option value="red">🔴</option>
            <option value="green">🟢</option>
            <option value="yellow">🟡</option>
            <option value="blue">🔵</option>
            <option value="pink">🟣</option>
        </select>
        <span v-if="$v.color.$error" class="error-message">select any color !</span>
        <select v-model="minuteComputed" :class="{ error : $v.minute.$error,'form-control': true }">
            <option disabled value="">minute</option>                
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="90">90</option>
        </select>
        <span v-if="$v.minute.$error" class="error-message">select any minute !</span>
        <div class="button-wrapper">
          <button type="button" class="ok-button" @click="submitForm">OK</button>          
          <button class="cancel-button" type="button" @click="toggleDialog">cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
  props: {
    isDialog: Boolean,    
    title: String,
    color: String,
    minute: String,
  },
  data: ()=> ({
  }),
  
  validations: {
      title: {
        required,        
      },
      color: {
        required,        
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
    colorComputed: {
      get: function() {
        return this.color;        
      },
      set: function(newValue) {
        this.$emit("update:color", newValue);
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
.error {
	color: #8a0421;
	border-color: #dd0f3b;
  background-color: #ffd9d9;
}
.error-message {
  color: #8a0421;
}
.dialog-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  .dialog-bg {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.4;
  }
  .dialog {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    width: 500px;
    height: 300px;
  }
  .button-wrapper {
    display: flex;
    justify-content: space-between;
    width: 200px;
    button {
      width: 90px;
    }
    .ok-button {
      background: cornflowerblue;
    }
    .cancel-button {
      background: darkgray;
    }
  }

}
.dialog-wrapper.show {
  display: block;
}

.dialog-form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-bottom: 30px;

  select {
    width: 50px;
  }
}
</style>