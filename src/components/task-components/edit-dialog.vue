<template>
  <div class="dialog-wrapper">
    <div class="dialog-bg"></div>
    <div class="dialog">
      <form class="dialog-form">                 
        <input type="text" v-model="titleComputed">
        <select v-model="colorComputed">
            <option value="red">🔴</option>
            <option value="green">🟢</option>
            <option value="yellow">🟡</option>
            <option value="blue">🔵</option>
            <option value="pink">🟣</option>
        </select>        
        <select v-model="minuteComputed">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="90">90</option>
        </select>
        <div class="button-wrapper">
          <button type="button" class="ok-button" @click="closeEditDialog();emitData()">OK</button>          
          <button class="cancel-button" type="button" @click="closeEditDialog()">cancel</button>
        </div>
      </form>      
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isEditDialog: Boolean,
    title: String,
    color: String,
    minute: String,
    totalTime: Number,
    cardIndex: Number,      
  },
  data: ()=> ({
  }),
  methods: {    
    closeEditDialog: function() {
      this.isEditDialog = false;
      this.$emit('closeEditDialog',this.isEditDialog );
    },
    emitData: function() {
      this.$emit('submit');
    },
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
    totalTimeComputed: {
      get: function() {
        return this.totalTime;
      },
      set: function(newValue) {
        this.$emit("update:totalTime", newValue);
      }
    },
    indexComputed: {
      get: function() {
        return this.cardIndex;
      },
      set: function(newValue) {
        this.$emit("update:cardIndex", newValue);
      }
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