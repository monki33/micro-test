<script setup>
import Micro from '@mictest/library/utils/micro'
import Error404 from '@mictest/library/components/Error/Error404.vue'
const props = defineProps({
  app: {
    type: String,
  },
})
const appInfo = computed(() => Micro.getMicroInfo(props.app))
</script>

<template>
  <micro-app
    v-if="appInfo"
    :name="appInfo.app"
    :url="`${appInfo.host}/${appInfo.base}/`"
    inline
    disablesandbox
  />
  <error-404 v-else />
</template>

<style lang="scss" scoped>
</style>
