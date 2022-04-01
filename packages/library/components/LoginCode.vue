<script setup>
const qrcUrl = ref(new URL('../assets/images/qrc.png', import.meta.url).href)
</script>

<template>
  <div class="dda-login-form">
    <h3>手机扫码，安全登录</h3>
    <el-image style="width: 150px; height: 150px" :src="qrcUrl" fit="fill" />
    <p>使用 <a>客户端</a> 扫描二维码安全快捷登录</p>
  </div>
</template>

<style lang="scss" scoped>
.dda-login-form {
  text-align: center;
  h3 {
    margin-bottom: 24px;
    color: #333;
  }
  p {
    margin-top: 24px;
    font-size: 12px;
    color: #666;
    a {
      color: var(--el-color-primary);
    }
  }
}
</style>
