

<script setup lang='ts'>
import { useRoute } from "vue-router";
const route = useRoute();
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
  >
    <div class="new-detail-container">
      <div class="flex justify-center items-center">
        <h1 class="text-[62px] font-bold">{{ route.query.Title }}</h1>
      </div>

      <div class="text-[20px]">
        <span class="text-[20px] text-[red]">摘要：</span
        >{{ route.query.Summary }}
      </div>

      <div class="text-[20px] mt-[16px]">
        <span class="text-[20px] text-[red]">正文：</span
        >{{ route.query.Content }}
      </div>
    </div>
  </scale-screen>
</template>
    

    
<style lang="scss" scoped>
.new-detail-container {
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
}
</style>