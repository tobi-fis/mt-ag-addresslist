<template>
  <div :class="editable ? 'addressContainerEditable' : 'addressContainer'">
    <img class="addressImg" src="../assets/img/icon_maps_place_24px.png" />
    <div id="verticalLine" />

    <!-- Template Edit-Modus -->
    <template v-if="editable">
      <span class="addressTextInput">
        <input
          type="text"
          v-model="address.street"
          style="width: 506px"
          placeholder="Straße und Nummer"
        />
        <font-awesome-icon
          class="iconButton deleteAddress"
          icon="times"
          @click="deleteAddress"
        />
      </span>
      <span class="addressTextInput">
        <input
          type="text"
          v-model="address.zip"
          style="width: 103px"
          placeholder="PLZ"
          maxlength="5"
        />
        <input
          type="text"
          v-model="address.city"
          style="width: 393px; margin-left: 10px"
          placeholder="Straße und Nummer"
        />
      </span>
    </template>

    <!-- Template View-Modus -->
    <template v-else>
      <span class="addressText">{{ address.street }}</span>
      <span class="addressText">{{ address.zip }} {{ address.city }} </span>
    </template>
  </div>
</template>

<script>
export default {
  name: "AddressItem",

  data() {
    return {
      address: this.addressInfo,
    };
  },

  methods: {
    deleteAddress() {
      this.$emit("deleteAddress", this.addressInfo.id);
    },
  },

  props: {
    addressInfo: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<!-- Scoped Styles -->
<style scoped>
input {
  height: 56px;
  background-color: rgba(0, 0, 0, 0.04);
  border: solid 1px transparent;
  border-radius: 4px 4px 0px 0px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  padding-left: 16px;
  box-sizing: border-box;
  outline:none;
}

input:hover{
  background-color: rgba(0, 0, 0, 0.1);
}

input:focus{
  border-bottom-color: #1E6591;
  border-bottom-width: 2px;
  padding-bottom: 0px;
  background-color: rgba(0, 0, 0, 0.1);
}

.addressContainer {
  display: grid;
  justify-items: start;
  grid-template-columns: 50px 1px auto;
  grid-template-rows: 37px 37px;
  row-gap: 1px;
}

.addressContainerEditable {
  display: grid;
  justify-items: start;
  grid-template-columns: 50px 1px auto;
  grid-template-rows: 56px 56px;
  row-gap: 8px;
}

.addressImg {
  height: 32px;
  grid-column: 1 / 2;
  margin-left: 4px;
}

#verticalLine {
  border-left: solid 1px #124c73;
  grid-column: 2 / 3;
  grid-row: 1 / span 2;
}

.addressText {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 28px;
  grid-column: 3 / 4;
  margin-left: 20px;
}

.addressTextInput {
  grid-column: 3 / 4;
  margin-left: 20px;
}

.deleteAddress {
  grid-row: 1;
  grid-column: 3 / 4;
  margin-left: 14px;
  margin-top: 12px;
  height: 16px;
  width: 16px;
  vertical-align: top;
}
</style>
