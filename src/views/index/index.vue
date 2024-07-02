<script setup lang="ts">
import ItemWrap from "@/components/item-wrap";
import {
  LeftTop,
  LeftCenter,
  LeftBottom,
  CenterMap,
  CenterBottom,
  RightTop,
  RightCenter,
  RightBottom,
} from "./index";
</script>

<template>
  <div class="index-box">
    <div class="corner top-left">
      <img src="@/assets/img/top-left.png" alt="Top Left Image" />
    </div>
    <div class="corner top-right">
      <img src="@/assets/img/top-right.png" alt="Top Right Image" />
    </div>
    <div class="corner bottom-left">
      <img src="@/assets/img/bottom-left.png" alt="Bottom Left Image" />
    </div>
    <div class="corner bottom-right">
      <img src="@/assets/img/bottom-right.png" alt="Bottom Right Image" />
    </div>
    <div class="contetn_left">
      <LeftTop />

      <LeftCenter />

      <LeftBottom />
    </div>
    <div class="contetn_center">
      <CenterMap class="contetn_center_top" title="设备分布图" />

      <CenterBottom />
    </div>
    <div class="contetn_right">
      <RightTop />

      <RightCenter />

      <RightBottom />
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-box {
  width: 100%;
  display: flex;
  min-height: calc(100% - 64px);
  justify-content: space-between;
  position: relative;
  margin-top: 8px;
  // padding: 25px;
  background-image: url("../../assets/img/full-bg.png");
}
.corner {
  position: absolute;
  width: 100px;
  height: 100px;
}

.top-left {
  top: 0;
  left: 0;
}

.top-right {
  top: 0;
  right: 0;
}

.bottom-left {
  bottom: 0;
  left: 0;
}

.bottom-right {
  bottom: 0;
  right: 0;
}
//左边 右边 结构一样
.contetn_left {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-top: 20px;
  // padding-right: 15px;
  position: relative;
  width: 540px;
  box-sizing: border-box;
  flex-shrink: 0;
  // background: linear-gradient(to right, #051527, rgba(255, 0, 0, 0));
  // background: #051527;
  border: 1px solid rgba(170, 187, 203, 0.46);
  // opacity: 0.4;
}
.contetn_right {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 15px;
  position: relative;
  width: 540px;
  box-sizing: border-box;
  flex-shrink: 0;
  // background: linear-gradient(to right, #051527, rgba(255, 0, 0, 0));
  // background: #051527;
  border: 1px solid rgba(170, 187, 203, 0.46);
  // opacity: 0.4;
}
.contetn_center {
  flex: 1;
  margin: 0 15px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  .contetn_center-bottom {
    height: 315px;
  }
}

.contetn_lr-item {
  height: 310px;
}
</style>
