<template>
  <person-card
    v-for="contact in contacts"
    :key="contact.id"
    :name="contact.name"
    :addresses="contact.addresses"
  />
</template>

<script>
import PersonCard from "./components/PersonCard.vue";
import json from "./assets/contacts.json";

export default {
  data() {
    return {
      contacts: json,
    };
  },
  name: "App",
  components: {
    PersonCard,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
