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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
  -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  width: 280px;
  height: 200px;
  padding: 20px;
  margin: 120px 0 80px;
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .memo-space {
    width: 240px;
    height: 120px;
    background: #f5f5f5 0% 0% no-repeat padding-box;
    overflow: visible;
    font-size: 16px;
    border: none;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);  
  }
}
</style>
<script>
export default {
  props: {
    value: String,
  },
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