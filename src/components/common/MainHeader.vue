<template>
  <div id="main-header">
    <img src="../../assets/images/satellite.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "mainHeader",
};
</script>

<style scoped>
#main-header {
  background-color: black;
  height: 75px;
  line-height: 75px;
  width: 100%;
  position: fixed;
  top: 0;
}

#main-header img {
  width: 15%;
  height: 50px;
  text-align: center;
}
</style>