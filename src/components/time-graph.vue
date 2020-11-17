<template>
  <div class="card-wrapper">
    <h2>Working Time</h2>
    <p class="graph-tag">Total</p>
    <div class="total-time-wrapper">
      <p class="total-time">
        {{ totalHour }}<span class="mini-letter">h</span>
        {{ totalMin }}<span class="mini-letter">min</span>
      </p>           
    </div>
    <ul class="progress-bar">
      <li v-for="(card,index) in cards" :key="card.id" v-bind:style="{background:cardColor(index),
        width: barWidth(sortLabel(index).totalTime) + 'px'}">      
      </li>
    </ul>
    <ul v-if="cards.length > 0" class="label-wrapper">
      <li v-for="(card,index) in cards" :key="card.id" class="data-label">
        <div class="name-group">
          <span class="card-color" v-bind:style="{background:cardColor(index) }"></span>
          <span class="card-name">
            {{ sortLabel(index).title }}
          </span>
          <span class="card-time">
              {{ convertToHour(sortLabel(index).totalTime) }}h{{ leftMin(sortLabel(index).totalTime) }}min
          </span>
        </div>
        <span class="percent">{{ calcPercent(sortLabel(index).totalTime) }}%</span>        
      </li>
    </ul>
    <ul v-else>
      <li class="no-task-info">No task !</li>
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
        const resultHour = Math.floor(total / 60);
        if(resultHour === 0) {
          return "";
        } else {
          return Math.floor(total / 60);
        }
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
          return Math.floor(time / total *100);
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
        }
      },
      cardColor() {
        return function(index) {
          if(index === 0 ) return '#E23046'
          if(index === 1 ) return '#F7B000'
          if(index === 2 ) return '#9BB51C'
          if(index === 3 ) return '#199C9B'
          if(index === 4 ) return '#287BAB'
          return '#9C4F89'          
        }
      },
      sortLabel() {                
        return function(value) {
          const labels = this.cards.slice().sort((a, b) => {
          if (a.totalTime < b.totalTime) return 1
          if (a.totalTime > b.totalTime) return -1
          return 0
          })
          return labels[value];                
        }
      }
   }
  }      
</script>
<style lang="scss" scoped>
  li{
    list-style: none;
  }
  .no-task-info {
    margin-top: 30px;
  }
  .card-wrapper {
    background: $card-color;
    box-shadow: $shadow;
    display: flex;  
    flex-direction: column;  
    align-items: center;
    width: 280px;
    min-height: 200px;
    margin-bottom: 120px;
    padding: 20px;        
    .graph-tag {
      margin-bottom: 16px;
    }
    .total-time-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 50px;
      border-radius: 10%;
      box-shadow: $shadow;
      margin-bottom: 35px;
      .total-time {
        display: flex;
        justify-content: flex-start;       
        align-items: flex-end; 
        font-size: 24px;
        .mini-letter {
          font-size: 14px;
          margin: 0 3px;
        }
      }
    }
    .progress-bar {
      display: flex;
      width: 250px;
      height: 20px;      
      box-shadow: $shadow;
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
        justify-content: space-between;
        margin-bottom: 16px;
        .name-group {
          display: flex;
          .card-color {
            display: block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 16px;
            box-shadow: $shadow;
          }
          .card-name {
            margin-right: 14px;
          }
        }                
        .percent {
          margin-left: 16px;
        }
      }
    }
  } 
</style>