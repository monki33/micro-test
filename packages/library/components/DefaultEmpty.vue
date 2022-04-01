<script setup>
const props = defineProps({
  resultType: {
    type: String,
    default: 'empty',
  },
  resultTitle: String,
  resultContent: String,
})

// 微前端vite模式下，静态资源的路径使用方式
const permission = new URL('../assets/images/empty/none-permisson.png', import.meta.url).href
const todo = new URL('../assets/images/empty/none-padding.png', import.meta.url).href
const expire = new URL('../assets/images/empty/over-time.png', import.meta.url).href
const notFound = new URL('../assets/images/empty/not-found.png', import.meta.url).href
const empty = new URL('../assets/images/empty/empty.png', import.meta.url).href
const success = new URL('../assets/images/empty/sub-success.png', import.meta.url).href
// 类型对应图片数据
const imgType = {
  todo,
  expire,
  404: notFound,
  permission,
  empty,
  success,
}
const imgUrl = ref(imgType[props.resultType])
</script>

<template>
  <div class="dda-result">
    <el-empty :description="resultTitle" :image="imgUrl" :image-size="320">
      <slot name="content">
        <div v-if="resultContent" class="result-content">
          {{ resultContent }}
        </div>
      </slot>
      <slot name="more" />
    </el-empty>
  </div>
</template>

<style scoped lang="scss">
.dda-result {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  :deep(.el-empty__description) {
    margin-top: -64px;
    p{
      font-size: var(--size-lg);
      color: var(--color-text-primary);
    }
  }
  :deep(.el-empty__bottom){
    margin-top: var(--py-md);
  }
  .result-content{
    margin-bottom: var(--py-md);
    color: var(--color-text-secondary);
  }
}
</style>
