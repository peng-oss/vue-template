<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import ItemTitle from "@/components/item-title";
import { Keywordpopularity } from "@/api";
import { ElMessage } from "element-plus";
import { nanoid } from "nanoid";

const option = ref({});
const xData = ref([]);
const yData = ref([]);
const myChart = ref(null);
const OriginalData = ref([]);

const selectData = ref([]);
const setSelectData = (value: any) => {
  selectData.value = value;
};
const setYData = (value: any) => {
  yData.value = value;
};

const setXData = (value: any) => {
  xData.value = value;
};

const setOriginalData = (value: any) => {
  OriginalData.value = value;
};

const selectValue = ref("");

const setSelectValue = (value: any) => {
  selectValue.value = value;
};

const timeFn = () => {
  setInterval(() => {
    let currentIndex =
      selectData.value.findIndex(
        (item: any) => item.value == selectValue.value
      ) + 1;

    if (currentIndex >= selectData.value.length) {
      currentIndex = 0;
    }

    onSelectChange(selectData.value[currentIndex].value);
  }, 20000);
};
// timeFn();

interface ObjectItem {
  // 定义对象的属性类型
  label: string;
  value: number;
}

function removeDuplicates(arr: ObjectItem[]): ObjectItem[] {
  const uniqueMap: { [key: string]: ObjectItem } = {};
  const result: ObjectItem[] = [];

  for (const item of arr) {
    if (!uniqueMap[item.label]) {
      uniqueMap[item.label] = item;
      result.push(item);
    }
  }

  return result;
}

const getData = () => {
  Keywordpopularity()
    .then((res) => {
      if (res.message == "success") {
        setOriginalData(res.keydata);

        const wipSelectData = res.keydata.map((item: any) => ({
          label: item.CategoryName,
          value: item.CategoryKeywordID,
        }));

        const uniqueArr = removeDuplicates(wipSelectData);

        setXData(
          res.keydata
            .filter(
              (item: any) =>
                item.CategoryKeywordID == res.keydata[0].CategoryKeywordID
            )
            .map((item: any) => item.Keyword)
        );
        setYData(
          res.keydata
            .filter(
              (item: any) =>
                item.CategoryKeywordID == res.keydata[0].CategoryKeywordID
            )
            .map((item: any) => item.sumview)
        );

        setYData(res.keydata.splice(0, 20).map((item: any) => item.sumview));

        setSelectValue(uniqueArr[0].value);

        setSelectData(uniqueArr);

        setOption();
      } else {
        ElMessage({
          message: res.message,
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
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },

      formatter: function (params) {
        return `<div style="border-radius: 10px;">
        <div style="color: #C4E1FF; font-size: 14px; display: flex;flex-direction: row;align-items: center;">
        <div style="background: #1982CB; width: 10px; height: 10px; margin-right: 5px; border-radius: 50%;">
        </div>
          ${params[0].axisValue}
        </div>
        <div style="color: #FEFEFE; font-size: 14px; margin-top: 10px;">
         数据：${params[0].data}
        </div>                 
        </div>`; // Customize the tooltip content as desired
      },
      borderColor: "rgba(164,226,247,0.5)",
      backgroundColor: "rgba(5,25,46,0.8)",
    },
    xAxis: {
      type: "category",
      data: xData,
      grid: { right: 0 },
      axisTick: { alignWithLabel: true },
      boundaryGap: ["20%", 0],
      axisLabel: {
        color: "#C4E1FF", // 设置 x 轴文字颜色为红色
        //x轴文字的配置
        show: true,
        interval: 0, //使x轴文字显示全
        textStyle: {
          color: "rgba(219, 225, 255, 1)",
        },
        formatter: function (params) {
          var newParamsName = "";
          var paramsNameNumber = params.length;
          var provideNumber = 1; //一行显示几个字
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = "";
              var start = p * provideNumber;
              var end = start + provideNumber;
              if (p == rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber);
              } else {
                tempStr = params.substring(start, end) + "\n";
              }
              newParamsName += tempStr;
            }
          } else {
            newParamsName = params;
          }
          return newParamsName;
        },
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dashed", // 设置网格线为虚线
          color: "#1E2A38",
        },
      },
      axisLabel: {
        marin: 2,
        interval: 0, //使x轴文字显示全
      },
    },
    series: [
      {
        data: yData,
        type: "bar",
        barWidth: 16,
        itemStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#459AAF",
                },
                {
                  offset: 1,
                  color: "rgba(2,75,168,0)",
                },
              ],
            },
          },
        },
      },
    ],
  };
};

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

const onSelectChange = (value) => {
  setXData(
    OriginalData.value
      .filter((item: any) => item.CategoryKeywordID == value)
      .map((item: any) => item.Keyword)
  );
  setYData(
    OriginalData.value
      .filter((item: any) => item.CategoryKeywordID == value)
      .map((item: any) => item.sumview)
  );

  setSelectValue(value);

  setOption();
};
</script>

<template>
  <div>
    <ItemTitle
      title="关键词热度"
      right-item-type="select"
      :selectDataList="selectData"
      :selectValue="selectValue"
      @onSelectChange="onSelectChange"
    />
    <v-chart ref="myChart" class="chart" :option="option" />
  </div>
</template>

<style scoped lang="scss">
.chart {
  height: 20vh;
  width: 100%;
}
</style>
