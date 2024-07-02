<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue";
import { getnews, installationPlan, rightBottom } from "@/api";
import { graphic } from "echarts/core";
import { ElIcon, ElMessage } from "element-plus";
import { CaretRight } from "@element-plus/icons-vue";
import { useSettingStore } from "@/stores";
import SeamlessScroll from "@/components/seamless-scroll";
import { storeToRefs } from "pinia";
import EmptyCom from "@/components/empty-com";
import { useRouter } from "vue-router";
const TAB_DATA = [
  { name: "最新", code: "today" },
  { name: "昨天", code: "yesterday" },
  { name: "近3天", code: "recentlythreedays" },
  { name: "近一周", code: "recentlyoneweek" },
  { name: "近一个月", code: "recentlyonemonth" },
];

const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);

const currentTab = ref("today");
const router = useRouter();
const setCurrentTab = (value: string) => {
  currentTab.value = value;
};

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

const getData = () => {
  getnews({ times: currentTab.value })
    .then((res) => {
      if (res.message === "success") {
        state.list = res.newinfo;
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

watch(currentTab, (newValue, oldValue) => {
  getData();
});
onMounted(() => {
  getData();
});

const comName = computed(() => {
  if (indexConfig.value.rightBottomSwiper) {
    return SeamlessScroll;
  } else {
    return EmptyCom;
  }
});

const onClickItem = (item: any) => {
  // router.push({
  //   path: "/newsDetail",
  //   query: item,
  // });

  const href = router.resolve({
    name: "newsDetail", //这里是跳转页面的name
    path: "/newsDetail",
    query: item,
  });
  // 点击事件

  window.open(href.href, "_blank");
};
</script>

<template>
  <ItemTitle title="资讯新闻" right-item-type="none" />
  <div class="tab-item-container">
    <div
      class="tab-item"
      v-for="item in TAB_DATA"
      @click="setCurrentTab(item.code)"
      :key="item.code"
      :style="{
        background: currentTab === item.code ? 'rgba(9,46,121,0.47)' : '',
        borderColor: currentTab === item.code ? '#1CD0F8' : '#7999C9',
      }"
    >
      {{ item.name }}
    </div>
  </div>
  <div
    class="flex flex-row items-center pl-[18px] py-[11px] bg-[#172B3F] radius-[2px]"
  >
    <div class="opacity-[0.6] text-[14px] text-[#FFFFFF]">最新资讯</div>
    <div class="circle">
      <el-icon color="#06C1CE"><CaretRight /></el-icon>
    </div>
  </div>
  <div class="right_bottom_wrap">
    <el-empty v-if="!state.list.length" description="暂无数据" />

    <component
      v-else
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
          @click="onClickItem(item)"
          v-for="(item, i) in state.list"
          :key="i"
        >
          <span class="orderNum">{{ item.Title }}</span>
        </li>
      </ul>
    </component>
  </div>
</template>

<style scoped lang="scss">
.tab-item-container {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  .tab-item {
    border-radius: 5px;
    border: 1px solid #7999c9;
    margin-left: 8px;
    margin-right: 8px;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 24px;
    padding-right: 24px;
    font-family: Lantinghei SC;
    font-weight: 200;
    font-size: 14px;
    color: #d0d4e4;
    cursor: pointer;
  }
}

.circle {
  width: 17px;
  height: 17px;
  background: #0f213d;
  border-radius: 50%;
  border: 1px solid #758d9d;
  margin-left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right_bottom_wrap {
  overflow: scroll;
  width: 100%;
  // height: 252px;
}
::-webkit-scrollbar {
  display: none;
}

.right_center_item {
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 19px;
  cursor: pointer;
}
.orderNum {
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 14px;
  color: #fffefe;
}
</style>
