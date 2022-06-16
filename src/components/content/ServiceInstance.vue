<template>
  <div id="service_instance">
    <div class="main_content">
      <router-link class="back" to="/service">
        &lt; All Services / Service( {{serviceInstanceID}} )
      </router-link>
      <div class="top_nav">
        <div class="type">
          {{serviceInstanceID}}
        </div>
        <span>{{ip}}</span>
      </div>
      <hr />
      <div class="main_info">
        <div>
          <span>
            <b>Service Name</b>
          </span>
          <br />
          <span>{{serviceInstanceID}}</span>
        </div>
        <div>
          <span>
            <b>Node Name</b>
          </span>
          <br />
          <span>{{nodeName}}</span>
        </div>
      </div>
      <hr />
      <div class="nav">
        <div class="type instance_color">Health Checks</div>
      </div>
      <hr>
      <div class="service">
        <ul>
          <li>
            <span class="service_pic">
              <img v-if="status1" src="../../assets/images/dui.svg" alt="" />
              <img v-else src="../../assets/images/cuo.svg" alt="" />
            </span>
            <span>Serf Health Status</span>
            <br />
            <div class="service_box">
              <div class="box1">
                <span>NodeName</span>
                <br />
                <span> {{displayInfoList[0].nodeName}} </span>
              </div>
              <div class="box2">
                <span>CheckID</span>
                <br />
                <span>{{displayInfoList[0].checkID}}</span>
              </div>
              <div class="box3">
                <span>Type</span>
                <br />
                <span>{{displayInfoList[0].type}}</span>
              </div>
              <div class="box4">
                <span>Notes</span>
                <br />
                <span>{{displayInfoList[0].notes}}</span>
              </div>
            </div>
            <div class="service_output">
              <span>Output</span>
              <br />
              <p>{{displayInfoList[0].output}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="node">
        <ul>
          <li>
            <span class="node_pic">
              <img v-if="status2" src="../../assets/images/dui.svg" alt="" />
              <img v-else src="../../assets/images/cuo.svg" alt="" />
            </span>
            <span>Service '{{serviceInstanceName}}' check</span>
            <br />
            <div class="node_box">
              <div class="box1">
                <span>ServiceName</span>
                <br />
                <span>{{displayInfoList[1].serviceName}}</span>
              </div>
              <div class="box2">
                <span>CheckID</span>
                <br />
                <span>{{displayInfoList[1].checkID}}</span>
              </div>
              <div class="box3">
                <span>Type</span>
                <br />
                <span>{{displayInfoList[1].type}}</span>
              </div>
              <div class="box4">
                <span>Notes</span>
                <br />
                <span></span>
              </div>
              <div class="box5">
                <span>Node</span>
                <br />
                <span>{{displayInfoList[1].node}}</span>
              </div>
            </div>
            <div class="node_output">
              <span>Output</span>
              <br />
              <p>{{displayInfoList[1].output}}</p>
            </div>
          </li>
        </ul>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import {request} from "../../network/request";

export default {
  name: "serviceInstance",
  data() {
    return {
      serviceInstanceName: this.$route.params.name,
      serviceInstanceID: this.$route.params.id,
      nodeName: "",
      instanceList: [],
      status1: false,
      status2: false,
      displayInfoList: [
        {
          nodeName: "",
          checkID: "",
          type: "",
          notes: "",
          output: ""
        },
        {
          serviceName: "",
          checkID: "",
          type: "",
          notes: "",
          node: "",
          output: ""
        }
      ],
      ip: "",
    }
  },

  methods: {
    displayInfo() {
      for (let i = 0; i < this.instanceList.length; i++) {
        if (this.instanceList[i].Service.ID == this.serviceInstanceID) {
          this.ip = this.instanceList[i].Service.Address;
          this.nodeName = this.instanceList[i].Checks[0].Node;
          this.displayInfoList[0].nodeName = this.instanceList[i].Checks[0].Node;
          this.displayInfoList[0].checkID = this.instanceList[i].Checks[0].CheckID;
          this.displayInfoList[0].type = this.instanceList[i].Checks[0].Type == "" ? "serf" : this.instanceList[i].Checks[0].Type;
          this.displayInfoList[0].notes = this.instanceList[i].Checks[0].Notes == "" ? "-" : this.instanceList[i].Checks[0].Notes;
          this.displayInfoList[0].output = this.instanceList[i].Checks[0].Output;

          this.displayInfoList[1].serviceName = this.instanceList[i].Service.Service;
          this.displayInfoList[1].checkID = this.instanceList[i].Checks[1].CheckID;
          this.displayInfoList[1].type = this.instanceList[i].Checks[1].Type == "" ? "serf" : this.instanceList[i].Checks[1].Type;
          this.displayInfoList[1].notes = this.instanceList[i].Checks[1].Notes == "" ? "-" : this.instanceList[i].Checks[1].Notes;
          this.displayInfoList[1].node = this.instanceList[i].Checks[1].Node;
          this.displayInfoList[1].output = this.instanceList[i].Checks[1].Output;
          console.log("Success");
          if (this.instanceList[i].Checks[0].Status == "passing") {
            this.status1 = true;
            // CSS TODO
          }
          if (this.instanceList[i].Checks[1].Status == "passing") {
            this.status2 = true;
          }
          break;
        }
      }
      

    }
  },
  created() {
    request({
      url: "/services/"+ this.serviceInstanceName + "/instance",
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
      url: "/services/"+ this.serviceInstanceName + "/instance",
      method: "get",
    })
      .then((res) => {
        this.instanceList = null;
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
#service_instance {
	box-sizing: border-box;
	padding-top: 20px;
	padding-left: 50px;
	height: 100%;
}

#service_instance .main_content a {
	font-size: 16px;
}

#service_instance .top_nav>.type {
	box-sizing: border-box;
	display: inline-block;
	font-size: 30px;
	margin: 10px 10px 0 0;
	text-align: left;
	height: 40px;
	line-height: 40px;
	font-weight: 800;
}

#service_instance .top_nav span {
	color: rgb(21, 99, 255);
	display: block;
	font-size: 14px;
	text-align: right;
	height: 30px;
	line-height: 30px;
	padding-top: 20px;
	padding-right: 20px;
	float: right;
}

#service_instance .main_content .instance_color {
	box-sizing: border-box;
	display: inline-block;
	font-size: 18px;
	padding: 0 10px;
	height: 40px;
	line-height: 36px;
	padding-bottom: 5px;
	border-bottom: rgb(21, 99, 255) 3px solid;
	color: rgb(21, 99, 255);
}

