

<script setup lang='ts'>
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { useSettingStore } from "@/stores/index";
import { userLogin } from "@/api";
import axios from "axios";
import { ElMessage } from "element-plus";
import { el } from "element-plus/es/locale";
import { useRouter } from "vue-router";
import { use } from "echarts";

// import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
const settingStore = useSettingStore();
const { setUserName } = useSettingStore();
const { userName } = storeToRefs(settingStore);
//创建一个变量loading
const loading = ref(false);
//改变loading状态
const changeLoading = () => {
  loading.value = !loading.value;
};

const router = useRouter();
const wrapperStyle = {};
const onSubmit = async () => {
  changeLoading();

  const response = await userLogin({
    username: form.username,
    passwd: form.passwd,
  });

  if (response.message === "success") {
    ElMessage({
      message: "登录成功",
      type: "success",
    });

    localStorage.setItem("username", form.username);
    setUserName(form.username);
    router.push({ path: "/index" });
  } else {
    ElMessage({
      message: `登录失败${response.message}`,
      type: "error",
    });
  }

  changeLoading();
};

const form = reactive({
  username: "",
  passwd: "",
  type: false,
});
</script>
<template>
  <scale-screen
    width="1920"
    height="1080"
    :delay="500"
    :fullScreen="true"
    :boxStyle="{
      background: '#03050C',
      overflow: 'auto',
    }"
    :wrapperStyle="wrapperStyle"
    :autoScale="isScale"
  >
    <div class="login-container">
      <div class="login-content">
        <div class="flex flex-row">
          <img src="@/assets/img/login-logo.png" alt="" />

          <div>
            <span class="title">星海灵动</span>
            <div class="subTitle">AI协作，灵动创意！</div>
          </div>
        </div>

        <div class="login-content-form">
          <div class="login-form">
            <el-form :model="form">
              <el-form-item>
                <el-input
                  v-model="form.username"
                  class="login-input"
                  placeholder="请输入账号"
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="form.passwd"
                  class="login-input"
                  placeholder="请输入密码"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="loading"
                  class="login-btn"
                  type="primary"
                  @click="onSubmit"
                  >登录/注册</el-button
                >
              </el-form-item>

              <!-- <el-form-item prop="type">
                <el-checkbox
                  v-model="form.type"
                  value="Online activities"
                  name="type"
                >
                  我已仔细阅读并同意
                </el-checkbox>
              </el-form-item> -->
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </scale-screen>
</template>
    

    
<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  background: url("@/assets/img/login-bg.png") no-repeat;
  background-size: cover;
  background-position: center;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  padding-right: 10%;
  .login-content {
    background: url("@/assets/img/login-content-bg.png") no-repeat;
    background-size: cover;
    background-position: center;

    width: 398px;
    height: 420px;
    padding-top: 60px;
    padding-left: 62px;
    padding-right: 62px;

    .title {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 20px;
      color: #131d34;
      line-height: 24px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-left: 12px;
    }
    .subTitle {
      width: 125px;
      height: 20px;
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #848ea2;
      line-height: 20px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-left: 12px;
      margin-top: 8px;
    }
    img {
      width: 32px;
      height: 24px;
    }

    .login-input {
      width: 326px;
      height: 48px;
      border-color: #f0f3f7;
    }
  }

  .login-btn {
    width: 326px;
    height: 48px;
    background: #1684fc;
    border-radius: 8px 8px 8px 8px;
    margin-top: 32px;
  }

  .login-content-form {
    margin-top: 32px;
  }
}
</style>