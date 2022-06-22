<script setup>
import { useStore } from 'vuex'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const store = useStore()
const locale = store.getters.locale === 'en' ? en : zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
