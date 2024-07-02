<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import ItemTitle from "@/components/item-title";
import { use } from "echarts/core";
import { GraphChart } from "echarts/charts";
import { ElMessage } from "element-plus";
import axios from "axios";
import { TreeChart } from "echarts/charts";
import { ScriptsCategoryRelat } from "@/api";
import { EleResize } from "@/utils/esresize"; // 图表自适应
use([TreeChart]);
import screenfull from "screenfull";
const box = ref(null);

const myChart = ref(null);
const option = ref({});
const chartData = ref({});

const isScreenFull = ref(false);

const setIsScreenFull = (value) => {
  isScreenFull.value = value;
};

const setChartData = (value: any) => {
  chartData.value = value;
};

const omitChatData = ref({});

const setOmitChatData = (value: any) => {
  omitChatData.value = value;
};

function transformData(data: any[]): any {
  const result: any = {
    name: "全部",
    children: [],
  };

  data.forEach((item) => {
    const script = {
      name: item.CategoryName,
      children: [
        {
          name: item.SubcategoryName,
          children: [
            {
              name: item.ScriptName,
            },
          ],
        },
      ],
    };
    result.children.push(script);
  });

  return result;
}

const getData = () => {
  ScriptsCategoryRelat().then((res: any) => {
    if (res.message === "success") {
      setChartData(transformData(res.data));
      setOmitChatData(transformData(res.data.splice(0, 3)));
      setOption();
    } else {
      ElMessage({
        message: res.msg,
        type: "warning",
      });
    }
  });
};

const setOption = () => {
  try {
    option.value = {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      initialTreeDepth: 3,
      series: [
        {
          type: "tree",
          data: [chartData.value],
          top: "1%",
          left: "7%",
          bottom: "1%",
          right: "20%",
          symbolSize: 7,
          label: {
            position: "top",

            fontSize: 14,
            color: "#C4E1FF",
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
            },
          },
          emphasis: {
            focus: "descendant",
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
          initialTreeDepth: 1,
          lineStyle: {
            color: "#20C4D3",
          },
          itemStyle: {
            color: "#00D5FF",
            borderColor: "#FDFEFF",
          },
        },
      ],
    };

    console.log("Option set successfully");
  } catch (error) {
    console.error("Error setting option:", error);
  }
};

const onClickFullScreen = () => {
  screenfull.toggle(box.value);
};

screenfull.on("change", () => {
  if (screenfull.element?.id === "right-bottom") {
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
        setOption();

        myChart.value.resize();
      }, 0);
    }
  });
});
</script>

<template>
  <div class="container" id="right-bottom" ref="box">
    <ItemTitle
      title="话术库与服务小类的关系"
      right-item-type="fullScreen"
      @on-click-full-screen="onClickFullScreen"
    />

    <v-chart
      class="chart"
      :style="{ height: isScreenFull ? '100vh' : '280px' }"
      ref="myChart"
      :option="option"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
  .chart {
    width: 100%;
  }
}
</style>