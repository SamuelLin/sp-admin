<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const store = useStore()
const { locale } = useI18n({ useScope: 'global' })

function toggleSideBar() {
  store.dispatch('app/toggleSideBar')
}

async function handleClick() {
  await store.dispatch('user/logout')
  router.push(`/login?redirect=${route.fullPath}`)
}

function changeLocale(lang) {
  locale.value = lang
  store.dispatch('app/setLocale', lang)
}
</script>

<template>
  <div class="navbar">
    <Hamburger
      :is-active="!store.getters.sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <Breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <p style="font-size: 14px; margin-top: 20px">{{ $t(store.getters.locale) }}</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="() => changeLocale('en')">{{ $t('en') }}</el-dropdown-item>
            <el-dropdown-item @click="() => changeLocale('zh')">{{ $t('zh') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <p style="font-size: 14px; margin-top: 20px">Lebron</p>
          <el-icon class="el-icon-caret-bottom">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>{{ $t('setting') }}</el-dropdown-item>
            <el-dropdown-item @click="handleClick">{{ $t('logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 2px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
