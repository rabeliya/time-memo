<template>
  <div class="create-card">
    <button class="create-card-button" @click="toggleDialog()">
      <img src="../../assets/plus.svg" alt="create-taskcard-button"  width="100">
    </button>
    </div>
</template>
<script>
export default {
  props: {        
    isDialog: Boolean,
  },
  data: ()=> ({    
  }),
  methods: {
    toggleDialog: function() {      
      this.$emit('showDialog',this.isDialog )      
    }
  },
};
</script>
<style lang="scss" scoped>
.create-card {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  width: 190px;
  height: 250px;
  border: dashed 2px darkgray;
  padding: 20px;
  background: $card-color;
  .create-card-button {
    background: #fff;
  }
}
</style>