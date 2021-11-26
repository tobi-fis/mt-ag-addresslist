<template>
  <person-card
    v-for="contact in contacts"
    :key="contact.id"
    :contact="contact"
    :editMode="editMode"
  />
</template>

<script>
import PersonCard from "./components/PersonCard.vue";
import json from "./assets/contacts.json";

export default {
  name: "App",

  data() {
    return {
      contacts: json,
      editMode: false
    };
  },
  
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
