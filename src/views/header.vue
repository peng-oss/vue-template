<script setup lang="ts">
import { reactive } from "vue";
import dayjs from "dayjs";
import type { DateDataType } from "./index.d";
import { useSettingStore } from "@/stores/index";
import { useDark, useToggle } from "@vueuse/core";
import { UseDark } from "@vueuse/components";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import screenfull from "screenfull";

const isDark = useDark();
const settingStore = useSettingStore();
const { setUserName } = useSettingStore();
const { userName } = storeToRefs(settingStore);
const toggleDark = useToggle(true);
const router = useRouter();
const dateData = reactive<DateDataType>({
  dateDay: "",
  dateYear: "",
  dateWeek: "",
  dateMinAndSec: "",
  timing: null,
});

const { setSettingShow } = useSettingStore();
const weekday = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

const emits = defineEmits<{
  (event: "onClickFullScreen"): void;
}>();

const timeFn = () => {
  dateData.timing = setInterval(() => {
    dateData.dateDay = dayjs().format("YYYY年MM月DD日");
    dateData.dateWeek = weekday[dayjs().day()];
    dateData.dateMinAndSec = dayjs().format("HH:mm");
  }, 1000);
};
timeFn();

const onClickScreen = () => {
  screenfull.request();
};

const onClickQuit = () => {
  setUserName(undefined);
  localStorage.removeItem("username");
  router.push({ path: "/login" });
};
</script>

<template>
  <div class="d-flex jc-center title_wrap">
    <div class="d-flex jc-center">
      <div class="title">
        <div class="guang"></div>
        <span class="title-text">关键词&服务&资讯&话术关系图谱大屏</span>
      </div>
    </div>
    <div class="timers">
      {{ dateData.dateYear }} {{ dateData.dateDay }} {{ dateData.dateWeek }}
      <div class="line"></div>
      {{ dateData.dateMinAndSec }}

      <!-- <div class="setting_icon" @click="setSettingShow(true)">
        <img src="@/assets/img/headers/setting.png" alt="设置" />
      </div> -->
    </div>

    <div class="rightSetting">
      <div class="userInfo">
        <div
          class="rounded-[50%] w-[32px] h-[32px] border-[#FFFFFF] border-[1px] mr-[9px]"
        >
          <img
            class="rounded-[50%] w-[32px] h-[32px] border-[#FFFFFF] border-[1px] mr-[9px]"
            src="@/assets/img/avatar.png"
            alt=""
          />
        </div>
        <span class="text=[14px] text-[#C4E1FF]">{{ userName }}</span>
      </div>
      <div class="functionContainer">
        <UseDark v-slot="{ isDark, toggleDark }">
          <img src="@/assets/img/mode.png" @click="toggleDark()" alt="退出" />
        </UseDark>

        <img src="@/assets/img/quit.png" @click="onClickQuit" alt="退出" />
        <img
          src="@/assets/img/fullScreen.png"
          @click="onClickScreen"
          alt="全屏"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title_wrap {
  height: 60px;
  background-image: url("../assets/img/top.png");
  background-size: cover;
  background-position: center center;
  position: relative;
  margin-bottom: 4px;

  .guang {
    background-image: url("../assets/img/logo.png");
    // background-position: 80px center;
    width: 59px;
    height: 26px;
  }

  .line {
    width: 2px;
    height: 33px;
    background: #bdcfe1;
    opacity: 0.33;
    margin-left: 16px;
    margin-right: 16px;
  }

  .timers {
    position: absolute;
    left: 0;
    top: 30px;
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 18px;
    color: #ffffff;
    line-height: 26px;
    .setting_icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-left: 12px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.rightSetting {
  position: absolute;
  right: 0;
  top: 30px;
  display: flex;
  align-items: center;
  flex-direction: row;
  .userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .functionContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 14px;
    img {
      cursor: pointer;
      margin-left: 6px;
      margin-right: 6px;
    }
  }
}
.title {
  position: relative;
  // width: 500px;
  text-align: center;
  background-size: cover;
  color: transparent;
  height: 50px;
  // line-height: 46px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .title-text {
    font-weight: 400;
    font-size: 28px;
    color: #ffffff;
    line-height: 32px;
    background: linear-gradient(180deg, #ffffff 50.2685546875%, #7399d1 100%);
    margin-left: 18px;
    // width: 100%;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
