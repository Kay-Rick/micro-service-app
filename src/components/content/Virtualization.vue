<template>
  <div id="virtualization">
    <div style="fontSize:30px; text-align:center; padding-top:10px" >西安空间无线电技术研究所边缘云平台</div>
  
    <el-row>
      <el-col :span="12" style="padding-top:4%">
        ><div id="main1" style="width: 500px; height: 300px"></div
      ></el-col>
      <el-col :span="12" style="padding-top:4%"
        ><div id="main2" style="width: 500px; height: 300px"></div
      ></el-col>
    </el-row>
    <el-row style="padding-top:5%">
      <el-col :span="8"
        ><div id="main3" style="width: 500px; height: 300px"></div
      ></el-col>
      <el-col :span="8"
        ><div id="main4" style="width: 500px; height: 300px"></div
      ></el-col>
      <el-col :span="8"
        ><div id="main5" style="width: 500px; height: 300px"></div
      ></el-col>
    </el-row>
    
  </div>
</template>

<script>
import { request } from "../../network/request";
export default {
  name: "fpgaInstance",
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart1 = this.$echarts.init(document.getElementById("main1"));
      this.myChart2 = this.$echarts.init(document.getElementById("main2"));
      this.myChart3 = this.$echarts.init(document.getElementById("main3"));
      this.myChart4 = this.$echarts.init(document.getElementById("main4"));
      this.myChart5 = this.$echarts.init(document.getElementById("main5"));
      this.option1 && this.myChart1.setOption(this.option1);
      this.option2 && this.myChart2.setOption(this.option2);
      this.option3 && this.myChart3.setOption(this.option3);
      this.option4 && this.myChart4.setOption(this.option4);
      this.option5 && this.myChart5.setOption(this.option5);
    },
  },

  created() {
  },
  mounted() {
    this.myEcharts();
  },
  beforeDestroy() {
    clearInterval(this.timer1);
  },
  data() {
    return {
      myChart1: null,
      myChart2: null,
      myChart3: null,
      option1: {
        title: {
          text: "ARM虚拟化率",
          subtext: "百分比: 97.5%",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 97.5, name: "可复用资源",itemStyle: {color:'#5470c6'} },
              { value: 2.5, name: "常占资源",itemStyle: {color:'#75bedc'} },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      option2: {
        title: {
          text: "DSP虚拟化率",
          subtext: "百分比: 87.5%",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 28, name: "可重载核心数",itemStyle: {color:'#8D8DAA'} },
              { value: 4, name: "常驻核心数",itemStyle: {color:'#DFDFDE'} },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      option3: {
        title: {
          text: "FPGA LUT虚拟化率",
          subtext: "百分比: 83%",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 83, name: "LUT可重构",itemStyle: {color:'#DF7861'} },
              { value: 17, name: "LUT不可重构",itemStyle: {color:'#ECB390'} },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      option4: {
        title: {
          text: "FPGA DSP Slice虚拟化率",
          subtext: "百分比: 84%",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 84, name: "DSP Slice可重构",itemStyle: {color:'#FFA500'} },
              { value: 16, name: "DSP Slice不可重构",itemStyle: {color:'#FFE5B4'} },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      option5: {
        title: {
          text: "FPGA BRAM虚拟化率",
          subtext: "百分比: 94%",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 94, name: "BRAM可重构",itemStyle: {color:'#C7D36F'} },
              { value: 6, name: "BRAM不可重构",itemStyle: {color:'#FCF9C6'} },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style scope>
#virtualization {
  box-sizing: border-box;
  padding-top: 0px;  
  padding-left: 0px;
  height: 100%;
}

#virtualization .top_nav {  
  position: relative;
}

#virtualization .top_nav > .type {
  box-sizing: border-box;
  display: inline-block;
  font-size: 30px;
  margin: 0 1px 1px 0;
  text-align: left;
  height: 40px;
  line-height: 40px;
  font-weight: 540;
}

#virtualization .top_nav button {
  font-size: 16px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  float: right;
  position: absolute;
  right: 150px;
  top: 5px;
}

#virtualization hr {
  color: rgb(222, 226, 231);
}

#virtualization .pic img {
  width: 18px;
  text-align: center;
}
</style>