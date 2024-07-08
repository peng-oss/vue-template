import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
// import { storeToRefs } from 'pinia';
export const useSettingStore = defineStore('setting', () => {
  const isScale = ref(true);//是否进行全局适配

  const userName = ref<undefined|string>(undefined)
 
  const setUserName = (name?: string) => {
    userName.value = name
  }

  return {  userName, isScale, setUserName ,  }
})
