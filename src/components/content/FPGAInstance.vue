<template>
  <div id="fpga_instance">
  <div style="fontSize:30px; text-align:center; padding-top:5px" >西安空间无线电技术研究所边缘云平台</div>
    <el-row>
      <el-col :span="12" style = "padding-top: 0px"
        ><div
          id="main1"
          style="width: 500px; height: 300px"
        ></div
      ></el-col>
      <el-col :span="12"
        ><div id="main2" style="width: 500px; height: 300px"></div
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
      this.option1 && this.myChart1.setOption(this.option1);
      this.option2 && this.myChart2.setOption(this.option2);
    },

    updateDeviceFPGAStatus() {
      request({
        url: "/router/devicefpgastatus?ip=" + this.ip,
        method: "get",
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.option1.series[0].data.shift()
          this.option2.series[0].data.shift()
          this.option1.series[0].data.push(res.data.temperature)
          this.option2.series[0].data.push(res.data.voltage)
          this.myChart1.setOption(this.option1)
          this.myChart2.setOption(this.option2)
        } else {
          this.$message({
            type: "error",
            message: res.response.error,
          });
        }
      });
    },

    updateDeviceFPGAStatus() {
      request({
        url: "/router/devicefpgastatus?ip=" + this.ip,
        method: "get",
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.option1.series[0].data.shift()
          this.option2.series[0].data.shift()
          this.option1.series[0].data.push(res.data.temperature)
          this.option2.series[0].data.push(res.data.voltage)
          this.myChart1.setOption(this.option1)
          this.myChart2.setOption(this.option2)
        } else {
          this.$message({
            type: "error",
            message: res.response.error,
          });
        }
      });
    },
  },

  created() {
    console.log(this.$route)
    this.updateDeviceDSPStatus()
  },
  mounted() {
    this.myEcharts();
    this.timer1 = setInterval(() => {
      this.updateDeviceFPGAStatus();
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.timer1);
  },
  data() {
    return {
      myChart1:null,
      myChart2:null,
      ip: this.$route.params.ip,
      dialogTableVisible: false,
      dialogFormVisible: false,
      option1: {
        // colorBy: "red",
        textStyle: {
          fontFamily: "Arial",
        },
        title: {
          left: "center",
          text: "温度",
          y: "bottom",
          textStyle: {
            fontSize: 16,
            fontFamily: "Arial",
            fontWeight: "normal",
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [1, 2, 3, 4, 5],
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          axisLabel: {
            formatter: '{value} °C'
          },
        },
        series: [
          {
            data: [0, 0, 0, 0, 0],
            type: "line",
            areaStyle: {
              color: "#fac858",
            },
            lineStyle: {
              color: "#fac858",
            },
            itemStyle: {
              color: "#fac858", // 点边线的颜色
            },
          },
        ],
      },
      option2: {
        // colorBy: "red",
        textStyle: {
          fontFamily: "Arial",
        },
        title: {
          left: "center",
          text: "电压",
          y: "bottom",
          textStyle: {
            fontSize: 16,
            font: "Arial",
            fontWeight: "normal",
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [1, 2, 3, 4, 5],
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 20,
          axisLabel: {
            formatter: '{value} V'
          },
        },
        series: [
          {
            data: [0, 0, 0, 0, 0],
            type: "line",
            areaStyle: {
              color: "#91cc75",
            },
            lineStyle: {
              color: "#91cc75",
            },
            itemStyle: {
              color: "#91cc75", // 点边线的颜色
            },
          },
        ],
      },
    };
  },
};
</script>

<style scope>
#board_instance {
  box-sizing: border-box;
  padding-top: 0px;
  padding-left: 15px;
  height: 100%;
}

#board_instance .top_nav {
  position: relative;
}

#board_instance .top_nav > .type {
  box-sizing: border-box;
  display: inline-block;
  font-size: 30px;
  margin: 0 1px 1px 0;
  text-align: left;
  height: 40px;
  line-height: 40px;
  font-weight: 540;
}

#board_instance .top_nav button {
  font-size: 16px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  float: right;
  position: absolute;
  right: 150px;
  top: 5px;
}

#board_instance hr {
  color: rgb(222, 226, 231);
}

#board_instance .pic img {
  width: 18px;
  text-align: center;
}
</style>