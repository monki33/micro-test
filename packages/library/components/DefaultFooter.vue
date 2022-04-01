<script setup>
</script>

<template>
  <div class="dda-footer">
    <slot>
      Copyright © 2022 APD Dept.
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.dda-footer{
  padding: var(--py) var(--px);
  text-align: center;
  font-size: var(--size-sm);
  color: #999;
}
</style>
