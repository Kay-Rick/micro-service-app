<template>
  <div id="board_instance">
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
    <el-row>
     <el-col :span="12" style = "padding-top: 0px"
        ><div id="main3" style="width: 500px; height: 300px"></div
      ></el-col>
      <el-col :span="12"
        ><div id="main4" style="width: 500px; height: 300px"></div
      ></el-col>
    </el-row>
    <br />
    <div class="main_content">
      <div class="top_nav">
        <div class="type">镜像</div>
        <input
          v-show="false"
          ref="imagefileRef"
          type="file"
          @change="imagefileChange($event)"
        />
        <el-button
          type="warning"
          round
          style="align: center; line-height: 3px"
          @click="uploadImage"
          >upload</el-button
        >
      </div>
      <hr />
      <el-table :data="imageData" style="width: 100%">
        <el-table-column
          prop="repository"
          label="Repository"
          width="180"
        ></el-table-column>
        <el-table-column prop="tag" label="Tag" width="180"> </el-table-column>
        <el-table-column prop="imageid" label="Image ID"> </el-table-column>
        <el-table-column prop="created" label="Created"> </el-table-column>
        <el-table-column prop="size" label="Size"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="start(scope.row, true)" type="text"
              >start</el-button
            >
            <el-button @click="remove(scope.row, true)" type="text"
              >remove</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="Images Detail" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="tdy" :label-width="formLabelWidth">
            <el-switch v-model="form.checked_tdy"></el-switch>
          </el-form-item>
          <el-form-item label="openstdin" :label-width="formLabelWidth">
            <el-switch v-model="form.checked_openstdin"></el-switch>
          </el-form-item>
          <el-form-item label="network" :label-width="formLabelWidth">
            <el-input v-model="form.network" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="cmd" :label-width="formLabelWidth">
            <el-input v-model="form.cmd" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="startImages">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <br />
    <div class="main_content">
      <div class="top_nav">
        <div class="type">容器</div>
        <input
          v-show="false"
          ref="containerfileRef"
          type="file"
          @change="containerfileChange($event)"
        />
        
      </div>
      <hr />
      <template>
        <el-table :data="containerData" style="width: 100%">
          <el-table-column prop="running" label="Health" width="75">
            <template slot-scope="scope">
              <span class="pic" v-if="scope.row.running"
                ><img src="../../assets/images/dui.svg"
              /></span>
              <span class="pic" v-else
                ><img src="../../assets/images/cuo.svg"
              /></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="containerid"
            label="Container ID"
          ></el-table-column>
          <el-table-column prop="imagename" label="Image"></el-table-column>
          <el-table-column prop="cmd" label="Command" width="200">
          </el-table-column>
          <el-table-column prop="created" label="Created"> </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column prop="ports" label="Ports" width="100">
          </el-table-column>
          <el-table-column prop="names" label="Names"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="start(scope.row, false)"
                type="text"
                :disabled="scope.row.running"
                >start</el-button
              >
              <el-button
                @click="stopContainer(scope.row)"
                type="text"
                :disabled="!scope.row.running"
                >stop</el-button
              >
              <el-button
                @click="remove(scope.row, false)"
                type="text"
                :disabled="scope.row.running"
                >remove</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="Images Detail" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="tdy" :label-width="formLabelWidth">
              <el-switch v-model="form.checked_tdy"></el-switch>
            </el-form-item>
            <el-form-item label="openstdin" :label-width="formLabelWidth">
              <el-switch v-model="form.checked_openstdin"></el-switch>
            </el-form-item>
            <el-form-item label="network" :label-width="formLabelWidth">
              <el-input v-model="form.network" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="cmd" :label-width="formLabelWidth">
              <el-input v-model="form.cmd" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="startImages">确 定</el-button>
          </div>
        </el-dialog>
      </template>

      <br />
      <!-- <button @click="getMainInfo('192.168.1.167')">Test</button> -->
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request";
export default {
  name: "boardInstance",
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart1 = this.$echarts.init(document.getElementById("main1"));
      this.myChart2 = this.$echarts.init(document.getElementById("main2"));
      this.myChart3 = this.$echarts.init(document.getElementById("main3"));
      this.myChart4 = this.$echarts.init(document.getElementById("main4"));

      this.option1 && this.myChart1.setOption(this.option1);
      this.option2 && this.myChart2.setOption(this.option2);
      this.option3 && this.myChart3.setOption(this.option3);
      this.option4 && this.myChart4.setOption(this.option4);
    },

    uploadImage() {
      this.$refs.imagefileRef.dispatchEvent(new MouseEvent("click"));
    },
    uploadContainer() {
      this.$refs.containerfileRef.dispatchEvent(new MouseEvent("click"));
    },
    imagefileChange(event) {
      var file = event.target.files[0];
      var allUpExt = ".tar|.zip|.tar.gz|";
      var exname = file.name.substring(file.name.indexOf(".")).toLowerCase();
      if (allUpExt.indexOf(exname + "|") == "-1") {
        this.$message({
          type: "error",
          message: "文件格式不正确",
        });
        return;
      }
      console.log(file.size);
      var fd = new FormData();
      fd.append("imagefile", file);
      request({
        url: "/router/receiveandloadimage?ip=" + this.ip,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: fd,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "镜像上传并提交成功",
            });
          } else {
            this.$message({
              type: "error",
              message: res.response.data.error,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getMainInfo() {
      request({
        url: "/router/getallcontainers?ip=" + this.ip,
        method: "get",
      })
        .then((res) => {
          this.containerData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      request({
        url: "/router/getimages?ip=" + this.ip,
        method: "get",
      })
        .then((res) => {
          this.imageData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    start(row, isImage) {
      console.log(row);
      if (isImage) {
        this.chooseimage = row;
        this.dialogFormVisible = true;
      } else {
        //启动容器
        request({
          url:
            "/router/runcontainer?ip=" +
            this.ip +
            "&containerid=" +
            row.containerid,
          method: "get",
        })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "容器启动成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: res.response.data.error,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    startImages() {
      request({
        url:
          "/router/createandruncontainer?ip=" +
          this.ip +
          "&imageid=" +
          this.chooseimage.imageid,
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
          imagename: this.chooseimage.repository + ":" + this.chooseimage.tag,
          cmd: this.form.cmd.split(" "),
          network: this.form.network,
          tdy: this.form.checked_tdy,
          openstdin: this.form.checked_openstdin,
        },
      })
        .then((res) => {
          if (res.status == 200) {
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "镜像启动容器成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: res.response.data.error,
            });
          }
          console.log(res);
          this.containerData = res;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(this.form);
    },

    remove(row, isImage) {
      var alerttext =
        "此操作将永久删除" +
        (isImage ? "镜像" : "容器") +
        (isImage ? row.repository + ":" + row.tag : row.containerid) +
        "是否继续";
      this.$confirm(alerttext, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        request({
          url:
            "/router/" +
            (isImage
              ? "removeimage?imageid=" + row.imageid
              : "removecontainer?containerid=" + row.containerid) +
            "&ip=" +
            this.ip,
          method: "get",
        })
          .then((res) => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功！",
              });
            } else {
              this.$message({
                type: "error",
                message: res.response.data.error,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },

    stopContainer(row) {
      request({
        url:
          "/router/stopcontainer?ip=" +
          this.ip +
          "&containerid=" +
          row.containerid,
        method: "get",
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "容器停止成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: res.response.error,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateDeviceStatus() {
      request({
        url: "/router/devicestatus?ip=" + this.ip,
        method: "get",
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.option1.series[0].data.shift()
          this.option2.series[0].data.shift()
          this.option3.series[0].data.shift()
          this.option4.series[0].data.shift()
          this.option1.series[0].data.push(res.data.cpuusage)
          this.option2.series[0].data.push(res.data.memoryusage)
          this.option3.series[0].data.push(res.data.temperature)
          this.option4.series[0].data.push(res.data.voltage)
          this.myChart1.setOption(this.option1)
          this.myChart2.setOption(this.option2)
          this.myChart3.setOption(this.option3)
          this.myChart4.setOption(this.option4)
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
    this.getMainInfo();
    this.updateDeviceStatus()
  },
  mounted() {
    this.myEcharts();
    this.timer = setInterval(() => {
      this.getMainInfo();
    }, 500);
    this.timer1 = setInterval(() => {
      this.updateDeviceStatus();
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
  },
  data() {
    return {
      myChart1:null,
      myChart2:null,
      myChart3:null,
      myChart4:null,
      ip: this.$route.params.ip,
      dialogTableVisible: false,
      dialogFormVisible: false,
      chooseimageid: null,
      form: {
        checked_tdy: true,
        checked_openstdin: true,
        network: "",
        cmd: "",
      },
      formLabelWidth: "120px",
      imageData: null,
      containerData: null,
      option1: {
        // colorBy: "red",
        textStyle: {
          fontFamily: "Arial",
        },
        title: {
          left: "center",
          text: "CPU",
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
            formatter: '{value} %'
          },
        },
        series: [
          {
            data: [0, 0, 0, 0, 0],
            type: "line",
            stack: "Total",
            areaStyle: {
              color: "#73c0de",
            },
            lineStyle: {
              color: "#73c0de",
            },
            itemStyle: {
              color: "#73c0de", // 点边线的颜色
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
          text: "Memory",
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
            formatter: '{value} %'
          },
        },
        series: [
          {
            data: [0, 0, 0, 0, 0],
            type: "line",
            areaStyle: {
              color: "#ee6666",
            },
            lineStyle: {
              color: "#ee6666",
            },
            itemStyle: {
              color: "#ee6666", // 点边线的颜色
            },
          },
        ],
      },
      option3: {
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
      option4: {
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
          max: 10,
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

.title{
  fontSize:80px;
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