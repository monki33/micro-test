<script setup>
import Auth from '../utils/auth'
import { systemName } from '../config/system'
import Logo from './Logo.vue'
import ConfigBrandColor from './ConfigBrandColor.vue'
import ConfigDarkMode from './ConfigDarkMode.vue'
const isMicroApp = window.__MICRO_APP_BASE_APPLICATION__
const props = defineProps({
  // 系统名称
  logoName: {
    type: String,
    default: systemName,
  },
  // 点击logo跳转的路由路径或路由对象，默认 '/'
  logoPath: {
    type: String || Object,
    default: '/',
  },
  // 头部导航菜单 code/icon/name/router
  navData: {
    type: Array,
  },
})
const emit = defineEmits(['headerLogoClick'])
const router = useRouter()
const store = useStore()
// 点击logo时触发事件
const clickLogo = () => {
  if (props.logoPath)
    router.push(props.logoPath)

  emit('headerLogoClick')
}
// 外观设置面板是否选中
const isConfigActive = ref(false)
// 用户面板是否选中
const isUserActive = ref(false)
// 当前是否登录
const isLogin = computed(() => store.state.auth?.user?.id)
// 用户信息
const userInfo = computed(() => store.state.auth?.user)
// 用户头像
const userAvatar = userInfo?.avatar ? userInfo.avatar : new URL('../assets/images/avatar.png', import.meta.url).href
// 退出登录
const logout = () => {
  router.replace('/login')
  store.commit('auth/setUserInfo', {})
  Auth.removeAll()
}
</script>

<template>
  <div :class="isMicroApp ? 'dda-header' : 'dda-header header-sub'">
    <div class="header-left">
      <slot name="headerLeft">
        <div
          class="header-logo"
          @click="clickLogo"
        >
          <logo
            :logo-name="logoName"
            :show-logo="false"
          />
        </div>
      </slot>
    </div>
    <div class="header-middle">
      <slot name="headerMiddle">
        <div
          v-if="navData && navData.length"
          class="header-nav"
        >
          <router-link
            v-for="item in navData"
            :key="item.code"
            :to="item.router"
            class="text-item header-nav-item"
          >
            <div v-if="item.icon" class="item-icon">
              <i :class="item.icon" />
            </div>
            <div class="item-name">
              {{ item.name }}
            </div>
          </router-link>
        </div>
      </slot>
    </div>
    <div class="header-right">
      <slot name="headerRight">
        <slot name="headerUser">
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
                  <i class="ri-arrow-down-s-line" />
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
              <slot name="headerNavExtra" />
              <div class="nav-item">
                账号设置
              </div>
              <div
                class="nav-item"
                @click="logout"
              >
                退出登录
              </div>
            </div>
          </el-popover>
          <div v-else class="header-user">
            <el-button type="primary" round>
              用户登录
            </el-button>
          </div>
        </slot>
        <div class="header-toolbar">
          <slot name="headerToolbarExtra" />
          <el-popover
            trigger="click"
            placement="bottom-end"
            :width="320"
            :show-arrow="false"
            @show="isConfigActive = true"
            @hide="isConfigActive = false"
          >
            <template #reference>
              <div
                class="icon-item"
                :class="{ active: isConfigActive }"
              >
                <i class="ri-palette-fill" />
              </div>
            </template>
            <div class="popover-header">
              <div class="header-title">
                显示设置
              </div>
              <div class="header-info">
                个性化配置系统颜色和背景
              </div>
            </div>
            <div class="popover-title">
              颜色
            </div>
            <div class="popover-content">
              <config-brand-color />
            </div>
            <div class="popover-title">
              背景
            </div>
            <div class="popover-content">
              <config-dark-mode />
            </div>
          </el-popover>
          <div class="icon-item">
            <i class="ri-notification-3-fill" />
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dda-header{
  // 头部背景色
  --color-bg-header: rgba(255, 255, 255, .3);
  // 头部阴影
  --shadow-header: 0 10px 30px 0 rgba(82, 63, 105, .05);
  // 头部文字颜色
  --color-text-header: var(--color-text);
  // 头部工具栏文字颜色
  --color-text-header-item: var(--color-text-secondary);
  // 头部工具栏悬浮/选中文字色
  --color-text-header-item-active: var(--color-primary);
  // 头部工具栏悬浮/选中背景色
  --color-bg-header-item-active-start: var(--color-brand-100);
  --color-bg-header-item-active-end: var(--color-brand-50);
}
[data-color-scheme="dark"] .dda-header{
  // 头部背景色
  --color-bg-header: rgba(29,29,31,0.3);
  // 头部阴影
  --shadow-header: none;
  // 头部工具栏悬浮/选中文字色
  --color-text-header-item-active: var(--color-text-inverse-primary);
  // 头部工具栏悬浮/选中背景色
  --color-bg-header-item-active-start: var(--color-brand-800);
  --color-bg-header-item-active-end: var(--color-brand-500);
}
.dda-header{
  $headerItemSize: 40px;
  position: sticky;
  left: 70px;
  top: 0;
  display: flex;
  width: calc(100% - 70px);
  height: 60px;
  align-items: center;
  color: var(--color-text-header);
  background: var(--color-bg-header);
  backdrop-filter: saturate(80%);
  .icon-item{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $headerItemSize;
    height: $headerItemSize;
    font-size: 20px;
    color: var(--color-text-header-item);
    cursor: pointer;
    transition: var(--transition-time) ease-in;
    &>*{
      position: relative;
    }
    &+.icon-item{
      margin-left: var(--px-sm);
    }
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
    &:hover,
    &.active{
      color: var(--color-text-header-item-active);
      transition-timing-function: ease-out;
      &::before{
        opacity: 1;
        transition-timing-function: ease-out;
      }
    }
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
  .header-left,
  .header-right{
    flex: none;
    display: flex;
    align-items: center;
    min-width: 280px;
    height: 100%;
    padding: 0 var(--px);
  }
  .header-right{
    flex-direction: row-reverse;
  }
  .header-middle{
    flex: 1;
    padding: 0 var(--px);
  }
  .header-logo{
    flex: none;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .header-nav{
    display: flex;
    align-items: center;
    justify-content: center;
    .item-name{
      letter-spacing: 2px;
    }
  }
  .header-toolbar{
    display: flex;
    align-items: center;
  }
  .header-user{
    margin-left: var(--px-sm);
  }
}
.header-sub {
  left: 0px!important;
  width: 100%!important;
  background: var(--color-primary-lighten);
  box-shadow: var(--shadow-header);
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
</style>
