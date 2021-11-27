import { createApp } from 'vue'
import App from './App.vue'

//FontAwesome Icons 
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faCheck, faEye, faTrashAlt, faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faPencilAlt);
library.add(faCheck);
library.add(faEye);
library.add(faTrashAlt);
library.add(faCross);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");