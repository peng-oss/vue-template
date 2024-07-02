<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import { centerMap, DataOverview, GETNOBASE, Servproductdata } from "@/api";
import { registerMap, getMap } from "echarts/core";
import { optionHandle, regionCodes } from "./center.map";
import BorderBox13 from "@/components/datav/border-box-13";
import { ElMessage } from "element-plus";

import type { MapdataType } from "./center.map";
import { color } from "echarts";

const option = ref({});
const code = ref("china"); //china 代表中国 其他地市是行政编码

const topData = ref({
  totalincrementpercent: 0,
  totalcnt: 0,
  yesterdaytotalcnt: 0,
  incrementpercent: 0,
  totalincrement: 0,
  yesterdayincrement: 0,
  yesterdayrate: 0,
  twodaysagorate: 0,
});

const setTopData = (value: any) => {
  topData.value = value;
};

withDefaults(
  defineProps<{
    // 结束数值
    title: number | string;
  }>(),
  {
    title: "地图",
  }
);

const dataSetHandle = async (regionCode: string, list: object[]) => {
  const geojson: any = await getGeojson(regionCode);
  let cityCenter: any = {};
  let mapData: MapdataType[] = [];
  //获取当前地图每块行政区中心点
  geojson.features.forEach((element: any) => {
    cityCenter[element.properties.name] =
      element.properties.centroid || element.properties.center;
  });

  //当前中心点如果有此条数据中心点则赋值x，y当然这个x,y也可以后端返回进行大点，前端省去多行代码
  list.forEach((item: any) => {
    if (cityCenter[item.name]) {
      mapData.push({
        name: item.name,
        value: cityCenter[item.name].concat(item.value),
      });
    }
  });

  await nextTick();

  option.value = optionHandle(regionCode, list, mapData);
};

const dataSetRealDataHandle = async (regionCode: string, list: object[]) => {
  const geojson: any = await getGeojson(regionCode);
  let cityCenter: any = {};
  let mapData: MapdataType[] = [];
  //获取当前地图每块行政区中心点
  geojson.features.forEach((element: any) => {
    cityCenter[element.properties.name] =
      element.properties.centroid || element.properties.center;
  });
  //当前中心点如果有此条数据中心点则赋值x，y当然这个x,y也可以后端返回进行大点，前端省去多行代码

  const newList = list.map((item: any) => {
    const currentCityKey = Object.keys(cityCenter).find((key) =>
      key.includes(item.Area)
    );

    if (currentCityKey) {
      mapData.push({
        name: currentCityKey,
        value: [
          ...cityCenter[currentCityKey],
          item.servpartnersnum,
          item.proservnum,
          item.categorynum,
          item.subcategorynum,
        ],
      });
    }

    return {
      name: currentCityKey,
      value: item.proservnum,
      servpartnersnum: item.servpartnersnum,
      categorynum: item.categorynum,
      subcategorynum: item.subcategorynum,
    };
  });

  await nextTick();

  option.value = optionHandle(regionCode, newList, mapData);
};

const getData = async (regionCode: string) => {
  const response = await DataOverview();

  if (response.message === "success") {
    setTopData({
      totalcnt: response.totalcnt,
      totalincrementpercent: response.totalincrementpercent,
      yesterdaytotalcnt: response.yesterdaytotalcnt,
      yesterdayincrement: response.yesterdayincrement,
      totalincrement: response.totalincrement,
      incrementpercent: response.incrementpercent,
      yesterdayrate: response.yesterdayrate,
      ratediff: response.ratediff,
      twodaysagorate: response.twodaysagorate,
    });
  } else {
    ElMessage.error(response.message);
  }

  const res = await Servproductdata();
  if (res.message === "success") {
    dataSetRealDataHandle("china", res.data);
  } else {
    dataSetRealDataHandle("china", []);
    ElMessage.error(res.message);
  }
};
const getGeojson = (regionCode: string) => {
  return new Promise<boolean>(async (resolve) => {
    let mapjson = getMap(regionCode);
    if (mapjson) {
      mapjson = mapjson.geoJSON;
      resolve(mapjson);
    } else {
      mapjson = await GETNOBASE(`./map-geojson/${regionCode}.json`).then(
        (data) => data
      );
      code.value = regionCode;
      registerMap(regionCode, {
        geoJSON: mapjson as any,
        specialAreas: {},
      });
      resolve(mapjson);
    }
  });
};
getData(code.value);

const mapClick = (params: any) => {
  // // console.log(params);
  // let xzqData = regionCodes[params.name];
  // if (xzqData) {
  //   getData(xzqData.adcode);
  // } else {
  //   window["$message"].warning("暂无下级地市");
  // }
};
</script>

