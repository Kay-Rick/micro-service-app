<template>
  <div id="service_main">
    <div class="nav">
      <div class="type">Services</div>
      <span style="padding-left:20px">{{ serviceNum }} total</span>
    </div>
    <hr />
    <div class="service">
      <ul>
        <li v-for="(item, index) in serviceList" :key="index">
          <router-link :to="{path:'/serviceInfo/' + item.Name }">
            <div class="service_header">
              <span class="health">
                <img :src="imgURL(item.ChecksCritical)" alt="" />
              </span>
              <span class="service_name">{{ item.Name }}</span>
            </div>
            <div class="service_info">
              <span class="instance">{{ item.InstanceCount }}instance</span>
              <span class="protocol">
                <img src="../../assets/images/xieyi.svg" alt="" />
                {{ item.Tags }}
              </span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {request} from "../../network/request";

export default {
  name: "serviceMain",
  data() {
    return {
      
      serviceList: [],
      imgList: [
        {
          id: 0,
          url: require("../../assets/images/cuo.svg"),
        },
        {
          id: 1,
          url: require("../../assets/images/dui.svg"),
        },
      ],
    };
  },

  created() {
   request({
      url: "/v1/allservices",
      method: "get",
    }).then((res) => {
        console.log(res)
        this.serviceList = res.data
    }).catch((err) => {
        console.log(err);
    }); 
  },

  mounted() {
    this.timer = setInterval(() => {
      request({
      url: "/v1/allservices",
      method: "get",
    }).then((res) => {
        console.log(res)
        this.serviceList = res.data
    }).catch((err) => {
        console.log(err);
    }); 
    }, 500);
    
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },


  computed: {
    imgURL() {
      return health => {
        if (health > 0)
          return this.imgList[0].url
        else 
          return this.imgList[1].url
      }
    },

    serviceNum: function () {
      return this.serviceList.length;
    },
  },
};
</script>

<style scope>
#service_main {
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 50px;
  height: 100%;
}

#service_main .nav > .type {
  box-sizing: border-box;
  display: inline-block;
  width: 125px;
  font-size: 30px;
  margin: 10px 10px 0 0;
  text-align: left;
  height: 40px;
  line-height: 40px;
  font-weight: 800;
}

#service_main hr {
  color: rgb(222, 226, 231);
}

#service_main .nav span {
  font-size: 16px;
  color: rgb(97, 104, 116);
}

#service_main .service ul li a {
  box-sizing: border-box;
  display: block;
  height: 85px;
  border-bottom: rgb(222, 226, 231) 2px solid;
}

#service_main .service_header > span {
  display: inline-block;
  padding: 8px;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

#service_main .service_name {
  font-size: 18px;
  font-weight: 700;
}

#service_main .service_info > span {
  display: inline-block;
  padding: 8px;
  box-sizing: border-box;
  height: 40px;
  line-height: 30px;
  text-align: center;
  color: #a9adb5;
}

#service_main .service_header .health {
  width: 30px;
  text-align: center;
  padding: 0;
  height: 30px;
  line-height: 30px;
  padding-bottom: 5px;
}

#service_main .service_header .health img {
  width: 18px;
  text-align: center;
  padding: 0;
  height: 20px;
  line-height: 20px;
}

#service_main .service_info .protocol {
  text-align: center;
  padding: 0;
  height: 30px;
  line-height: 30px;
  padding-bottom: 5px;
}

#service_main .service_info .protocol img {
  width: 18px;
  text-align: center;
  padding: 0;
  height: 20px;
  line-height: 20px;
}
</style>