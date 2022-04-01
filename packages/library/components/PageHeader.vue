<script setup>
defineProps({
  pageName: String,
})
const route = useRoute()
</script>

<template>
  <div class="page-header flex justify-between">
    <div class="header-left">
      <i class="ri-grid-fill" />
      <div class="page-name">
        {{ pageName || route?.meta?.pageName || '' }}
      </div>
    </div>
    <div class="header-right">
      <slot name="headerRight" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-header{
  height: 57px;
  border-bottom: 1px var(--color-border-secondary) solid;
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
    display: flex;
    justify-content: flex-end;
  }
  .header-left{
    font-size: 16px;
    font-weight: 500;
    i {
      margin-right: 8px;
    }
  }
}
</style>
