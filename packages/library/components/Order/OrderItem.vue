<script setup>
import OrderIcon from './OrderIcon.vue'
const emits = defineEmits(['detail'])
const props = defineProps({
  info: {
    type: Object,
    require: true,
  },
})
const detail = (info) => {
  emits('detail', info)
}
</script>
<template>
  <div class="item">
    <div class="setting">
      <slot name="setting" />
    </div>
    <el-card class="item-card" shadow="hover" @click="detail(info)">
      <order-icon :color="info.color" :icon="info.icon" />
      <h3 class="ellipse">
        <!-- <el-tag v-if="info.type==='flow'">
          流程
        </el-tag>
        <el-tag v-else-if="info.type==='form'" type="warning">
          表单
        </el-tag> -->
        {{ info.name }}
      </h3>
      <em class="ellipse">{{ info.remark || '暂无说明' }}</em>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.item {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  cursor: pointer;
  margin-bottom: 15px;
}
:deep(.el-card__body) {
  padding: 0;
}
.item-card {
  width: 100%;
  height: 150px;
  padding: 0 15px;
  box-sizing: border-box;
  :deep(.order-icon) {
    margin: 20px 0 15px 0;
  }
  :deep(.el-tag) {
    margin-right: 5px;
  }
  h3 {
    height: 28px;
    font-weight: normal;
  }
  em {
    width: 100%;
    font-style: normal;
    display: inline-block;
    margin-top: 5px;
    height: 25px;
    font-size: 12px;
    color: #666;
  }
}
.item-card:hover {
  background: url("../../assets/images/card-bg.png") no-repeat right top;
}
.setting {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>
