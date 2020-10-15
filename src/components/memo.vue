<template>
  <div id="memo">
    <h2>memo</h2>
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
  background: #fff;
  -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
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
  width: 280px;
  height: 200px;
  padding: 20px;
  margin-bottom: 80px;
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