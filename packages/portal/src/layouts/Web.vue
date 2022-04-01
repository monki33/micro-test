<script setup>
import WebHeader from '@mictest/library/components/WebHeader.vue'
import WebFooter from '@mictest/library/components/WebFooter.vue'
</script>
<template>
  <div class="web-default">
    <web-header />
    <router-view />
    <web-footer />
  </div>
</template>
<style lang="scss" scoped>
.web-default {
  background: #fff;
}
</style>
