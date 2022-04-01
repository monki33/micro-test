<script setup>
defineProps({
  contact: {
    type: Object,
  },
  bgColor: {
    type: String,
    default: 'rgb(50, 150, 250)',
  },
})
const emits = defineEmits(['contactDetail'])
const contactDetail = () => {
  emits('contactDetail')
}
</script>
<template>
  <div class="contact-item-wrapper">
    <div class="contact-item flex justify-start" @click="contactDetail">
      <template v-if="contact?.headPhoto">
        <p v-if="contact.type ==='group'" class="group-icon">
          <i :class="contact.headPhoto" />
        </p>
        <img v-else :src="contact.headPhoto">
      </template>
      <p v-else :style="{background: bgColor}">
        {{ contact?.name.substr(0, 1) }}
      </p>
      <div class="info">
        <h4>{{ contact?.name }}</h4>
        <span>{{ contact?.dept }}</span>
      </div>
    </div>
    <slot name="actions"></slot>
  </div>
</template>
<style lang="scss" scoped>
.contact-item-wrapper {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 10px;
}
.contact-item {
  p {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    margin-right: 15px;
  }
  .info span {
    font-size: 12px;
    color: #666;
  }
  .info h4 {
    font-weight: normal;
  }
}
.contact-item-wrapper:hover {
  background: #f5f5f5;
  border-radius: 10px;
}
.group-icon {
  background: var(--color-primary-lighten);
  i {
    color: var(--color-primary-hover);
    font-size: 20px;
  }
}
</style>
