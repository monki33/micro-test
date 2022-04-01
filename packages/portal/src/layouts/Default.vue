<script setup>
import DefaultHeader from '@mictest/library/components/DefaultHeader.vue'
import DefaultSidebar from '@mictest/library/components/DefaultSidebar.vue'
</script>
<template>
  <div class="layout-default">
    <default-header logo-path="/" />
    <default-sidebar />
    <main>
      <router-view />
    </main>
  </div>
</template>
<style lang="scss" scoped>
.layout-default {
  background: url("../assets/images/bg.jpg") no-repeat center top #f7f9fc;
}
</style>
