<script setup>
import DefaultHeader from '@mictest/library/components/DefaultHeader.vue'
import DefaultSidebar from '@mictest/library/components/DefaultSidebar.vue'
const route = useRoute()
const currentNavs = ref({})
const menuActive = ref(route.path)
const navs = {
  workorder: {
    path: '/workorder',
    name: '工单',
    menus: [
      {
        name: '创建工单',
        code: 'create',
        icon: 'ri-draft-line',
        path: '/workorder/',
      },
      {
        name: '我的待办',
        code: 'todo',
        icon: 'ri-todo-line',
        path: '/workorder/Todo',
      },
      {
        name: '我的经办',
        code: 'mydo',
        icon: 'ri-task-line',
        path: '/workorder/Mydo',
      },
      {
        name: '我的发起',
        code: 'create',
        icon: 'ri-send-plane-2-line',
        path: '/workorder/MyCreate',
      },
    ],
  },
  project: {
    path: '/project',
    name: '项目',
    menus: [{
      name: '我负责的',
      code: 'manage',
      icon: 'ri-wallet-3-line',
      path: '/project/',
    }, {
      name: '我参与的',
      code: 'partin',
      icon: 'ri-bank-card-line',
      path: '/project/Partin/',
    }, {
      name: '项目地图',
      code: 'map',
      icon: 'ri-treasure-map-line',
      path: '/project/Map/',
    }],
  },
}
const handleCurrentNav = (path) => {
  const pathArr = path && path.split('/')
  currentNavs.value = navs[pathArr?.[1]]
}
handleCurrentNav(menuActive.value)

watch(() => route.path, (val) => {
  menuActive.value = route.path
  handleCurrentNav(menuActive.value)
})
</script>
<template>
  <div class="layout-default">
    <default-header logo-path="/" />
    <default-sidebar />
    <main>
      <div class="subapp-wrapper flex justify-start">
        <div class="subapp-menus">
          <div class="subject flex justify-between">
            <router-link :to="currentNavs.path">
              <p>{{ currentNavs.name }}</p>
            </router-link>
            <!-- <el-button type="primary" class="short-btn">
              <i class="ri-add-line" />
            </el-button> -->
          </div>
          <div class="menus">
            <el-menu :default-active="menuActive" router :unique-opened="true">
              <el-menu-item v-for="nav in currentNavs.menus" :key="nav.code" :index="nav.path" :route="{path: nav.path}">
                <template #title>
                  <span><i :class="nav.icon" /></span>
                  <span>{{ nav.name }}</span>
                </template>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <div class="subapp-main">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>
<style lang="scss" scoped>
.layout-default {
  background: url("../assets/images/bg.jpg") no-repeat center top #f7f9fc;
}
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
}
</style>
