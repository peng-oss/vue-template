<script lang="ts">
export type { CountUp as ICountUp, CountUpOptions } from "countup.js";
export default {
  name: "ItemTitle",
};
</script>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { CountUp } from "countup.js";
import type { CountUpOptions } from "countup.js";
import { ElSelect, ElOption } from "element-plus";

import { Refresh } from "@element-plus/icons-vue";
import { fa } from "element-plus/es/locale";

const props = withDefaults(
  defineProps<{
    title: string;
    rightItemType: "select" | "fullScreen" | "none";
    selectDataList?: any;
    selectValue?: any;
    isShowRefresh?: boolean;
    onclickRefresh?: any;
  }>(),
  {
    title: "",
    selectValue: "",
    isShowRefresh: false,
  }
);
const emits = defineEmits<{
  (event: "onClickFullScreen"): void;
  (event: "onclickRefresh"): void;
  (event: "onSelectChange"): (value: any) => void;
}>();
</script>

<template>
  <div class="title-container">
    <div class="title-left">
      <div class="title-left-text">{{ title }}</div>
    </div>
    <div class="flex flex-row items-center">
      <el-icon
        v-if="isShowRefresh"
        color="#3F6AA3"
        size="32"
        @click="$emit('onclickRefresh')"
        class="mr-[8px] cursor-pointer w-[34px] h-[34px] bg-[#132032] opacity-[0.9] rounded-[4px] border-[1px] border-[#3F6AA3]"
        ><Refresh
      /></el-icon>

      <div v-if="$props.rightItemType === 'select'">
        <el-select
          :model-value="$props.selectValue"
          placeholder="请选择"
          style="width: 148px"
          @change="
            (value) => {
              emits('onSelectChange', value);
            }
          "
        >
          <el-option
            v-for="item in props.selectDataList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div
        v-else-if="$props.rightItemType === 'fullScreen'"
        @click="$emit('onClickFullScreen')"
        class="cursor-pointer"
      >
        <img src="@/assets/img/enlarge.png" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  .title-left {
    background-image: url("@/assets/img/item-title-bg.png");
    width: 300px;
    height: 34px;
    display: flex;
    // justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    align-items: center;
    .title-left-text {
      font-weight: 400;
      font-size: 20px;
      color: #ffffff;
      line-height: 32px;
      text-shadow: 1px 8px 20px rgba(12, 140, 200, 0.5);
      opacity: 0.9;
      font-family: YouSheBiaoTiHei;
    }
  }
}
</style>