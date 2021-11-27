<template>
  <div
    class="cardContainer"
    :class="{ inactive: cardInactive, invisible: cardInvisible }"
  >
    <div class="cardTitleArea">
      <img
        style="height: 38px; margin-right: 33px"
        src="../assets/img/icon_user_24px.png"
      />
      <span class="cardName">{{ contact.name }}</span>
    </div>
    <div class="cardButtons" :class="editMode ? '' : 'invisible'">
      <font-awesome-icon class="cardButtonIcon" icon="pencil-alt" />
      <font-awesome-icon
        class="cardButtonIcon"
        :class="cardInactive ? 'inactive' : ''"
        icon="eye"
        @click="toggleHidden"
      />
    </div>
    <address-item
      class="cardAddress"
      v-for="(address, index) in contact.addresses"
      :key="index"
      :city="address.city"
      :street="address.street"
      :zip="address.zip"
      :style="{ 'grid-row': index + 2 }"
    />
  </div>
</template>

<script>
import AddressItem from "./AddressItem.vue";

export default {
  name: "PersonCard",

  data() {
    return {
      cardInvisible: false,
      cardInactive: this.contact.hidden,
    };
  },

  methods: {
    toggleHidden() {
      this.cardInactive = !this.cardInactive;
    },
  },

  watch: {
    editMode: function () {
      this.cardInvisible = !this.editMode && this.cardInactive;
    },
  },

  mounted: function () {
    this.cardInvisible = !this.editMode && this.cardInactive;
  },

  props: {
    contact: {
      type: Object,
      required: true,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    AddressItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cardContainer {
  display: grid;
  grid-template-columns: auto 64px;
  grid-template-rows: 39px;
  grid-auto-rows: 75px;
  row-gap: 15px;
  min-height: 126px;
  width: 717px;
  border: solid 2px #65b3d1;
  border-radius: 0px 10px 10px 10px;
  margin: 0px auto 24px auto;
  padding: 15px 15px 15px 34px;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}

.cardContainer.inactive {
  border: solid 2px transparent;
  border-radius: 0px 10px 10px 10px;
  background-color: #f3f3f3;
  -webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.16);
}

.cardTitleArea {
  display: flex;
  grid-column: 1;
  grid-row: 1;
}

.cardName {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 28px;
  font-weight: 600;
  flex-grow: 1;
}

.cardButtons {
  grid-column: 2;
  display: flex;
  justify-content: space-between;
}

.cardButtonIcon {
  grid-column: 2;
  height: 28px;
  margin: 0px 4px;
  color: #0d5b8f;
  cursor: pointer;
}

.cardButtonIcon.inactive {
  color: #a2a2a2;
}

.cardButtonIcon:hover {
  color: #1e6591;
}

.cardButtons {
  grid-column: 2;
}

.cardAddress {
  grid-column: 1;
}

.invisible {
  display: none;
}
</style>
