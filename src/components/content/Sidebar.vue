<template>
  <div id="sidebar">
    <!--<img src="../../assets/images/header_icon.svg"> -->
    <div style="padding-top:20px"></div>
    <img src="../../assets/images/satellite.svg">
    <ul>
      <li><router-link to="/service">服务</router-link></li>
      <li><a to="/#">节点</a></li>
      <li class="sub"><router-link to="/board/192.168.1.10" @click.native="flushCom">192.168.1.10</router-link></li>
      <li class="sub"><router-link to="/board/192.168.1.191" @click.native="flushCom">192.168.1.191</router-link></li>
      <li class="sub"><router-link to="/board/192.168.1.194" @click.native="flushCom">192.168.1.194</router-link></li>
      <li class="sub"><router-link to="/board/192.168.1.197" @click.native="flushCom">192.168.1.197</router-link></li>
      <li class="sub"><router-link to="/dsp/10.119.84.190" @click.native="flushCom">DSP</router-link></li>
      <li class="sub"><router-link to="/fpga/10.119.84.190" @click.native="flushCom">FPGA</router-link></li> 
      <li><router-link to="/virtualization" @click.native="flushCom">虚拟化率</router-link></li> 
      <!--
      <hr/>
      <li class="sub"><router-link to="/board/192.168.1.147" @click.native="flushCom">192.168.1.147</router-link></li>
      <li class="sub"><router-link to="/board/192.168.1.167" @click.native="flushCom">192.168.1.167</router-link></li>
      <li class="sub"><router-link to="/board/192.168.1.170" @click.native="flushCom">192.168.1.170</router-link></li>
      <li class="sub"><router-link to="/board/192.168.1.126" @click.native="flushCom">192.168.1.126</router-link></li>
      -->    
    </ul>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  methods:{
      flushCom(){
        this.$router.go(0);  
      }
  }
};
 

</script>

<style scope>
#sidebar {
  width: 15%;
  background-color: rgb(21, 23, 28);
  float: left;
  height: 100%;
  position: fixed;
}
#sidebar img {
  width: 100%;
  text-align: center;
  height: 50px;
}
#sidebar ul li a {
  box-sizing: border-box;
  display: block;
  width: 100%;
  color: rgb(217, 222, 237);
  height: 75px;
  line-height: 75px;
  text-align: center;
  font-size: 22px;
}


#sidebar .sub a {
  box-sizing: border-box;
  display: block;
  width: 100%;
  color: rgb(217, 222, 237);
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}


#sidebar ul li a:hover {
  background-color: rgb(44, 46, 51);
  border-right: rgb(217, 222, 237) solid 5px;
}

</style>