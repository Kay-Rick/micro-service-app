<template>
  <div id="main-content">
    <main-sidebar></main-sidebar>
    <main-info></main-info>
  </div>
</template>

<script>

import mainSidebar from '../content/Sidebar';
import mainInfo from './MainInfo'

export default {
  name: "mainContent",
  components: {
    "main-sidebar": mainSidebar,
    "main-info": mainInfo
  }
}
</script>

<style>
#main-content {
  height: 100%;
  width: 100%;
}
</style>