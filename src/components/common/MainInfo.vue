<template>
  <div id="main_info">
    <!-- <service-main></service-main> -->
    <router-view></router-view>
    <!-- <node-main></node-main> -->
    <!-- <service-instance></service-instance> -->
    <!-- <node-instance></node-instance> -->
    <!-- <service-info></service-info> -->
  </div>
</template>

<script>

import serviceMain from '../content/ServiceMain';
import nodeMain from '../content/NodeMain';
import serviceInstance from '../content/ServiceInstance';
import nodeInstance from '../content/NodeInstance';
import serviceInfo from '../content/ServiceInfo';
import boardInstance from '../content/BoardInstance';
import dspInstance from '../content/DSPInstance.vue';
import fpgaInstance from '../content/FPGAInstance.vue';
import virtualization from '../content/Virtualization.vue';

export default {
  name: "mainInfo",
  components: {
    "service-main": serviceMain,
    "node-main": nodeMain,
    "service-instance": serviceInstance,
    "node-instance": nodeInstance,
    "service-info": serviceInfo,
    "board-instance": boardInstance,
    "dsp-instance": dspInstance,
    "fpga-instance": fpgaInstance,
    "virtualization": virtualization
  }
}
</script>

<style scope>
#main_info {
  box-sizing: border-box;
  float: left;
  margin-left: calc(15% + 10px);
  width: calc(85% - 10px);
  position: static;
  height: 100%;
}

</style>