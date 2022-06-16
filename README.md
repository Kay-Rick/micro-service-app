## 项目启动

```shell
npm install
npm run serve
```

## 项目结构

![image-20220415200542048](https://kay-rick.oss-cn-beijing.aliyuncs.com/img/image-20220415200542048.png)

### 配置文件vue.config.js

```js
module.exports = {
    configureWebpack: {
        devServer: {
            // 项目端口
            port: 8082,
            // 处理跨域
            headers: { "Access-Control-Allow-Origin": "*" }
    },
    },
    
    lintOnSave: false
}

```

### 项目入口main.js

- 主要是导入ElementUI，echarts，vue-router等相关配置项

### 路由配置router/index.js

- 配置了路由跳转路径对应右侧不同的组件

### 网络请求network/request.js

```js
const instance = axios.create({
    	// 路由前缀
        baseURL: 'http://192.168.1.167:8000/api',
		// 请求超时时间
        timeout: 5000
    });
```

### BoardInstance.vue

#### 项目加载create()

```js
// vue生命周期函数：页面在加载时会自动执行
created() {
    // 调用methods中的getMainInfo()从后端拉取信息
    this.getMainInfo("192.168.1.167");
},
methods:{
    getMainInfo(ip) {
      request({
        url: "/router/getallcontainers?ip=" + ip,
        method: "get",
      })
        .then((res) => {
          console.log(res);
          this.containerData = res;
        })
        .catch((err) => {
          console.log(err);
        });
      request({
        url: "/router/getimages?ip=" + ip,
        method: "get",
      })
        .then((res) => {
          console.log(res);
          this.imageData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
}

```



#### 信息渲染

- imageData

```vue
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
			<el-button @click="handleClick(scope.row)" type="text">start</el-button>
			<el-button @click="open(scope.row)" type="text">remove</el-button>
        </template>
    </el-table-column>
</el-table>

<script>
methods: {
    handleClick(row) {
      // 显示弹框el-dialog
      this.dialogFormVisible = true;
      console.log(row);
    },
}
</script>

```

- 渲染imageData中的数据作为展示，el-table-column中prop属性对应相关字段
- @click="handleClick(scope.row)" ：点击启动镜像操作，在methods中处理请求
- @click="open(scope.row)"：点击删除镜像操作，在methods中向后端发起请求
- container操作同理

#### 定时请求

```js
mounted() {
    this.myEcharts();
    this.timer = setInterval(() => {
	   // 每2000ms调用网络请求的方法更新要展示的数据
    }, 2000);
  },
// 注意需要清除定时器
beforeDestroy() {
    clearInterval(this.timer);
}
```



#### views文件夹目前没有使用





### 相关网站

- Element-UI的表格：https://element.eleme.cn/#/zh-CN/component/table
- Element-UI对话框：https://element.eleme.cn/#/zh-CN/component/dialog
- echarts：https://echarts.apache.org/examples/zh/editor.html?c=area-basic