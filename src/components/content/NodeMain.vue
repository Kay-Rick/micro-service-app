<template>
  <div id="node_main">
    <div class="nav">
      <div class="type">Nodes</div>
      <span>{{ nodeNum }} total</span>
    </div>
    <hr>
    <div class="node">
      <ul>
        <li v-for="(item, index) in nodeList" :key="index">
          <router-link :to="{path:'/nodeInstance/' + item.id}">
            <div class="node_header">
              <span class="health">
                <img v-if="item.health == 1" :src="imgList[1].url" alt="" />
                <img v-else :src="imgList[0].url" alt="" />
              </span>
              <span class="node_name"> {{item.nodeName}} </span>
            </div>
            <div class="node_info">
              <span class="leader">{{item.leaderInfo}}</span>
              <span class="instance">{{ item.serviceNum }} Service</span>
              <span class="ip">
                <img src="../../assets/images/wangluo.svg" alt="" />
                {{item.ip}}
              </span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
		<p>{{counter}}</p>
		<!-- <button @click="refreshTest">点击</button> -->
  </div>
</template>

<script>
import {request} from '../../network/request';

export default {
	name: "nodeMain",
	data() {
		return {
			nodeList: [
				{
					id: 1,
					nodeNum: 1,
					nodeName: "PC",
					leaderInfo: "Leader",
					serviceNum: 1,
					ip: "192.168.1.181",
					health: 1,
				}
			],
			imgList: [
				{
					id: 0,
					url: require('../../assets/images/cuo.svg')
				},
				{
					id: 1,
					url: require('../../assets/images/dui.svg')
				}
			],
			counter: 1,
			timer: null
		}
	},

	computed: {
		nodeNum: function() {
			return this.nodeList.length
		}
	},

	methods: {
		refreshTest() {
			// request({
			// 	url: "/hello/test",
			// 	method: "get",
			// }).then((res) => {
			// 		console.log(res);
			// 		this.counter = res[0]
			// }).catch((err) => {
			// 		console.log(err);
			// });
		}
	},
	mounted() {
		this.timer = setInterval(() => {
			this.refreshTest()
		}, 2000);
	},
	beforeDestroy() {
		clearInterval(this.timer);
	}
};
</script>

<style scope>
#node_main {
  box-sizing: border-box;
	padding-top: 20px;
  padding-left: 50px;
  height: 100%;
}

#node_main .nav>.type {
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

#node_main hr {
	color: rgb(222, 226, 231);
}

#node_main .nav span {
	font-size: 16px;
	color: rgb(97, 104, 116);
}

#node_main .node ul li a {
	box-sizing: border-box;
	display: block;
	height: 85px;
	border-bottom: rgb(222, 226, 231) 2px solid;
}

#node_main .node_header>span {
	display: inline-block;
	padding: 8px;
	box-sizing: border-box;
	height: 40px;
	line-height: 40px;
	text-align: center;
}

#node_main .node_name {
	font-size: 18px;
	font-weight: 700;
}


#node_main .node_info>span {
	display: inline-block;
	padding: 8px;
	box-sizing: border-box;
	height: 40px;
	line-height: 30px;
	text-align: center;
	color: #a9adb5;
}

#node_main .node_info .leader {
	background-color: #ebeef1;
	height: 20px;
	margin: 0;
	padding: 0 8px;
	line-height: 20px;
}

#node_main .node_header .health {
	width: 30px;
	text-align: center;
	padding: 0;
	height: 30px;
	line-height: 30px;
	padding-bottom: 5px;
}

#node_main .node_header .health img {
	width: 18px;
	text-align: center;
	padding: 0;
	height: 20px;
	line-height: 20px;
}

#node_main .node_info .ip img {
	width: 20px;
	text-align: center;
}
</style>