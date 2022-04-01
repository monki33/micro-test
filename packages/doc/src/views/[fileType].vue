<script setup>
import Error404 from '@mictest/library/components/Error/Error404.vue'
const props = defineProps({
  fileType: String,
})
const fileTypeOption = {
  doc: '文档',
  image: '图片',
  audio: '音频',
  video: '视频',
  other: '其他',
}
const currentPageName = computed(() => {
  return fileTypeOption[props.fileType]
})
</script>

<template>
  <file-list v-if="fileTypeOption[props.fileType]" :page-name="currentPageName" />
  <error-404 v-else />
</template>

<style lang="scss" scoped>
</style>
