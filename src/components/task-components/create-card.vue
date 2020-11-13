<template>
  <div class="create-card"><img src="../../assets/plus.svg" alt="create-taskcard-button" class="create-card-button" @click="toggleDialog()" width="100"></div>
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
  background: #fff;
  .create-card-button {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>