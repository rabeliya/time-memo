<template>
  <div class="create-card"><button class="open-dialog" @click="toggleDialog()">＋</button></div>
</template>
<script>
export default {
  props: {
    // dialogValue: Boolean
  },
  data: ()=> ({
    dialogValue: false,
  }),
  methods: {
    toggleDialog: function() {
      this.dialogValue = ! this.dialogValue;
      this.$emit('toggle',this.dialogValue )
    }
  }

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
  border: dashed 2px #333;
  padding: 20px;
  background: #fff;
}
</style>