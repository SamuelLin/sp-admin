<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
const permissionRoutes = store.getters.permission_routes

const handleOpen = (key, keyPath) => {}
const handleClose = (key, keyPath) => {}

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<template>
  <el-scrollbar height="100vh" style="background-color: #545c64">
    <el-menu
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      style="border-right: none"
      router
      :default-active="activeMenu"
      :collapse="store.getters.sidebar.opened"
      @open="handleOpen"
      @close="handleClose"
    >
      <BaseSideItem
        v-for="route in permissionRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
      <!-- <el-menu-item index="/home">
        <el-icon>
          <House />
        </el-icon>
        <template #title>Home</template>
      </el-menu-item>
      <el-sub-menu index="/permission">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Permission</span>
        </template>
        <el-menu-item index="/permission/page">Page Permission</el-menu-item>
        <el-menu-item index="/permission/directive">Page Directive</el-menu-item>
        <el-menu-item index="/permission/role">Page Role</el-menu-item>
      </el-sub-menu> -->
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
