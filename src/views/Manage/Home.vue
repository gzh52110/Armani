<template>
  <div style="width: 100%; height: 100%">
    <div
      ref="chart"
      style="width: 50%; height: 45%; display: inline-block"
    ></div>
    <div
      ref="chart2"
      style="width: 50%; height: 45%; display: inline-block"
    ></div>
    <div ref="chart3" style="width: 80%; height: 40%;margin-left:10%"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      option1: {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: ["20%", "60%"],
            center: ["50%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      },
      option2: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["30%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      },
      option3: {
        title: {
          text: "数量",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["男性活跃用户量", "女性活跃用户量", "总活跃用户量"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月","8月","9月","10月","11月","12月"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "男性活跃用户量",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410,150, 232, 201, 154, 190],
          },
          {
            name: "女性活跃用户量",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320,301, 334, 390, 330, 320],
          },
          {
            name: "总活跃用户量",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320,901, 934, 1290, 1330, 1320],
          },
        ],
      },
    };
  },
  mounted() {
    this.getEchartData("chart", this.option1);
    this.getEchartData("chart2", this.option2);
    this.getEchartData("chart3", this.option3);
    //⚡为什么看不到main.js里面写入vue实例的一些属性
    console.log("this", this);
  },

  methods: {
    getEchartData(chartName, option) {
      const chart = this.$refs[chartName];
      if (chart) {
        const myChart = this.$echarts.init(chart);
        myChart.setOption(option);
        // 监听窗口发生变化，resize组件
        window.addEventListener("resize", function () {
          myChart.resize();
        });
        // 通过hook监听组件销毁钩子函数，并取消监听事件
        this.$on("hook:destroyed", () => {
          window.removeEventListener("resize", function () {
            myChart.resize();
          });
        });
      }
    },
  },
};
</script>
<style scss>
a {
  display: inline-block;
}
</style>
