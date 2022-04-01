<script setup>
const emit = defineEmits(['update:modelValue'])
const title = ref('添加部门')
const deptForm = ref({})
const deptFormRules = ref({
  name: {
    required: true,
    message: '请填写部门名称',
    trigger: 'blur',
  },
})
const deptFormRef = ref(null)
const submit = () => {

}
const closeDialog = () => {
  emit('update:modelValue', false)
}
</script>
<template>
  <el-dialog :title="title" destroy-on-close width="35%" @close="closeDialog">
    <el-form
      ref="deptFormRef"
      :model="deptForm"
      :rules="deptFormRules"
    >
      <el-form-item label="上级部门">
        顶级
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="deptForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>
