<script setup>
const emit = defineEmits(['update:modelValue'])
const selectedUser = ref([])
const allUsers = ref([
  {
    id: 1,
    name: '张三',
    dept: '应用规划处',
  },
  {
    id: 2,
    name: '李四',
    dept: '应用规划处',
  },
  {
    id: 3,
    name: '王五',
    dept: '应用规划处',
  },
  {
    id: 4,
    name: '赵六',
    dept: '应用规划处',
  },
])
const submit = () => {

}
const closeDialog = () => {
  emit('update:modelValue', false)
}
</script>
<template>
  <el-dialog title="部门成员" destroy-on-close @close="closeDialog">
    <el-transfer
      v-model="selectedUser"
      filterable
      :titles="['部门人员', '选中']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :props="{
        key: 'id',
        label: 'name',
      }"
      :data="allUsers"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
:deep(.el-transfer-panel) {
  flex: 1;
}
</style>
