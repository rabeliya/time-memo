<template>
  <div>
    <OptionDialog v-if="this.isDialog" v-bind:value="isDialog" @toggle="reflectDialog" v-bind.sync="hold" @submit="createCard()"/>
    <ul class="card-list">
      <li v-for="(card,index) in cards" :key="card.id" class="task-card">
        <div>
          <p>{{ cards[index].title }}</p>
          <span class="card-color">{{ cards[index].color }}</span>
          <span class="edit-card">...</span>
          <ul>
            <li>
              <input type="checkbox" name="" id="" />
            </li>
            <li>
              <input type="checkbox" name="" id="" />
            </li>
            <li>
              <input type="checkbox" name="" id="" />
            </li>
            <li>
              <input type="checkbox" name="" id="" />
            </li>
          </ul>          
        </div>
      </li>
      <li>
        <CreateCard @toggle="reflectDialog" v-bind:value="isDialog"/>
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
    hold:
      { title: "", color: "" }
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
  },
};
</script>
<style lang="scss" scoped>

li {
  list-style: none;
}

.card-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .task-card {
    background: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    width: 190px;
    height: 250px;
    padding: 20px;
    margin-bottom: 20px;
    .edit-card {
      cursor: pointer;
    }
  }
}
</style>