<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import ItemTitle from "@/components/item-title";
import { use } from "echarts/core";
import { GraphChart } from "echarts/charts";
import { KeywordProdRelat } from "@/api";
import { ElMessage } from "element-plus";
import { nanoid } from "nanoid";
import screenfull from "screenfull";
import leftBottomBg from "@/assets/images/left-bottom.png";
use([GraphChart]);

const option = ref({});

const myChart = ref(null);

const isScreenFull = ref(false);

const setIsScreenFull = (value) => {
  isScreenFull.value = value;
};

const box = ref(null);

const chartData = ref({
  data: [],
  link: [],
});

const setChartData = (value: any) => {
  chartData.value = value;
};

interface Product {
  name: string;
  Views: number;
  Price: number;
  Area: string;
}

interface TransformedData {
  Keyword: string;
  Product: Product[];
}

function firstTransformData(
  data: {
    Keyword: string;
    ProductName: string;
    Views: number;
    Price: number;
    Area: string;
  }[]
): TransformedData[] {
  const result: TransformedData[] = [];
  const groupedData: { [key: string]: TransformedData } = {};

  data.forEach((item) => {
    if (!groupedData[item.Keyword]) {
      groupedData[item.Keyword] = {
        Keyword: item.Keyword,
        Product: [],
      };
    }
    groupedData[item.Keyword].Product.push({
      name: item.ProductName,
      Views: item.Views,
      Price: item.Price,
      Area: item.Area,
    });
  });

  for (const key in groupedData) {
    result.push(groupedData[key]);
  }

  return result;
}

function transformData(data: any[]): any[] {
  const result: any[] = [];
  data.forEach((item) => {
    item.Product.forEach((product) => {
      result.push({
        source: item.Keyword + product.name,
        target: item.Keyword,
      });
      result.push({
        source: item.Keyword + product.name + product.Views,
        target: item.Keyword + product.name,
      });
      result.push({
        source: item.Keyword + product.name + product.Price,
        target: item.Keyword + product.name,
      });
      result.push({
        source: item.Keyword + product.name + product.Area,
        target: item.Keyword + product.name,
      });
    });
  });

  return result;
}

function transformData2(data: any[]): any[] {
  const result: any[] = [];
  data.forEach((item) => {
    result.push({
      // id: nanoid(),
      name: item.Keyword,
      x: 0,
      y: 0,
      symbolSize: 230,
      draggable: true,
      itemStyle: {
        normal: {
          borderColor: "rgba(0, 210, 242, 1)",
          borderWidth: 3,

          color: "rgba(19,50,83,1)",
        },
      },
      label: {
        show: true,
        fontSize: 20,
        fontWeight: "bold",
        formatter(params) {
          var strs = params.name.split(""); //字符串数组
          var str = "";
          for (var i = 0, s; (s = strs[i++]); ) {
            //遍历字符串数组
            str += s;
            if (!(i % 4)) str += "\n"; //按需要求余
          }
          return str;
        },
      },
    });

    item.Product.forEach((product) => {
      result.push({
        id: item.Keyword + product.name,
        name: product.name,
        x: 0,
        y: 0,
        symbolSize: 200,
        draggable: true,
        itemStyle: {
          normal: {
            borderColor: "#1CFF9C",
            borderWidth: 3,
            // shadowBlur: 20,
            // shadowColor: "#1CFF9C",
            color: "rgba(19,50,83,1)",
          },
        },

        label: {
          show: true,
          fontSize: 12,
          fontWeight: "bold",
          formatter(params) {
            var strs = params.name.split(""); //字符串数组
            var str = "";
            for (var i = 0, s; (s = strs[i++]); ) {
              //遍历字符串数组
              str += s;
              if (!(i % 6)) str += "\n"; //按需要求余
            }
            return str;
          },
        },
      });
      result.push({
        // id: nanoid(),
        id: item.Keyword + product.name + product.Views,
        name: `阅读量\n${product.Views}`,
        x: 0,
        y: 0,
        symbolSize: 156,
        draggable: true,
        itemStyle: {
          normal: {
            borderColor: "#902FE6",
            borderWidth: 3,
            // shadowBlur: 20,
            // shadowColor: "#902FE6",
            color: "rgba(19,50,83,1)",
          },
        },
        label: {
          show: true,
          fontSize: 12,
          fontWeight: "bold",
        },
      });
      result.push({
        id: item.Keyword + product.name + product.Price,
        name: `售价\n${product.Price}`,
        x: 0,
        y: 0,
        symbolSize: 156,
        draggable: true,
        itemStyle: {
          normal: {
            borderColor: "#902FE6",
            borderWidth: 3,
            // shadowBlur: 20,
            // shadowColor: "#902FE6",
            color: "rgba(19,50,83,1)",
          },
        },

        label: {
          show: true,
          fontSize: 12,
          fontWeight: "bold",
        },
      });
      result.push({
        id: item.Keyword + product.name + product.Area,
        name: `地区\n${product.Area}`,
        x: 0,
        y: 0,
        symbolSize: 156,
        draggable: true,
        itemStyle: {
          normal: {
            borderColor: "#902FE6",
            borderWidth: 3,
            // shadowBlur: 20,
            // shadowColor: "#902FE6",
            color: "rgba(19,50,83,1)",
          },
        },
        label: {
          show: true,
          fontSize: 12,
          fontWeight: "bold",
        },
      });
    });
  });

  return result;
}

