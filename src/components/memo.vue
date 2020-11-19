<template>
  <div id="memo">
    <h2>Memo</h2>
    <textarea
      v-model="memo"
      name="memo"
      cols="30"
      rows="10"
      class="memo-space"
      placeholder="memo something!"
    ></textarea>
  </div>
</template>
<style lang="scss" scoped>

#memo {  
  display: flex;  
  flex-direction: column;  
  align-items: center;
  background: $card-color;
  box-shadow: $shadow;
  width: 320px;
  height: 250px;
  padding: 20px;
  margin: 120px 0 80px;  
  .memo-space {
    width: 240px;
    height: 170px;
    background: $second-card-color;
    overflow: visible;
    padding: 16px;
    font-size: 16px;
    border: none;
    box-shadow: $shadow;
    line-height: 1.3;
    &:focus {
      outline: none;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      memo: "",
    };
  },
  watch: {
    memo: {
      handler: function () {
        localStorage.setItem("memo", JSON.stringify(this.memo));
      },
      deep: true,
    },
  },
  mounted: function () {
    this.memo = JSON.parse(localStorage.getItem("memo")) || [];
  },
};
</script>