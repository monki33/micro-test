<script setup>
import Auth from '../utils/auth'
import { systemName } from '../config/system'
import Logo from './Logo.vue'
const router = useRouter()
const store = useStore()
// 当前是否登录
const isLogin = computed(() => store.state.auth?.user?.id)
// 用户信息
const userInfo = computed(() => store.state.auth?.user)
// 用户头像
const userAvatar = userInfo?.avatar ? userInfo.avatar : new URL('../assets/images/avatar.png', import.meta.url).href
// 用户面板是否选中
const isUserActive = ref(false)
// 去控制台
const goConsole = () => {
  router.replace('/console')
}
// 退出登录
const logout = () => {
  store.commit('auth/setUserInfo', {})
  Auth.removeAll()
}
</script>
<template>
  <div class="web-header flex justify-between">
    <div class="logo">
      <router-link to="/">
        <logo
          :logo-name="systemName"
        />
      </router-link>
    </div>
    <div>
      <el-popover
        v-if="isLogin"
        trigger="click"
        placement="bottom-end"
        :width="240"
        :show-arrow="false"
        @show="isUserActive = true"
        @hide="isUserActive = false"
      >
        <template #reference>
          <div
            class="header-user text-item"
            :class="{ active: isUserActive }"
          >
            <div class="item-avatar">
              <img :src="userAvatar" alt="avatar">
            </div>
            <div class="item-name">
              {{ userInfo.name }}
            </div>
          </div>
        </template>
        <div class="user-info">
          <div class="user-avatar">
            <img :src="userAvatar" alt="avatar">
          </div>
          <div class="user-main">
            <div class="user-name">
              {{ userInfo.name }}
            </div>
            <div class="user-email">
              {{ userInfo.email }}
            </div>
          </div>
        </div>
        <div class="user-nav">
          <div class="nav-item" @click="goConsole">
            控制台
          </div>
          <div class="nav-item" @click="logout">
            退出登录
          </div>
        </div>
      </el-popover>
      <div v-else class="to-login">
        <router-link :to="{path: '/login'}">
          <i class="ri-user-line" />&nbsp;登录
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$headerItemSize: 40px;
.web-header {
  height: 60px;
  padding: 6px 20px 0 20px;
  border-bottom: 1px solid #f3f3f3;
}
.logo {
  margin-top: 10px;
}
.text-item{
  position: relative;
  flex: none;
  display: flex;
  align-items: center;
  height: $headerItemSize;
  padding: 0 var(--px);
  color: var(--color-text-header);
  cursor: pointer;
  transition: var(--transition-time) ease-in;
  &::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg, var(--color-bg-header-item-active-start) 0%, var(--color-bg-header-item-active-end) 100%);
    border-radius: var(--border-radius);
    opacity: 0;
    transition: var(--transition-time) ease-in;
  }
  &>*{
    position: relative;
  }
  &.header-user{
    height: auto;
    padding: var(--py-sm) var(--px-sm);
  }
  .item-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    height: $headerItemSize;
    margin-right: var(--px-sm);
    color: var(--color-text-header-item);
    font-size: 18px;
    transition: var(--transition-time) ease-in;
  }
  .item-avatar{
    width: 32px;
    height: 32px;
    margin-right: var(--px-sm);
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  &+.text-item{
    margin-left: var(--px-sm);
  }
  &:hover,
  &.active,
  &.router-link-active{
    color: var(--color-text-header-item-active);
    transition-timing-function: ease-out;
    &::before{
      opacity: 1;
      transition-timing-function: ease-out;
    }
    .item-icon{
      color: var(--color-text-header-item-active);
      transition-timing-function: ease-out;
    }
  }
}
.user-info{
  display: flex;
  align-items: center;
  .user-avatar{
    width: 48px;
    height: 48px;
    margin-right: var(--px-sm);
    background-color: var(--color-primary-lighten);
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .user-main{
    flex: 1;
    overflow: hidden;
  }
  .user-name{
    font-weight: 500;
    color: var(--color-text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-email{
    margin-top: var(--py-xs);
    font-size: var(--size-sm);
    color: var(--color-text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.user-nav{
  position: relative;
  padding-top: var(--py);
  margin-top: var(--py);
  &::before{
    content: '';
    position: absolute;
    left: calc(var(--px) * -1);
    right: calc(var(--px) * -1);
    top: 0;
    height: 1px;
    background-color: var(--color-border);
  }
  .nav-item{
    padding: var(--py-sm) var(--px);
    transition: var(--transition-time) ease-in;
    border-radius: var(--border-radius);
    cursor: pointer;
    &:hover{
      color: var(--color-primary);
      background-color: var(--color-grey-100);
      transition-timing-function: ease-out;
    }
  }
}
.to-login {
  margin-top: 13px;
  a, a:active {
    color: #666;
    display: flex;
    align-items: center;
  }
}
</style>
