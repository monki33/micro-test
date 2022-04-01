<script setup>
import Theme from '../utils/theme'
// 主题列表
const modeList = ref(Theme.getBackgroundList())
// 当前主题模式
const currentMode = ref(Theme.getBackgroundMode())
// 切换主题模式
const changeMode = (modeCode) => {
  currentMode.value = modeCode
  Theme.changeBackgroundMode(modeCode)
}
</script>

<template>
  <div class="config-dark-mode">
    <div
      v-for="item in modeList"
      :key="item.code"
      class="mode-item"
      :class="{ active: currentMode === item.code }"
      @click="changeMode(item.code)"
    >
      <i :class="item.icon" />
      {{ item.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.config-dark-mode{
  display: flex;
  align-items: center;
  padding: 2px;
  border: 1px solid var(--color-primary);
  border-radius: 200px;
  .mode-item{
    flex: 1;
    display: flex;
    height: 28px;
    align-items: center;
    justify-content: center;
    font-size: var(--size-sm);
    color: var(--color-text-secondary);
    border-radius: 200px;
    cursor: pointer;
    transition: var(--transition-time) ease-in;
    i{
      margin-right: var(--px-xs);
      font-size: var(--size-md);
    }
    &:hover{
      color: var(--color-primary);
      transition-timing-function: ease-out;
    }
    &.active{
      color: var(--color-text-inverse-primary);
      background-color: var(--color-primary);
      transition-timing-function: ease-out;
    }
  }
}
</style>
