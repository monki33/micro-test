<template>
  <ul class="side-bar">
    <router-link to="/" class="logo">
      <img :src="logoUrl">
    </router-link>
    <!--桌面-->
    <li>
      <router-link to="/">
        <span><i class="ri-home-3-line" /></span>
      </router-link>
    </li>
    <!--文档-->
    <li>
      <router-link to="/doc/#/">
        <span><i class="ri-upload-cloud-2-line" /></span>
      </router-link>
    </li>
  </ul>
</template>
<script setup>
const logoUrl = new URL('../assets/images/logo.png', import.meta.url).href
</script>
<style lang="scss" scoped>
.side-bar {
  position: fixed;
  left: 0;
  right: 0;
  width: 70px;
  height: 100vh;
  background: var(--color-primary);
  .logo {
    display: block;
    text-align: center;
    margin-top: 16px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  i {
    font-size: 22px;
    margin-left: 17px;
  }
  li, a {
    display: inline-block;
    width: 100%;
    height: 44px;
    line-height: 44px;
    color: rgba($color: #fff, $alpha: .8);
    display: flex;
    cursor: pointer;
  }
  li {
    margin-left: 7px;
    margin-top: 17px;
    width: calc(100% - 7px);
  }
  .selected {
    $activeBgColor: #f7f9fc;
    $activeRadius: 16px;
    position: relative;
    background-color: $activeBgColor;
    border-top-left-radius: $activeRadius;
    border-bottom-left-radius: $activeRadius;
    &::before,
    &::after{
      content: '';
      position: absolute;
      right: 0;
      display: block;
      width: $activeRadius;
      height: $activeRadius;
    }
    &::before{
      bottom: 100%;
      background-image: radial-gradient(200px at 0 0, var(--color-primary) $activeRadius, $activeBgColor $activeRadius);
    }
    &::after{
      top: 100%;
      background-image: radial-gradient(200px at 0 $activeRadius, var(--color-primary) $activeRadius, $activeBgColor $activeRadius);
    }
    i {
      color: var(--color-primary);
    }
  }
}
</style>
