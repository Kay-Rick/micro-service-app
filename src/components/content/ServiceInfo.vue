<template>
  <div id="service_info">
    <div class="main_content">
      <a class="back" href="#service"> &lt; All Services</a>
      <div class="nav">
        <div class="type">{{serviceName}}</div>
      </div>
      <hr />
      <div class="nav">
        <div class="type instance_color">Instances</div>
      </div>
      <hr />
      <div class="service">
        <ul>
          <li v-for="(item, index) in displayInfoList" :key="index">
            <router-link :to="{path:'/serviceInstance/' + item.serviceName + '/' +item.serviceID}">
              <div class="service_header">
                <span class="service_name">{{item.serviceID}}</span>                  
              </div>
              <div class="service_info">               
                <span class="service_check">
                  <span class="service_check_pic">
                    <img v-if="item.firstIcon == 0" src="../../assets/images/cuo.svg" alt="" />
                    <img v-else-if="item.firstIcon == 1" src="../../assets/images/dui.svg" alt="">
                    <img v-else-if="item.firstIcon == 2" src="../../assets/images/consul.svg" alt="">
                  </span>
                  {{item.firstItem}}
                </span>
                <span class="node_check">
                  <span class="node_check_pic">
                    <img v-if="item.secondIcon == 1" src="../../assets/images/dui.svg" alt="" />
                    <img v-else-if="item.secondIcon == 0" src="../../assets/images/cuo.svg" alt="" />
                  </span>
                  {{item.secondItem}}
                </span>
                <span class="node_pc">
                  <span class="node_check_pic">
                    <img src="../../assets/images/jiedian.svg" alt="" />
                  </span>
                  {{item.thirdItem}}
                </span>
                <span class="ip_addr">
                  <span class="ip_addr_pic">
                    <img src="../../assets/images/wangluo.svg" alt="" />
                  </span>
                  {{item.fourthItem}}
                </span>
                <span v-if="!isConsul" class="service_protocol">
                  <span class="service_protocol_pic">
                    <img src="../../assets/images/xieyi.svg" alt="" />
                  </span>
                  {{item.tag}}
                </span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {request} from "../../network/request";

