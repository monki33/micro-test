<script setup>
import DefaultHeader from '@mictest/library/components/DefaultHeader.vue'
import DefaultSidebar from '@mictest/library/components/DefaultSidebar.vue'
const route = useRoute()
const currentNavs = ref({})
const menuActive = ref(route.path)
const addDeptVisible = ref(false)
const navs = [
  {
    name: '常用联系人',
    code: 'common',
    icon: 'ri-user-heart-line',
    bgColor: '#3296FA',
    path: '/contacts/',
  },
  {
    name: '我的好友',
    code: 'friends',
    icon: 'ri-group-line',
    bgColor: '#15BC83',
    path: '/contacts/Friends',
  },
  {
    name: '我的群组',
    code: 'group',
    icon: 'ri-team-line',
    bgColor: '#FD9E28',
    path: '/contacts/Group',
  },
]
const depts = ref([{
  id: 1,
  name: '前端开发一部',
  path: '/contacts/dept/1',
}, {
  id: 2,
  name: '前端开发二部',
  path: '/contacts/dept/2',
}, {
  id: 3,
  name: '前端开发三部',
  path: '/contacts/dept/3',
}, {
  id: 4,
  name: '前端开发四部',
  path: '/contacts/dept/4',
}])
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
            <router-link to="/contacts">
              <p>通讯录</p>
            </router-link>
          </div>
          <div class="menus">
            <el-menu :default-active="menuActive" router :unique-opened="true">
              <el-menu-item v-for="nav in navs" :key="nav.code" :index="nav.path" :route="{path: nav.path}">
                <template #title>
                  <span class="bg" :style="{backgroundColor: nav.bgColor}"><i :class="nav.icon" /></span>
                  <span>{{ nav.name }}</span>
                </template>
              </el-menu-item>
            </el-menu>
            <!--部门-->
            <div class="depts">
              <el-scrollbar>
                <el-menu :default-active="menuActive" router :unique-opened="true">
                  <el-menu-item v-for="dept in depts" :key="dept.id" :index="dept.path" :route="{path: dept.path}">
                    <template #title>
                      <span class="bg"><i class="ri-organization-chart" /></span>
                      <span>{{ dept.name }}</span>
                    </template>
                  </el-menu-item>
                </el-menu>
              </el-scrollbar>
            </div>
            <el-button style="width:100%;" @click="addDeptVisible = true">
              <i class="ri-add-line" />创建部门
            </el-button>
          </div>
        </div>
        <div class="subapp-main">
          <router-view />
        </div>
      </div>
    </main>
    <dept-info-dialog v-model="addDeptVisible" />
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
  .bg {
    background: #BCBCBC;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: var(--border-radius);
    i {
      color: #fff;
    }
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
.depts {
  padding-top: 10px;
  margin-top: 10px;
  height: calc(100vh - 305px);
  border-top: 1px #EAEBED solid;
}
</style>
