<template>
  <div class="card-wrapper">
    <h2>Working Time</h2>
    <p>total</p>
    <p>{{ totalHour }} h{{ totalMin }}min</p>    
    <ul class="progress-bar">
      <li v-for="card in cards" :key="card.id" v-bind:style="{background:card.color,
        width: barWidth(card.totalTime) + 'px'}">      
      </li>
    </ul>
    <ul v-if="cards.length > 0" class="label-wrapper">
      <li v-for="card in cards" :key="card.id" class="data-label">
        <span class="card-color" v-bind:style="{background:card.color }"></span>
        {{ card.title }}/ {{ convertToHour(card.totalTime) }}h{{ leftMin(card.totalTime) }}min
        <span>{{ calcPercent(card.totalTime) }}%</span>
      </li>
    </ul>
    <ul v-else>
      <li>No task !</li>
    </ul>
  </div>
</template>
<script>
  export default {
    components: { 
    },
    props: {
      cards: Array,
    },
    data: () => ({        
      
    }),  
    methods: {
    },
    computed: {
      totalHour() {
        let total = 0;
        const length = this.cards.length;
        for(let i = 0; i < length; i++) {
          total += this.cards[i].totalTime 
        }
        return Math.floor(total / 60);
      },
      totalMin() {
        let total = 0;
        const length = this.cards.length;
        for(let i = 0; i < length; i++) {
          total += this.cards[i].totalTime 
        }
        return total % 60;      
      },
      convertToHour() {
        return function(time) {
          return Math.floor(time / 60);                 
        }               
      },
      leftMin() {
        return function(time) {
          return time % 60;      
        }
      },
      calcPercent() {
        return function(time) {
          let total = 0;
          const length = this.cards.length;
          for(let i = 0; i < length; i++) {
            total += this.cards[i].totalTime 
          }
          return (time / total *100).toFixed(1);
        }
      },
      barWidth() {
        return function(time) {
          let total = 0;
          const wrapperWidth = 250;
          const length = this.cards.length;
          for(let i = 0; i < length; i++) {
            total += this.cards[i].totalTime 
          }
          return Math.floor(wrapperWidth * (time / total));
          // ここまでpercent


        }

      }      
    }
  }      
</script>
<style lang="scss" scoped>
  li{
    list-style: none;
  }
  .card-wrapper {
    background: rgb(238, 227, 227);  
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);  
    display: flex;  
    flex-direction: column;  
    align-items: center;
    width: 280px;
    min-height: 200px;
    padding: 20px;
    color: crimson;
    .progress-bar {
      display: flex;
      width: 250px;
      height: 20px;
      border: #000 solid 1px;
      padding: 0;
      margin: 0;
      li {
        height: 20px;
      }
    }
    .label-wrapper {
      padding: 0;
      margin-top: 30px;
      .data-label {
        display: flex;
        margin-bottom: 16px;
        .card-color {
          display: block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 16px;
        }
      }
    }
  } 
</style>