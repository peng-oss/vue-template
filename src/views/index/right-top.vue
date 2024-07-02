<script setup lang="ts">
import { rightBottom, ServiceRanking } from "@/api";
import SeamlessScroll from "@/components/seamless-scroll";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import EmptyCom from "@/components/empty-com";
import { ElMessage } from "element-plus";
import { color } from "echarts";
import dayjs from "dayjs";
import screenfull from "screenfull";

const box = ref(null);
const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 252,
    limitScrollNum: 3,

    // step:3
  },
  scroll: true,
});

const isScreenFull = ref(false);

const setIsScreenFull = (value) => {
  isScreenFull.value = value;
};

screenfull.on("change", () => {
  if (screenfull.element?.id === "right-top") {
    setIsScreenFull(screenfull.isFullscreen);
  }

  if (!screenfull.isFullscreen) {
    setIsScreenFull(false);
  }
});

const getData = () => {
  ServiceRanking()
    .then((res) => {
      if (res.message === "success") {
        state.list = res.ServRanking;
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

const comName = computed(() => {
  if (indexConfig.value.rightBottomSwiper) {
    return SeamlessScroll;
  } else {
    return EmptyCom;
  }
});

const onClickFullScreen = () => {
  screenfull.toggle(box.value);
};
onMounted(() => {
  getData();
});
</script>

<template>
  <div ref="box" id="right-top">
    <ItemTitle
      title="服务排行榜"
      right-item-type="fullScreen"
      @on-click-full-screen="onClickFullScreen"
    />
    <div class="table-title-container">
      <span class="table-title-text" style="margin-right: 62px">排名</span>
      <span class="table-title-text" style="margin-right: 98px">服务名称</span>
      <span class="table-title-text" style="margin-right: 62px">发布时间</span>
      <span class="table-title-text" style="margin-right: 48px">地区</span>
      <span class="table-title-text">阅读量</span>
    </div>
    <div
      class="right_bottom_wrap beautify-scroll-def"
      :style="{ height: isScreenFull === true ? '100%' : '264px' }"
      :class="{ 'overflow-y-auto': !indexConfig.rightBottomSwiper }"
    >
      <component
        :is="comName"
        :list="state.list"
        v-model="state.scroll"
        :singleHeight="state.defaultOption.singleHeight"
        :step="state.defaultOption.step"
        :limitScrollNum="state.defaultOption.limitScrollNum"
        :hover="state.defaultOption.hover"
        :singleWaitTime="state.defaultOption.singleWaitTime"
        :wheel="state.defaultOption.wheel"
      >
        <ul class="right_bottom">
          <li
            class="right_center_item"
            v-for="(item, i) in state.list"
            :key="i"
          >
            <div class="inner_right">
              <div class="info">
                <span
                  class="orderNum"
                  :style="{
                    color: [1, 2, 0].includes(i) ? '#FFA81C' : '#FFFFFF',
                  }"
                  >{{ i + 1 }}</span
                >
                <span
                  style="
                    margin-right: 18px;
                    width: 18%;
                    white-space: pre-wrap;
                    overflow-wrap: break-word;
                  "
                  >{{ item.ProductName }}</span
                >
                <span style="font-size: 12px; margin-right: 12px">
                  {{ dayjs(item.CreatedAt).format("YYYY.MM.DD") }}</span
                >
                <span style="font-size: 12px; margin-right: 12px; width: 5%">
                  {{ item.Area }}</span
                >

                <span
                  style="
                    font-size: 12px;
                    color: #03e1fe;
                    width: 5%;
                    text-align: center;
                  "
                >
                  {{ item.Views }}</span
                >
              </div>
            </div>
          </li>
        </ul>
      </component>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-title-container {
  display: flex;
  flex-direction: row;
  background: #142b43;
  border-radius: 2px;
  // justify-content: space-between;
  padding: 11px 18px;
  margin-top: 16px;

  .table-title-text {
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    opacity: 0.6;

    white-space: nowrap;
  }
}
.right_bottom {
  width: 100%;
  height: 100%;

  .right_center_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px;
    font-size: 14px;
    color: #fff;
    background: #111c28;
    margin-top: 6px;
    margin-bottom: 6px;

    .orderNum {
      width: 16px;
      height: 16px;
      background: #363634;
      border-radius: 2px;
      font-weight: 400;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 5px;
      margin-left: 10px;
      margin-right: 28px;
    }

    .inner_right {
      position: relative;
      height: 100%;
      width: 100%;
      line-height: 1.5;

      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("@/assets/img/zuo_xuxian.png");
        bottom: -12px;
        left: -2%;
        background-size: cover;
      }
    }

    .info {
      margin-right: 10px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #e6a23c;
        font-size: 15px;
      }
    }
  }
}

.right_bottom_wrap {
  // overflow: scroll;
  width: 100%;
  // height: 100%;
}

::-webkit-scrollbar {
  display: none;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
