<script setup>
defineProps({
  subject: {
    type: Object,
  },
})
const emits = defineEmits(['rightClick'])
const rightClick = () => {
  emits('rightClick')
}
</script>
<template>
  <div class="subject flex justify-between">
    <div class="subject-left">
      <span :style="{backgroundColor: subject.bgColor}"><i :class="subject.icon" /></span>
      <p>
        <slot name="title" />
      </p>
    </div>
    <div class="subject-right" @click="rightClick">
      <slot name="right" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.subject {
  width: 100%;
  height: 26px;
  line-height: 26px;
  .subject-left {
    display: flex;
    justify-content: flex-start;
    flex: 1;
    span {
      display: inline-block;
      width:26px;
      height:26px;
      line-height: 26px;
      border-radius:8px;
      text-align: center;
      i {
        color: #fff;
        font-size: 16px;
      }
    }
    p {
      font-size: 16px;
      font-weight: 600;
      margin-left: 10px;
    }
  }
  .subject-right {
    width: 90px;
    text-align: right;
    font-size: 12px;
    color: #666;
    cursor: pointer;
  }
}
</style>
