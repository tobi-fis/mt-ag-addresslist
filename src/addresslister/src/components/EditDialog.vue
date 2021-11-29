<template>
  <div v-if="shouldRender" class="dialogOverlay">
    <div class="dialogFrame">
      <div class="dialogContent">
        <div class="dialogInput">
          <div class="dialogTitleArea">
            <img
              style="height: 38px; margin: 8px 12px 0px 0px"
              src="../assets/img/icon_user_24px.png"
            />
            <input type="text" v-model="contact.name" style="width: 527px" />
          </div>
          <address-item
            class="cardAddress"
            v-for="(address, index) in contact.addresses"
            :key="address.id"
            :addressInfo="address"
            :editable="true"
            :style="{ 'grid-row': index + 2 }"
            @deleteAddress="deleteAddress"
          />
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 75px;
          "
        >
          <font-awesome-icon
            class="iconButton addNewAddress"
            icon="plus"
            @click="addAddress"
          />
        </div>
      </div>

      <div class="dialogButtons">
        <div class="fab" @click="deleteContact" style="grid-column: 1 / 2">
          <font-awesome-icon class="buttonIcon" icon="trash-alt" />
        </div>

        <div class="fab" @click="abortEdit" style="grid-column: 3 / 4">
          <font-awesome-icon class="buttonIcon" icon="times" />
        </div>

        <div
          class="fab secondary"
          @click="confirmEdit"
          style="grid-column: 4 / 5; margin-left: 20px"
        >
          <font-awesome-icon class="buttonIcon" icon="check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressItem from "./AddressItem.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "EditDialog",

  data() {
    return {
      contact: {},
      contactOld: {},
    };
  },

  methods: {
    abortEdit() {
      this.$emit("abortEdit", this.contact.id, this.contactOld);
    },
    confirmEdit() {
      this.$emit("confirmEdit", this.contactInfo.id, this.contact);
    },
    deleteContact() {
      this.$emit("deleteContact", this.contactInfo.id);
    },
    addAddress() {
      this.contact.addresses.push({
        street: "",
        zip: "",
        city: "",
        id: uuidv4(),
      });
    },
    deleteAddress(idToDelete) {
      this.contact.addresses.splice(
        this.contact.addresses.findIndex(function (i) {
            return i.id === idToDelete;
          }),
        1
      );
    },
  },

  watch: {
    shouldRender: function () {
      if (this.shouldRender) {
        this.contact = this.contactInfo;
        this.contactOld = JSON.parse(JSON.stringify(this.contactInfo));
      } else {
        this.contact = {};
        this.contactOld = {};
      }
    },
  },

  computed: {
    showAdd: function () {
      // `this` points to the vm instance
      return this.message.split("").reverse().join("");
    },
  },

  props: {
    contactInfo: {
      type: Object,
    },
    shouldRender: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    AddressItem,
  },
};
</script>

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
}

.dialogOverlay {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100%;
  background-color: rgba(159, 159, 159, 0.8);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.dialogFrame {
  width: 800px;
  margin-top: 144px;
}

.dialogContent {
  padding-top: 25px;
  min-height: 295px;
  background-color: white;
  border: solid 1px #707070;
  border-radius: 5px;
  -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  box-sizing: border-box;
  max-height: calc(100vh - 250px);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Scrollbar für Chrome, Safari and Opera verstecken */
.dialogContent::-webkit-scrollbar {
  display: none;
}

.dialogInput {
  display: grid;
  grid-template-columns: 90px auto auto;
  grid-template-rows: 56px;
  grid-auto-rows: 120px;
  row-gap: 15px;
}

.dialogTitleArea {
  display: flex;
  grid-column: 2;
  grid-row: 1;
}

.dialogButtons {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-template-rows: auto;
}

.fab {
  position: relative;
  margin-top: 10px;
}

.cc {
  min-height: 126px;
  width: 717px;
  border: solid 2px #65b3d1;
  border-radius: 0px 10px 10px 10px;
  margin: 0px auto 24px auto;
  padding: 15px 15px 15px 34px;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}

.cardButtonIcon {
  grid-column: 2;
  height: 28px;
  margin: 0px 4px;
  color: #0d5b8f;
  cursor: pointer;
}

.cardButtonIcon:hover {
  color: #1e6591;
}

.cardAddress {
  grid-column: 2;
}

.addNewAddress {
  height: 22px;
  width: 22px;
}
</style>
