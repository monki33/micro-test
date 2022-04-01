<script setup>
defineProps({
  color: {
    type: String,
    default: 'linear-gradient(#f4cf54,#e89121)',
  },
  icon: {
    type: String,
    default: 'ri-file-text-line',
  },
})
</script>
<template>
  <p :style="{background: color}" class="order-icon">
    <i :class="icon" />
  </p>
</template>
<style lang="scss" scoped>
.order-icon {
  width: 46px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  border-radius: 4px;
  i {
    font-size: 24px;
    color: #fff;
  }
}
</style>
