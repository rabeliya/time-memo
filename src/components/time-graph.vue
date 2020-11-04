<template>
  <div class="card-wrapper">
    aiueo
  </div>
</template>
<script>
export default {
  props: {    
  },
  data: ()=> ({
    cards: [],
    labels:[],   
  }),
  methods: {
    makeLavel: function() {      
      
    }
  },  
  mounted: function () {
    this.cards = JSON.parse(localStorage.getItem("cards")) || [];
  },
  // watchは登録したプロパティの変更を見て実行される
  // watch: {
  //   cards: {
  //     reflectLabels: function() {
  //       // cardsのobjのtitleとtotalTimeのみをlabelsに反映させたい
  //       // this.labels = [...this.cards];
  //     }
  //   }
  // },
  // computed: {
  //   labelComputed: {      
  //     get: function() {
  //       return this.labels;
  //     },
  //     // set: function() {
  //     //   for(const obj of this.cards) {          
  //     //     this.labels.push(obj.slice(0,2))
  //     //   }         
  //     //     this.labels = [...this.cards]
  //     //   this.labels.push([...this.cards].item.slice(0,2))
  //     // }
  //   },    
  // }
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