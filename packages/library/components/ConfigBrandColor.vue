<script setup>
import Theme from '../utils/theme'
// 颜色列表
const colorData = ref(Theme.getColorList())
// 当前颜色
const currentColor = ref(Theme.getColor())
// 切换颜色
const changeColor = (code) => {
  currentColor.value = code
  Theme.changeThemeColor(code)
}
</script>

<template>
  <div class="config-brand-color">
    <div
      v-for="(value, key) in colorData"
      :key="key"
      class="color-item"
      :class="{ active: key === currentColor }"
      :style="{ 'background-color': value }"
      @click="changeColor(key)"
    >
      <div class="item-check">
        <i class="ri-check-line" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.config-brand-color{
  display: flex;
  align-items: center;
  .color-item{
    flex: 1;
    height: 24px;
    border-radius: var(--border-radius-sm);
    &+.color-item{
      margin-left: var(--px-xs);
    }
    .item-check{
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      color: var(--color-text-inverse-primary);
      cursor: pointer;
      i{
        line-height: 1;
        font-weight: bold;
        font-size: var(--size-lg);
        opacity: 0;
        transition: var(--transition-time) ease-in;
      }
    }
    &.active{
      .item-check{
        i{
          opacity: 1;
          transition-timing-function: ease-out;
        }
      }
    }
  }
}
</style>
