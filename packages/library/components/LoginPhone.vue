<script setup>
import VCode from 'vue3-puzzle-vcode'
import md5 from 'md5'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import { apiGetVerifyCode, apiLogin } from '../api/bsp'
import Auth from '../utils/auth'
const router = useRouter()
const store = useStore()
// 校验工具校验状态 0未校验 1校验中 2校验成功 3校验失败
const verifyOption = ref({
  undo: 0,
  doing: 1,
  success: 2,
  failed: 3,
})
// 当前校验状态
const currentVerifyStatus = ref(verifyOption.value.undo)
// 调用验证码工具接口
const getVerifyCode = async function() {
  if (currentVerifyStatus.value === verifyOption.value.doing || currentVerifyStatus.value === verifyOption.value.success)
    return false

  currentVerifyStatus.value = verifyOption.value.doing
  try {
    // 调用验证码工具接口
    const result = await apiGetVerifyCode()
    if (result.flag) {
      // 返回flag，将校验状态置为true
      currentVerifyStatus.value = verifyOption.value.success
    }
    else {
      // 设置验证码组件显示失败
      currentVerifyStatus.value = verifyOption.value.failed
    }
  }
  catch (e) {
    // 设置验证码组件显示失败
    currentVerifyStatus.value = verifyOption.value.failed
  }
}
// 校验按钮类别
const verifyBtnType = computed(() => {
  if (currentVerifyStatus.value === verifyOption.value.success)
    return 'success'

  else if (currentVerifyStatus.value === verifyOption.value.failed)
    return 'danger'

  else return ''
})
// 校验工具是否显示
const isVerifyShow = ref(false)
// 显示校验工具
const showVerify = () => {
  if (currentVerifyStatus.value === verifyOption.value.doing || currentVerifyStatus.value === verifyOption.value.success)
    return false

  isVerifyShow.value = true
}
// 校验工具关闭
const verifyClose = () => {
  isVerifyShow.value = false
}
// 校验工具成功
const verifySuccess = () => {
  verifyClose() // 验证成功，手动关闭模态框
  getVerifyCode()
}
// 显示校验工具提示
const verifyNoticeVisible = ref(false)
// 登录表单
const loginForm = ref({
  // 用户名
  phone: '',
  // 密码
  code: '',
  // 是否记住密码
  remember: true,
})
// 登录表单ref
const loginFormRef = ref(null)
// 验证手机号是否合法
const checkPhone = (rule, value, callback) => {
  const reg = /^0?(13[0-9]|15[012356789]|18[0-9]|14[578]|16[6]|17[035768]|19[19])[0-9]{8}$/
  if (reg.test(value)) return callback()
  // eslint-disable-next-line node/no-callback-literal
  callback('')
}
// 校验规则
const rules = ref({
  phone: [{ required: true, validator: checkPhone, message: '请输入合法的手机号', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' },
  ],
})
// 登录中状态
const currentLoginStatus = ref(true)
// 登录交互
const handleLogin = async function(form) {
  currentLoginStatus.value = true
  try {
    // 调用验证码工具接口
    const result = await apiLogin(form)
    currentLoginStatus.value = false
    if (result.flag) {
      // 登录成功，保存登录数据
      store.commit('auth/setUserInfo', result.user)
      Auth.setToken(result.token)
      Auth.setUserInfo(result.user)
      // 根据用户菜单获取路由及主页path
      // await addAsyncRoutes(router)
      // 跳转主页
      router.replace('/')
    }
    else {
      currentLoginStatus.value = false
      await ElMessageBox.alert(result.msg, '登录失败', {
        type: 'error',
        confirmButtonText: '确定',
        callback: (action) => {
          // 重置验证码组件，以使用户可以再次登录
          currentVerifyStatus.value = verifyOption.value.undo
        },
      })
    }
  }
  catch (e) {
    currentLoginStatus.value = false
    ElMessage.error(`${e.name}:${e.message}`)
    // 重置验证码组件，以使用户可以再次登录
    currentVerifyStatus.value = verifyOption.value.undo
  }
}
// AppCode
const currentAppCode = computed(() => import.meta.env.VITE_APP_CODE)
// 手机验证码
const smsButtonText = ref('获取验证码')
const smsButtonDisabled = ref(false)
// 发送手机验证码
const handleSendSmsCode = () => {
  let count = 60
  const timer = setInterval(() => {
    if (count === 0) {
      clearInterval(timer)
      smsButtonText.value = '获取验证码'
      smsButtonDisabled.value = false
    }
    else {
      smsButtonDisabled.value = true
      smsButtonText.value = `${count}秒后重试`
      count--
    }
  }, 1000)
}
// 获取手机验证码
const handleGetSmsCode = async() => {
  await loginFormRef.value.validateField('phone', (error) => {
    if (error) return
    handleSendSmsCode()
    // let fd = new FormData();  //POST 请求需要 转化为Form
    // fd.append('PhoneNumber', this.ruleForm.phone);
    // fd.append('NeedCheck', 2);
    // console.log(fd)
  })
}
// 登录提交
const submitForm = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      if (currentVerifyStatus.value !== verifyOption.value.success) {
        // 验证工具校验
        verifyNoticeVisible.value = true
      }
      else {
        const loginFormValue = { ...loginForm.value }
        loginFormValue.code = md5(loginFormValue.code)
        loginFormValue.appCode = currentAppCode.value
        // 校验成功，进行登录
        handleLogin(loginFormValue)
      }
    }
    else {
      return false
    }
  })
}
</script>

