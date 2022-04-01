<script setup>
import OrderIcon from '@mictest/library/components/Order/OrderIcon.vue'
defineProps({
  appInfo: {
    type: Object,
  },
})
</script>
<template>
  <div class="item">
    <el-card class="item-card" shadow="hover">
      <div style="width: 50px;">
        <order-icon :color="appInfo.color" :icon="appInfo.icon" />
      </div>
      <div class="info">
        <h3 class="ellipse">
          {{ appInfo.name }}
        </h3>
        <em class="ellipse">{{ appInfo.remark || '暂无说明' }}</em>
      </div>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.item {
  position: relative;
  box-sizing: border-box;
  padding: 0 10px;
  cursor: pointer;
  :deep(.el-card__body) {
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
  }
  .info {
    width: calc(100% - 50px);
    margin-left: 10px;
    em {
      font-size: 12px;
      color: #666;
      display: block;
      width: 100%;
      font-style: normal;
      margin-top: 6px;
    }
  }
}
.item-card:hover {
  background-image: url("../../assets/images/card-bg.png");
  background-repeat: no-repeat;
  background-position: right top;
  background-size: 182px 113px;
}
</style>
