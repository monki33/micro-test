<script setup>
defineProps({
  direction: {
    type: String,
    default: 'horizontal',
  },
  logoName: {
    type: String,
  },
  showLogo: {
    type: Boolean,
    default: true,
  },
})
const logo = new URL('../assets/images/logo-blue.png', import.meta.url).href
</script>

<template>
  <div class="dda-logo">
    <template v-if="showLogo">
      <img :src="logo">
    </template>
    <div class="logo-system">
      <div class="system-name">
        {{ logoName }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dda-logo{
  display: flex;
  align-items: center;
  .logo-image{
    width: 40px;
    height: 40px;
    margin-right: var(--px-sm);
  }
  img {
    width: 32px;
    height: 30px;
    margin-right: 6px;
  }
  .logo-system{
    .system-name{
      letter-spacing: 1px;
      font-size: var(--size-xl);
      color: var(--color-text-primary);
    }
    .system-info{
      font-size: var(--size-sm);
      color: var(--color-text-secondary);
    }
  }
}
</style>