<template>
  <div class="dda-login-form">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
    >
      <el-form-item prop="phone">
        <el-input
          v-model="loginForm.phone"
          size="large"
          placeholder="手机号"
        >
          <template #prefix>
            <i class="ri-smartphone-fill" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          size="large"
          placeholder="验证码"
        >
          <template #prefix>
            <i class="ri-shield-flash-fill" style="margin-top:13px;" />
          </template>
          <template #append>
            <el-button :disabled="smsButtonDisabled" @click="handleGetSmsCode" style="margin-top:-14px;">{{smsButtonText}}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <div class="login-verify">
        <el-button
          :type="verifyBtnType"
          plain
          size="large"
          class="login-btn"
          @click="showVerify"
        >
          <template v-if="currentVerifyStatus === verifyOption.undo">
            <i class="ri-shield-keyhole-line" />
            点击完成验证
          </template>
          <template v-else-if="currentVerifyStatus === verifyOption.doing">
            <i class="ri-shield-keyhole-line" />
            验证中，请稍候...
          </template>
          <template v-else-if="currentVerifyStatus === verifyOption.success">
            <i class="ri-shield-check-line" />
            验证成功
          </template>
          <template v-else>
            <i class="ri-shield-keyhole-line" />
            验证失败，请重新验证
          </template>
        </el-button>
        <div
          v-if="verifyNoticeVisible"
          class="verify-failed el-form-item__error"
        >
          请完成滑块验证
        </div>
        <v-code :canvas-width="336" :show="isVerifyShow" @success="verifySuccess" @close="verifyClose" />
      </div>
      <!-- <div class="login-toolbar">
        <el-checkbox v-model="loginForm.remember">
          记住密码
        </el-checkbox>
        <div class="forget-code">
          忘记密码？
        </div>
      </div> -->
      <el-form-item>
        <el-button
          type="primary"
          size="large"
          class="login-btn"
          @click="submitForm"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.dda-login-form{
  width: 100%;
  .login-verify{
    position: relative;
    margin-bottom: var(--py);
  }
  .login-toolbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--py);
    .forget-code{
      cursor: pointer;
      &:hover{
        color: var(--color-primary);
      }
    }
  }
  .login-btn{
    display: block;
    width: 100%;
  }
}
</style>
