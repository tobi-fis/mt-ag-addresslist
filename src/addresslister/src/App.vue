<template>
  <div id="appHeader">
    <div
      :class="{ fab: true, secondary: editMode }"
      @click="toggleEditMode"
      style="top: 20px; left: 20px"
    >
      <font-awesome-icon v-if="editMode" class="buttonIcon" icon="check" />
      <font-awesome-icon v-else class="buttonIcon" icon="pencil-alt" />
    </div>
    <div id="appHeaderText">
      <span v-text="headerText" />
      <font-awesome-icon
        v-if="editMode"
        class="iconButton"
        icon="plus"
        style="height: 22px; width: 22px"
        @click="newContact"
      />
    </div>
  </div>

  <div id="contactScroller">
    <person-card
      v-for="contact in contacts"
      :key="contact.id"
      :contact="contact"
      :editMode="editMode"
      @toggle-hide-contact="toggleHiddenStatus"
      @edit-contact="editContact"
    />
  </div>
  <edit-dialog
    :contactInfo="contactToEdit"
    :shouldRender="renderEditDialog"
    @abortEdit="abortEdit"
    @deleteContact="deleteContact"
    @confirmEdit="confirmEdit"
  />
</template>

<script>
import PersonCard from "./components/PersonCard.vue";
import EditDialog from "./components/EditDialog.vue";
import json from "./assets/contacts.json";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "App",

  data() {
    return {
      contacts: json,
      editMode: false,
      headerText: "Meine Adressen",
      contactToEdit: {},
      renderEditDialog: false,
    };
  },

  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        this.headerText = "Adressen bearbeiten";
      } else {
        this.headerText = "Meine Adressen";
      }
    },
    toggleHiddenStatus(id) {
      const identifiedContact = this.contacts.find(
        (contact) => contact.id === id
      );
      identifiedContact.hidden = !identifiedContact.hidden;
    },
    editContact(idToEdit) {
      this.contactToEdit = this.contacts.find(
        (contact) => contact.id === idToEdit
      );
      this.renderEditDialog = true;
    },
    abortEdit(id, contactOld) {
      let resetContact = this.contacts.find((contact) => contact.id === id);
      if (resetContact != undefined) {
        resetContact.name = contactOld.name;
        let j = 0;
        for (const address of contactOld.addresses) {
          Object.assign(resetContact.addresses[j], address);
          j++;
        }
        // Alle ggf. hinzugefügten Adressen löschen
        resetContact.addresses.splice(j);
      }

      this.closeEditDialog();
    },
    closeEditDialog() {
      (this.renderEditDialog = false), (this.contactToEdit = {});
    },
    deleteContact(idToDelete) {
      this.closeEditDialog();
      this.contacts.splice(
        this.contacts.findIndex(function (i) {
          return i.id === idToDelete;
        }),
        1
      );
    },
    newContact() {
      this.contactToEdit = {
        id: uuidv4(),
        hidden: false,
        name: "",
        addresses: [{ street: "", zip: "", city: "" }],
      };
      this.renderEditDialog = true;
    },
    confirmEdit(id) {
      // Prüfen ob ID schon vorhanden. Falls ja nichts tun, da Daten bereits durch v-model aktualisiert werden
      if (!this.contacts.some((contact) => contact.id === id)) {
        let newContact = JSON.parse(JSON.stringify(this.contactToEdit));
        this.contacts.push(newContact);
      }
      this.contacts.sort((a, b) => a.name.localeCompare(b.name));
      this.closeEditDialog();
    },
  },

  mounted: function () {
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
  },

  components: {
    PersonCard,
    EditDialog,
  },
};
</script>

<!-- Globale Styles -->
<style>
.buttonIcon {
  height: 20px;
  vertical-align: text-bottom;
}

#appHeader {
  position: fixed;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  height: 80px;
  width: 1200px;
  background-color: white;
}

#appHeaderText {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 800px;
  margin: 0px auto 0px auto;
  align-self: flex-end;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: #707070;
  border-bottom: 2px solid #707070;
  padding-bottom: 7px;
  padding-left: 25px;
}

#contactScroller {
  position: fixed;
  top: 212px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 13px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: calc(100vh - 240px);
}

/* Scrollbar für Chrome, Safari and Opera verstecken */
#contactScroller::-webkit-scrollbar {
  display: none;
}

/* Floating Action Button */
.fab {
  cursor: pointer;
  width: 56px;
  height: 56px;
  background-color: #0d5b8f;
  border-radius: 50%;
  box-shadow: 0 3px 8px 0 rgb(124, 124, 124);
  transition: all 0.1s ease-in-out;
  font-size: 30px;
  color: white;
  text-align: center;
  line-height: 40px;
  position: fixed;
}

.fab.secondary {
  background-color: #019592;
}

.fab:hover {
  background-color: #1e6591;
  box-shadow: 0 3px 8px 0 rgb(124, 124, 124);
}

.fab:active {
  box-shadow: 0 1px 6px 0 rgb(124, 124, 124);
}

.fab.secondary:hover {
  background-color: #00b3a6;
}

/* Klickbares Icon */
.iconButton {
  grid-column: 2;
  height: 28px;
  margin: 0px 4px;
  color: #0d5b8f;
  cursor: pointer;
}

.iconButton.inactive {
  color: #a2a2a2;
}

.iconButton:hover {
  color: #1e6591;
}
</style>
