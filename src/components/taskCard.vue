<template>
  <div>
    <OptionDialog v-if="this.isDialog" v-bind:value="isDialog" @toggle="reflectDialog" v-bind.sync="hold" @submit="createCard"/>
    <ul>
      <li>
        <CreateCard @toggle="reflectDialog"/>
      </li>
      <li v-for="card in cards" :key="card.id">
        <div class="task-card">
          <!-- <p>{{ this.cards.title }}</p>
          <span class="card-color">{{ this.cards.color }}</span> -->
          <span class="edit-card">...</span>
          <input type="checkbox" name="" id="" />
          <input type="checkbox" name="" id="" />
          <input type="checkbox" name="" id="" />
          <input type="checkbox" name="" id="" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import OptionDialog from "./task-components/dialog.vue";
import CreateCard from "./task-components/createCard.vue";

export default {
  name: "App",
  components: {
    OptionDialog,
    CreateCard,
  },
  data: () => ({
    cards: [],
    isDialog: false,
    hold:[
      {
        title: "", color: ""
      }]
  }),
  methods: {
    reflectDialog(newValue) {
      this.isDialog = newValue;
    },
    createCard() {
            const card = {
        title: this.hold.title,
        color: this.hold.color,
      };
      this.cards.push(card);
      this.hold.title = "";
      this.hold.color = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.task-card {
  border: cornflowerblue 2px solid;
  .edit-card {
    cursor: pointer;
  }
}
</style>