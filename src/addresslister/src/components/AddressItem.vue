<template>
  <div class="addressContainer">
    <img class="addressImg" src="../assets/img/icon_maps_place_24px.png">
    <div id="verticalLine"/>
    <span class="addressText">{{ street }}</span>
    <span class="addressText">{{ zip }} {{ city }} </span>
  </div>
</template>

<script>
export default {
  name: "AddressItem",
  
  props: {
    street: String,
    zip: {
      type: Number,
      validator: function(value){
        return value.toString().length === 5
      }
    },
    city: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addressContainer {
  display:grid;
  justify-items: start;
  grid-template-columns: 50px 1px auto;
  grid-template-rows: 37px 37px;
  row-gap: 1px;
}

.addressImg{
  height: 32px; 
  grid-column: 1 / 2;
  margin-left: 4px;
}

#verticalLine{
  border-left:solid 1px #124C73;
  grid-column: 2 / 3;
  grid-row: 1 / span 2;
}

.addressText{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 28px;
  grid-column: 3 / 4;
  margin-left: 20px;
}
</style>