export default {
  
  name: "serviceInfo",
  data() {
    return {
      serviceName: this.$route.params.name,
      instanceList: [],
      displayInfoList: [],
      isConsul: false,
      imgList: [
        {
          id: 0,
          url: require("../../assets/images/cuo.svg"),
        },
        {
          id: 1,
          url: require("../../assets/images/dui.svg"),
        },
        {
          id: 2,
          url: require("../../assets/images/consul.svg")
        }
      ],
    };
  },

  methods: {
    /**
     * 检查是否为Consul
     */
    checkConsul() {
      if (this.instanceList[0].Checks.length == 1) {
        this.isConsul = true;
        return true;
      }
      else {
        return false;
      }
    },
    test() {
      this.displayInfo();
      console.log(this.displayInfoList);
    },

    /**
     * 对页面中将要展示的数据进行封装
     */
    displayInfo() {
      this.displayInfoList=[];
      if (this.checkConsul()) {
        for (let i = 0; i < this.instanceList.length; i++) {
          let firstIconId, firstItemContent, secondIconId, secondItemContent, thirdItemContent, fourthItemContent;
          firstIconId = 2;
          firstItemContent = "No service checks";
          if (this.instanceList[i].Checks[0].CheckID == "serfHealth" 
              && this.instanceList[i].Checks[0].Status == "passing") {
            secondIconId = 1;
            secondItemContent = "All node checks passing";
          }
          else {
            secondIconId = 0;
            secondItemContent = "All node checks failed";
          }
          thirdItemContent = this.instanceList[i].Checks[0].Node;
          if (this.instanceList[i].Service.Address == "") {
            fourthItemContent = "127.0.0.1:" + this.instanceList[i].Service.Port;
          }
          else {
            fourthItemContent = this.instanceList[i].Service.Address + ":" + this.instanceList[i].Service.Port;
          }
          let itemObj = {
            id: i,
            serviceName: this.instanceList[i].Service.Service,
            serviceID: this.instanceList[i].Service.ID,
            firstIcon: firstIconId,
            firstItem: firstItemContent,
            secondIcon: secondIconId,
            secondItem: secondItemContent,
            thirdItem: thirdItemContent,
            fourthItem: fourthItemContent
          };
          this.displayInfoList.push(itemObj);
        }
      }
      else {
         for (let i = 0; i < this.instanceList.length; i++) {
          let firstIconId, firstItemContent, secondIconId, secondItemContent, thirdItemContent, fourthItemContent, tagInfo;
          if (this.instanceList[i].Checks[1].Status == "passing") {
            firstIconId = 1;
            firstItemContent = "All service checks passing";
          }
          else {
            firstIconId = 0;
            firstItemContent = "All service checks failed";
          }

          if (this.instanceList[i].Checks[0].CheckID == "serfHealth" 
              && this.instanceList[i].Checks[0].Status == "passing") {
            secondIconId = 1;
            secondItemContent = "All node checks passing";
          }
          else {
            secondIconId = 0;
            secondItemContent = "All node checks failed";
          }

          thirdItemContent = this.instanceList[i].Checks[0].Node;
          if (this.instanceList[i].Service.Address == "") {
            fourthItemContent = "127.0.0.1:" + this.instanceList[i].Service.Port;
          }
          else {
            fourthItemContent = this.instanceList[i].Service.Address + ":" + this.instanceList[i].Service.Port;
          }
          tagInfo = this.instanceList[i].Service.Tags;
          let itemObj = {
            id: i,
            serviceName: this.instanceList[i].Service.Service,
            serviceID: this.instanceList[i].Service.ID,
            firstIcon: firstIconId,
            firstItem: firstItemContent,
            secondIcon: secondIconId,
            secondItem: secondItemContent,
            thirdItem: thirdItemContent,
            fourthItem: fourthItemContent,
            tag: tagInfo
          };
          this.displayInfoList.push(itemObj);
        }
      }
    }
  },


  created() {
    request({
      url: "/services/"+ this.serviceName + "/instance",
      method: "get",
    })
      .then((res) => {
        this.instanceList = res.data;
        console.log(this.instanceList);
        this.displayInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  mounted() {
    this.timer = setInterval(() => {
      request({
      url: "/services/"+ this.serviceName + "/instance",
      method: "get",
    })
      .then((res) => {
        this.instanceList = res.data;
        console.log(this.instanceList);
        this.displayInfo();
      })
      .catch((err) => {
        console.log(err);
      });
    }, 500);
    
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },

};
</script>

<style scope>
#service_info {
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 50px;
  height: 100%;
}

#service_info .main_content a {
  font-size: 16px;
}

#service_info .main_footer {
  color: black;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 20px;
}

#service_info .nav > .type {
  box-sizing: border-box;
  display: inline-block;
  font-size: 30px;
  margin: 10px 10px 0 0;
  text-align: left;
  height: 40px;
  line-height: 40px;
  font-weight: 800;
}

#service_info .main_content .instance_color {
  box-sizing: border-box;
  display: inline-block;
  font-size: 18px;
  padding: 0 10px;
  height: 40px;
  line-height: 36px;
  padding-bottom: 5px;
  border-bottom: rgb(21, 99, 255) 2px solid;
  color: rgb(21, 99, 255);
}

#service_info hr {
  color: rgb(222, 226, 231);
}

#service_info .nav span {
  font-size: 16px;
  color: rgb(97, 104, 116);
}

#service_info .service ul li a {
  box-sizing: border-box;
  display: block;
  height: 80px;
  border-bottom: rgb(222, 226, 231) 2px solid;
}

#service_info .service_header > span {
  display: inline-block;
  padding: 8px;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

#service_info .service_name {
  font-size: 18px;
  font-weight: 700;
}

#service_info .service_info > span {
  display: inline-block;
  padding: 8px;
  box-sizing: border-box;
  height: 40px;
  line-height: 30px;
  text-align: center;
}

#service_info .service_check_pic img {
  width: 20px;
  text-align: center;
}

#service_info .node_check_pic img {
  width: 20px;
  text-align: center;
}

#service_info .node_pc_pic img {
  width: 20px;
  text-align: center;
}

#service_info .ip_addr_pic img {
  width: 20px;
  text-align: center;
}

#service_info .service_protocol_pic img {
  width: 20px;
  text-align: center;
}
</style>