#service_instance .main_info {
	width: 100%;
	height: 70px;
  display: flex;
}

#service_instance .main_info > div {
	width: 15%;
	height: 70px;
  width: 300px;
}

#service_instance .main_info > div span {
	padding-top: 5px;
	height: 30px;
	line-height: 30px;
	font-size: 16px;
	display: inline-block;
	text-align: center;
}

#service_instance hr {
	color: rgb(222, 226, 231);
}

#service_instance .nav span {
	font-size: 16px;
	color: rgb(97, 104, 116);
}

#service_instance .service ul li {
	box-sizing: border-box;
	display: block;
	height: 180px;
	margin: 10px 0;
	border-bottom: rgb(222, 226, 231) 2px solid;
	border-top: rgb(222, 226, 231) 2px solid;
	/* border-left: #b42332 4px solid; */
}

#service_instance .service .service_pic {
	margin: 10px;
	display: inline-block;
}

#service_instance .service ul li span:nth-child(2) {
	font-size: 16px;
	font-weight: 700;
}

#service_instance .service .service_box {
	box-sizing: border-box;
	height: 60px;
	padding-left: 40px;
	display: flex;
}

#service_instance .service .service_box div {
	box-sizing: border-box;
	height: 60px;
	width: 250px;
	background-color: #fff;
}

#service_instance .service .service_box div span {
	display: inline-block;
	font-size: 16px;
	padding-top: 5px;
	color: #a9adb5;
}

#service_instance .service_pic img {
	width: 20px;
	text-align: center;
}

#service_instance .service .service_box div span:first-child {
	color: black;
	font-weight: 700;
}

#service_instance .service .service_output {
	box-sizing: border-box;
	height: 40px;
	padding-left: 40px;
	margin-top: 10px;
	font-size: 16px;
	font-weight: 700;
}

#service_instance .service .service_output p {
	font-size:small;
	font-weight: normal;
	background-color: #f7f8fa;
	height: 30px;
	line-height: 30px;
}


#service_instance .node ul li {
	box-sizing: border-box;
	display: block;
	height: 180px;
	margin: 10px 0;
	border-bottom: rgb(222, 226, 231) 2px solid;
	border-top: rgb(222, 226, 231) 2px solid;
	/* border-left: #59ad4a 4px solid; */
}

#service_instance .node .node_pic {
	margin: 10px;
	display: inline-block;
}

#service_instance .node ul li span:nth-child(2) {
	font-size: 16px;
	font-weight: 700;
}

#service_instance .node .node_box {
	box-sizing: border-box;
	height: 60px;
	padding-left: 40px;
	display: flex;
}

#service_instance .node .node_box div {
	box-sizing: border-box;
	height: 60px;
	width: 250px;
	background-color: #fff;
}

#service_instance .node .node_box div span {
	display: inline-block;
	font-size: 16px;
	padding-top: 5px;
	color: #a9adb5;
}

#service_instance .node_pic img {
	width: 20px;
	text-align: center;
}

#service_instance .node .node_box div span:first-child {
	color: black;
	font-weight: 700;
}

#service_instance .node .node_output {
	box-sizing: border-box;
	height: 40px;
	padding-left: 40px;
	margin-top: 10px;
	font-size: 16px;
	font-weight: 700;
}

#service_instance .node .node_output p {
	font-size: small;
	font-weight: normal;
	background-color: #f7f8fa;
	height: 30px;
	line-height: 30px;
}

</style>