<template>
  <div id="monitor_instance">
    <div class="main_content">
      <div id="main" style="width: 600px; height: 400px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "monitorInstance",
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      var option = {
        // colorBy: "red",
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100
        },
        series: [
          {
            data: [82, 92, 91, 34, 29],
            type: "line",
            areaStyle: {},
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.myEcharts();
    this.timer = setInterval(() => {

    }, 2000);
  },
	beforeDestroy() {
		clearInterval(this.timer);
	}
};
</script>

<style scope>
</style>