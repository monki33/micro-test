<script setup>
import DefaultHeader from '@mictest/library/components/DefaultHeader.vue'
import DefaultFooter from '@mictest/library/components/DefaultFooter.vue'
const isMicroApp = window.__MICRO_APP_BASE_APPLICATION__
const route = useRoute()
const menuActive = route.path ?? '/'
const navs = ref([
  {
    name: '全部文件',
    code: 'index',
    icon: 'ri-function-line',
    path: '/',
  },
  {
    name: '文档',
    code: 'doc',
    icon: 'ri-file-text-line',
    path: '/doc',
  },
  {
    name: '图片',
    code: 'image',
    icon: 'ri-image-line',
    path: '/image',
  },
  {
    name: '音频',
    code: 'audio',
    icon: 'ri-volume-up-line',
    path: '/audio',
  },
  {
    name: '视频',
    code: 'video',
    icon: 'ri-live-line',
    path: '/video',
  },
  {
    name: '其他',
    code: 'other',
    icon: 'ri-file-3-line',
    path: '/other',
  },
  {
    name: '回收站',
    code: 'recycle',
    icon: 'ri-delete-bin-3-line',
    path: '/recycle',
  },
])
</script>
<template>
  <div class="layout-default">
    <default-header v-if="!isMicroApp" />
    <div class="subapp-wrapper flex justify-start">
      <div class="subapp-menus">
        <div class="subject flex justify-between">
          <p>文件</p>
        </div>
        <div class="menus">
          <el-menu :default-active="menuActive" router :unique-opened="true">
            <template v-for="nav in navs" :key="nav.code">
              <template v-if="nav.children && nav.children.length > 0">
                <el-sub-menu :index="nav.path" :route="{path: nav.path}">
                  <template #title>
                    <span style="margin-right:10px;"><i :class="nav.icon" /></span>
                    <span>{{ nav.name }}</span>
                  </template>
                  <el-menu-item v-for="child in nav.children" :key="child.code" :index="child.path" :route="child.path">
                    {{ child.name }}
                  </el-menu-item>
                </el-sub-menu>
              </template>
              <el-menu-item v-else :index="nav.path" :route="{path: nav.path}">
                <template #title>
                  <span><i :class="nav.icon" /></span>
                  <span>{{ nav.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </div>
      <div class="subapp-main">
        <router-view />
      </div>
    </div>
    <default-footer v-if="!isMicroApp" />
  </div>
</template>
<style lang="scss" scoped>
.menus {
  margin-top: 15px;
  :deep(.el-menu) {
    background-color: transparent;
    border-right: none;
  }
  :deep(.el-menu-item) {
    height: 45px;
    line-height: 45px;
    span:first-child {
      margin-right: 10px;
    }
  }
  :deep(.el-menu-item.is-active) {
    background: #fff;
  }
  :deep(.el-sub-menu.is-active .el-sub-menu__title) {
    color: var(--color-primary);
  }
}
</style>