<template>
  <div class="centermap">
    <div class="flex flex-row justify-center">
      <div class="left-all">数据总览</div>
      <div class="center-all">数据实时图</div>
      <div class="right-all">指令操作</div>
    </div>
    <div class="flex flex-row mt-[14px] justify-center mb-[20px]">
      <div class="all-left">
        <div class="count-one-wrap">
          <div class="circle" />
          <div>总数据量</div>
        </div>
        <div class="flex flex-row items-center justify-between">
          <div
            :style="{
              color: topData.totalincrementpercent > 0 ? '#F62F50' : '#14D07E',
            }"
            class="text-[24px] mr-[32px]"
          >
            {{ topData.totalcnt }}
          </div>
          <div
            :style="{
              color: topData.totalincrementpercent > 0 ? '#F62F50' : '#14D07E',
            }"
            class="text-[14px] text-[#14D07E]"
          >
            {{ (topData.totalincrementpercent ?? 0).toFixed(2) + "%" }}
          </div>
        </div>
        <div class="line"></div>
        <div class="flex flex-row justify-between">
          <div class="text-[16px] text-[#C4E1FF]">前日值</div>
          <div class="text-[16px] text-[#C4E1FF]">
            {{ topData.yesterdaytotalcnt }}
          </div>
        </div>
      </div>
      <div class="all-center">
        <div class="count-one-wrap">
          <div class="circle" />
          <div>新增数据条数</div>
        </div>
        <div class="flex flex-row items-center justify-between">
          <div
            :style="{
              color: topData.incrementpercent > 0 ? '#F62F50' : '#14D07E',
            }"
            class="text-[24px] text-[#14D07E] mr-[32px]"
          >
            {{ (topData.totalincrement ?? 0).toFixed(2) }}
          </div>
          <div
            :style="{
              color: topData.incrementpercent > 0 ? '#F62F50' : '#14D07E',
            }"
            class="text-[14px] text-[#14D07E]"
          >
            {{ (topData.incrementpercent ?? 0).toFixed(2) + "%" }}
          </div>
        </div>
        <div class="line"></div>
        <div class="flex flex-row justify-between">
          <div class="text-[16px] text-[#C4E1FF]">前日值</div>
          <div class="text-[16px] text-[#C4E1FF]">
            {{ topData.yesterdayincrement }}
          </div>
        </div>
      </div>
      <div class="all-right">
        <div class="count-one-wrap">
          <div class="circle" />
          <div>增长率</div>
        </div>
        <div class="flex flex-row items-center justify-between">
          <div
            :style="{
              color:
                Math.floor(topData.yesterdayrate - topData.twodaysagorate) > 0
                  ? '#F62F50'
                  : '#14D07E',
            }"
            class="text-[24px] text-[#14D07E] mr-[32px]"
          >
            {{ (topData.yesterdayrate ?? 0).toFixed(2) + "%" }}
          </div>
          <div
            :style="{
              color:
                Math.floor(topData.yesterdayrate - topData.twodaysagorate) > 0
                  ? '#F62F50'
                  : '#14D07E',
            }"
            class="text-[14px] text-[#14D07E]"
          >
            {{
              (topData.yesterdayrate - topData.twodaysagorate).toFixed(2) + "%"
            }}
          </div>
        </div>
        <div class="line"></div>
        <div class="flex flex-row justify-between">
          <div class="text-[16px] text-[#C4E1FF]">前日值</div>
          <div class="text-[16px] text-[#C4E1FF]">
            {{ topData.yesterdayrate.toFixed(2) + "%" }}
          </div>
        </div>
      </div>
    </div>

    <ItemTitle title="服务类型与商品" right-item-type="none" />
    <div class="mapwrap">
      <div class="quanguo" @click="getData('china')" v-if="code !== 'china'">
        中国
      </div>
      <v-chart
        class="chart"
        :option="option"
        ref="centerMapRef"
        @click="mapClick"
        v-if="JSON.stringify(option) != '{}'"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.centermap {
  // margin-bottom: 30px;

  .left-all {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 164px;
    height: 48px;
    background: url("@/assets/img/all-left.png") no-repeat;
    font-family: Source Han Sans CN;
    font-weight: 500;
    font-size: 16px;
    color: #c4e1ff;
    line-height: 14px;
  }

  .circle {
    width: 7px;
    height: 7px;
    background: #00d5ff;
    border-radius: 50%;
    border: 1px solid #20c4d3;
    margin-right: 7px;
  }

  .all-left {
    background: #051527;
    border-radius: 50px 10px 10px 20px;
    border: 1px solid rgba(170, 187, 203, 0.46);
    padding: 18px 18px 8px 30px;
    .count-one-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .line {
      width: 151px;
      height: 2px;
      border: 1px solid #7999c9;
      opacity: 0.27;
      margin-top: 7px;
      margin-bottom: 7px;
    }
  }
  .all-center {
    background: #051527;
    border-radius: 10px;
    border: 1px solid rgba(170, 187, 203, 0.46);

    padding: 18px 18px 8px 30px;
    margin-left: 12px;
    margin-right: 12px;
    .count-one-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .line {
      width: 151px;
      height: 2px;
      border: 1px solid #7999c9;
      opacity: 0.27;
      margin-top: 7px;
      margin-bottom: 7px;
    }
  }
  .all-right {
    background: #051527;
    border-radius: 10px 50px 20px 10px;
    border: 1px solid rgba(170, 187, 203, 0.46);
    padding: 18px 18px 8px 30px;
    .count-one-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .line {
      width: 151px;
      height: 2px;
      border: 1px solid #7999c9;
      opacity: 0.27;
      margin-top: 7px;
      margin-bottom: 7px;
    }
  }
  .center-all {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 198px;
    height: 48px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    font-size: 16px;
    color: #c4e1ff;
    line-height: 14px;
    background: url("@/assets/img/all-center.png") no-repeat;
  }

  .right-all {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 164px;
    height: 48px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    font-size: 16px;
    color: #c4e1ff;
    line-height: 14px;
    background: url("@/assets/img/all-right.png") no-repeat;
  }
  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(
        92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("@/assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("@/assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    height: 400px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;

    .quanguo {
      position: absolute;
      right: 20px;
      top: -46px;
      width: 80px;
      height: 28px;
      border: 1px solid #00eded;
      border-radius: 10px;
      color: #00f7f6;
      text-align: center;
      line-height: 26px;
      letter-spacing: 6px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5),
        0 0 6px rgba(0, 237, 237, 0.4);
      z-index: 10;
    }
  }
}
</style>
