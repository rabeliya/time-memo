<template>
  <div class="card-wrapper">
    aiueo
  </div>
</template>
<script>
export default {
  props: {
    cards: {
      type: Object,
      default: () => ({})
    }
  },
  data: ()=> ({

  }),
  methods: {

  },
  comuputed: {

  }
}
</script>
<style lang="scss" scoped>
  .card-wrapper {
    background: #fff;  
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);  
    display: flex;  
    flex-direction: column;  
    align-items: center;
    width: 280px;
    height: 200px;
    padding: 20px;
    color: crimson;
  } 
</style>