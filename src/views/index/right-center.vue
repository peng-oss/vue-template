<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import CapsuleChart from "@/components/datav/capsule-chart";
import { DialogueData } from "@/api";
import { ElMessage } from "element-plus";
import { use } from "echarts/core";

import { ToolboxComponent } from "echarts/components";
import { FunnelChart } from "echarts/charts";
import screenfull from "screenfull";
const box = ref(null);
use([ToolboxComponent, FunnelChart]);
const option = ref({});
const myChart = ref(null);
const sheetInSideData = ref([]);

const isScreenFull = ref(false);

const setIsScreenFull = (value) => {
  isScreenFull.value = value;
};

const setSheetInSideData = (value: any) => {
  sheetInSideData.value = value;
};

const getData = () => {
  DialogueData()
    .then((res) => {
      if (res.message === "success") {
        setSheetInSideData([
          {
            value: res.resdata.contactnum,
            name: "建联",
            proportion: `${
              (res.resdata.contactnum / res.resdata.sndnum) * 100
            }%`,
          },
          {
            value: res.resdata.replynum,
            name: "回复",
            proportion: `${(res.resdata.replynum / res.resdata.sndnum) * 100}%`,
          },
          { value: res.resdata.sndnum, name: "发送", proportion: "100%" },
        ]);

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
  option.value = {
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return `<div style="border-radius: 10px;">
        <div style="color: #C4E1FF; font-size: 14px; display: flex;flex-direction: row;align-items: center;">
        <div style="background: #1982CB; width: 10px; height: 10px; margin-right: 5px; border-radius: 50%;">
        </div>
          ${params.data.name}
        </div>
        <div style="color: #FEFEFE; font-size: 14px; margin-top: 10px;">
         数据：${params.data.value}
        </div>     
         <div style="color: #FEFEFE; font-size: 14px; margin-top: 10px;">
         占比：${params.data.proportion}
        </div>              
        </div>`; // Customize the tooltip content as desired
      },
      borderColor: "rgba(164,226,247,0.5)",
      backgroundColor: "rgba(5,25,46,0.8)",
    },
    color: ["#E49C29", "#007FD8", "#05B7DA"],
    legend: {
      x: "left",
      itemHeight: 10,
      itemWidth: 10,
      left: 30,
      data: [
        { name: "发送", icon: "rect" },
        { name: "回复", icon: "rect" },
        { name: "建联", icon: "rect" },
      ],
      textStyle: {
        color: "#CBDFEE",
        borderWidth: 0,
        fontSize: 14,
      },
    },
    series: [
      {
        name: "漏斗图",
        type: "funnel",
        left: "15%",
        top: 60,
        bottom: 60,
        width: "60%",
        min: 0,
        max: 100,
        minSize: "0%",
        maxSize: 0, // 设为 0，表示最大宽度为0，这样此层只会显示label
        //并且由于宽度为0，漏斗图是居中显示的，所以label线条的起始位置都是中间
        sort: "descending",
        z: 1, // 控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
        gap: 2,

        label: {
          show: true,
          position: "right",
          color: "#C4E1FF",
          formatter: function (params) {
            return params.data.proportion;
          },
        },

        labelLine: {
          length: isScreenFull.value ? 900 : 200,
          lineStyle: {
            width: 1,
            color: "#CEE3FF",
            type: "solid",
            cap: "round",
          },
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },

        data: sheetInSideData.value,
      },

      {
        name: "Funnel",
        type: "funnel",
        left: 0,
        top: 60,
        bottom: 60,

        min: 50,

        minSize: "20%",
        maxSize: "60%",
        sort: "descending",
        gap: 2,
        label: {
          show: true,
          position: "inside",
          formatter: function (params) {
            return params.data.value;
          },
        },

        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: "solid",
          },
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
        },

        data: sheetInSideData.value,
      },
    ],
  };
};
const onClickFullScreen = () => {
  screenfull.toggle(box.value);
};

screenfull.on("change", () => {
  if (screenfull.element?.id === "right-center") {
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
  <div id="right-center" ref="box">
    <ItemTitle
      title="话术数据"
      right-item-type="fullScreen"
      @on-click-full-screen="onClickFullScreen"
    />
    <v-chart
      ref="myChart"
      :style="{ height: isScreenFull ? '800px' : '280px' }"
      class="chart"
      :option="option"
    />
  </div>
</template>

<style scoped lang="scss">
.chart {
  width: 100%;
  margin-top: 20px;
}
</style>
