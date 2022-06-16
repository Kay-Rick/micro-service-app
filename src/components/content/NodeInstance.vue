<template>
  <div id="node_instance">
    <div class="main_content">
      <router-link class="back" to="/node"> &lt; All Nodes</router-link>
      <div class="top_nav">
        <div class="type">
          {{nodeName}}
        </div>
        <span>{{ip}}</span>
      </div>
      <hr />
      <div class="nav">
        <div class="type instance_color">Health Checks</div>
      </div>
      <hr />
      <div class="node">
        <ul>
          <li>
            <span class="node_pic">
              <img :src="imgURL(health)" alt="" />
            </span>
            <span>Serf Health Status</span>
            <br />
            <div class="node_box">
              <div class="box1">
                <span>NodeName</span>
                <br />
                <span>{{nodeName}}</span>
              </div>
              <div class="box2">
                <span>CheckID</span>
                <br />
                <span>{{checkID}}</span>
              </div>
              <div class="box3">
                <span>Type</span>
                <br />
                <span>{{type}}</span>
              </div>
              <div class="box4">
                <span>Notes</span>
                <br />
                <span>{{noteInfo}}</span>
              </div>
            </div>
            <div class="node_output">
              <span>Output</span>
              <br />
              <p>{{output}}</p>
            </div>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<script>

import {request} from '../../network/request';

export default {
  name: "nodeInstance",
	data() {
		return {
			nodeName: "PC",
			ip: "192.168.1.181",
			health: 1,
			checkID: "serfHealth",
			type: "serf",
			noteInfo: "",
			output: "Agent alive and reachable",
			imgList: [
				{
					id: 0,
					url: require('../../assets/images/cuo.svg')
				},
				{
					id: 1,
					url: require('../../assets/images/dui.svg')
				}
			]
		}
	},

	computed: {
		imgURL() {
			return health => {
				if (health == 0)
					return this.imgList[0].url;
				else 
					return this.imgList[1].url;
			}
		}
	},

	created() {
	}
};
</script>

<style scope>
#node_instance {
	box-sizing: border-box;
	padding-top: 20px;
	padding-left: 50px;
	height: 100%;
}

#node_instance .main_content a {
	font-size: 16px;
}

#node_instance .main_footer {
	color: black;
	font-size: 16px;
	height: 50px;
	line-height: 50px;
	width: 100%;
	text-align: center;
	position: absolute;
	bottom: 20px;
}

#node_instance .top_nav>.type {
	box-sizing: border-box;
	display: inline-block;
	font-size: 30px;
	margin: 10px 10px 0 0;
	text-align: left;
	height: 40px;
	line-height: 40px;
	font-weight: 800;
}

#node_instance .top_nav span {
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

#node_instance .main_content .instance_color {
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

#node_instance .main_info {
	width: 100%;
	height: 70px;
}

#node_instance .main_info>div {
	width: 15%;
	height: 70px;
	float: left;
}

#node_instance .main_info>div span {
	padding-top: 5px;
	height: 30px;
	line-height: 30px;
	font-size: 16px;
	display: inline-block;
	text-align: center;
}

#node_instance hr {
	color: rgb(222, 226, 231);
}

#node_instance .nav span {
	font-size: 16px;
	color: rgb(97, 104, 116);
}

#node_instance .node ul li {
	box-sizing: border-box;
	display: block;
	height: 170px;
	margin: 10px 0;
	border-bottom: rgb(222, 226, 231) 2px solid;
	border-top: rgb(222, 226, 231) 2px solid;
	border-left: #59ad4a 4px solid;
}

#node_instance .node .node_pic {
	margin: 10px;
	display: inline-block;
}

#node_instance .node .node_pic img{
	width: 18px;
	text-align: center;
}

#node_instance .node ul li span:nth-child(2) {
	font-size: 16px;
	font-weight: 700;
}

#node_instance .node .node_box {
	box-sizing: border-box;
	height: 60px;
	padding-left: 40px;
	display: flex;
}

#node_instance .node .node_box div {
	box-sizing: border-box;
	height: 60px;
	width: 250px;
	background-color: #fff;
}

#node_instance .node .node_box div span {
	display: inline-block;
	font-size: 16px;
	padding-top: 5px;
	color: #a9adb5;
}

#node_instance .node .node_box div span:first-child {
	color: black;
	font-weight: 700;
}

#node_instance .node .node_output {
	box-sizing: border-box;
	height: 40px;
	padding-left: 40px;
	margin-top: 10px;
	font-size: 16px;
	font-weight: 700;
}

#node_instance .node .node_output p {
	font-size: small;
	font-weight: normal;
	background-color: #f7f8fa;
	height: 30px;
	line-height: 30px;
}

</style>