const getData = () => {
  KeywordProdRelat()
    .then((res) => {
      if (res.message === "success") {
        const newList = firstTransformData(res.data);
        console.log(`peng-oss😈-------newList-------`, newList);
        setChartData({
          data: transformData2(newList),
          link: transformData(newList),
        });

        setOption();
      } else {
        ElMessage({
          message: res.msg,
          type: "warning",
        });
      }
    })

    .catch((err) => {
      ElMessage.error(err);
    });
};

const setOption = () => {
  try {
    option.value = {
      backgroundColor: "",
      tooltip: {
        show: false,
      },
      animationDurationUpdate: function (idx) {
        // 越往后的数据延迟越大
        return idx * 100;
      },
      animationEasingUpdate: "bounceIn",
      color: ["#fff", "#fff", "#fff"],

      series: [
        {
          type: "graph",
          layout: "force",
          force: {
            repulsion: 30,
            gravity: 0.5,
            edgeLength: 10,
          },
          zoom: 0.03,
          roam: true,
          // center: [-6, -6],
          label: {
            normal: {
              show: true,
              position: "inside",
            },
          },
          lineStyle: {
            color: "#B5CACB",
            width: 3,
          },
          data: chartData.value.data,
          links: chartData.value.link,
        },
      ],
    };

    console.log("Option set successfully");
  } catch (error) {
    console.error("Error setting option:", error);
  }
};

screenfull.on("change", () => {
  if (screenfull.element?.id === "left-bottom") {
    setIsScreenFull(screenfull.isFullscreen);
  }

  if (!screenfull.isFullscreen) {
    setIsScreenFull(false);
  }
});

onMounted(() => {
  getData();
  window.addEventListener("resize", () => {
    if (myChart.value) {
      setTimeout(() => {
        myChart.value.resize();
      }, 0);
    }
  });
});

const onClickFullScreen = () => {
  if (screenfull.isFullscreen) {
    screenfull.exit();
  } else {
    screenfull.toggle(box.value!);
  }
};
</script>

<template>
  <div id="left-bottom" class="container" ref="box">
    <ItemTitle
      title="关键词与产品关系"
      isShowRefresh
      @onclick-refresh="setOption"
      right-item-type="fullScreen"
      @on-click-full-screen="onClickFullScreen"
    />
    <div
      class="echarts-container"
      :style="{ height: isScreenFull ? '100vh' : '480px' }"
    >
      <v-chart ref="myChart" class="chart" :option="option" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  .echarts-container {
    background: url("@/assets/img/left-bottom-bg.png") center center no-repeat;
  }

  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>