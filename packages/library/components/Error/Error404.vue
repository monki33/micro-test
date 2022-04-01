<script setup>
</script>

<template>
  <div class="error">
    <div class="error-title">
      404
    </div>
    <div class="error-info">
      未找到对应的页面
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  .error-title{
    font-size: 64px;
    letter-spacing: 4px;
    color: var(--color-primary);
  }
}
</style>
