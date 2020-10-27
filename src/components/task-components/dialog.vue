<template>
  <div class="dialog-wrapper">
    <div class="dialog-bg"></div>
    <div class="dialog">
      <form class="dialog-form" @submit.prevent="$emit('send')">              
        <input type="text" @input="$emit('update:title',$event.target.value)" :value="hold.title" placeholder="type title!">      
        <select @input="$emit('update:color',$event.target.value)" :value="hold.color">
            <option value="red">🔴</option>
            <option value="green">🟢</option>
            <option value="yellow">🟡</option>
            <option value="blue">🔵</option>
            <option value="pink">🟣</option>
        </select>
        <select @input="$emit('update:minute',$event.target.value)" :value="hold.minute">
            <option disabled value="">minute</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="90">90</option>
        </select>
        <div class="button-wrapper">
          <button type="button" class="ok-button" @click="toggleDialog();emitData()">OK</button>          
          <!-- <button type="button" class="ok-button" @click="toggleDialog();$emit('submit')">OK</button>           -->
          <button class="cancel-button" type="button" @click="toggleDialog()">cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hold: {
      type: Object,
      default: () => ({        
      })
    }
  },
  data: ()=> ({
  }),
  methods: {    
    toggleDialog: function() {
      this.isDialog = false;
      this.$emit('toggle',this.isDialog );
    },
    emitData: function() {
      this.$emit('submit');
    },
  }
};
</script>
<style lang="scss" scoped>
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