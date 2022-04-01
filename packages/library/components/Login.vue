
<template>
  <div class="dda-login">
    <div class="login-main">
      <div class="login-image hidden-md-and-down">
        <el-carousel :interval="6000" trigger="click" arrow="never" indicator-position="none" height="600px">
          <el-carousel-item v-for="item in loginImage" :key="item.id" :style="{ background: `url('${item.url}') center center no-repeat` }">
            <div class="el-carousel__text">
              {{ item.title }}
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="login-panel">
        <div class="login-title">
          <logo />
        </div>
        <div class="login-switch">
          <el-checkbox v-model="loginEquipment">
            <i v-if="loginEquipment" class="ri-qr-code-line" />
            <i v-else class="ri-mac-line" />
          </el-checkbox>
        </div>
        <div v-if="loginEquipment" class="login-tablature">
          <el-tabs>
            <el-tab-pane label="密码登录">
              <login-form />
            </el-tab-pane>
            <el-tab-pane label="免密登录">
              <login-phone />
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-else class="login-code">
          <login-code />
        </div>
      </div>
      <div class="login-footer">
        <default-footer />
      </div>
    </div>
  </div>
</template>
<script setup>
import Logo from './Logo.vue'
import LoginForm from './LoginForm.vue'
import LoginPhone from './LoginPhone.vue'
import LoginCode from './LoginCode.vue'
import DefaultFooter from './DefaultFooter.vue'
const loginEquipment = ref(true)
const loginImage = ref([
  {
    id: 1,
    title: '1',
    url: new URL('../assets/images/login-img-01.png', import.meta.url).href,
  },
  {
    id: 2,
    title: '2',
    url: new URL('../assets/images/login-img-02.png', import.meta.url).href,
  },
  {
    id: 3,
    title: '3',
    url: new URL('../assets/images/login-img-03.png', import.meta.url).href,
  },
])
</script>

<style lang="scss" scoped>
.dda-login{
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f2f4f6;
  .login-main{
    display: flex;
    flex: 1;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

  }
  .login-panel{
    position: relative;
    flex: 0 0 460px;
    padding: 70px;
    background-color: #fff;
    min-height: 540px;
    box-shadow: 0px 0px 50px #DBE4F9;
  }
  .login-image {
    flex: 0 0 780px;
    // width: 100%;
    :deep(.el-carousel) {
      .el-carousel__item {
        opacity: 0;
        transition: opacity 2s !important;
        .el-carousel__text {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 40px;
          text-align: center;
          font-size: 18px;
          color: #666;
        }
      }
      .el-carousel__item.is-animating {
        opacity: 1;
      }
    }
  }
  .login-title{
    margin-bottom: var(--py-md);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-subtitle{
    margin-bottom: var(--py-lg);
    font-weight: 500;
    font-size: var(--size-page-title);
  }
  .login-switch {
    position: absolute;
    top: 0;
    right: 0;
    :deep(.el-checkbox) {

      display: block;
      height: auto;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        border-width: 34px;
        border-style: solid;
        border-color: var(--el-color-primary) var(--el-color-primary) transparent transparent;
        z-index: 0;
      }
      .el-checkbox__input {
        display: none;
      }
      .el-checkbox__label {
        position: relative;
        padding: 4px;
        font-size: 44px;
        color: #fff;
        z-index: 1;
      }
    }
  }
  .login-tablature {
    flex: 1;
    width: 100%;
    :deep(.el-tabs) {
      .el-tabs__header {
        margin-bottom: 20px;
      }
      .el-tabs__nav {
        float: none;
      }
      .el-tabs__item {
        padding: 0 !important;
        width: 50%;
        text-align: center;
        font-weight: normal;
        font-size: 15px;
      }
    }
  }
  .login-footer{
    width: 100%;
  }
}
</style>
<style lang="scss">
html,body {
  background-color: #f2f4f6;
}

</style>
