<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'
import PageHeader from '@mictest/library/components/PageHeader.vue'
import Datetime from '@mictest/library/utils/datetime'
// 模拟文件数据
const mockData = [
  {
    id: '1',
    name: '2022.3.7报修',
    type: 'word',
    size: 1237127,
    creatorId: '488666230186573824',
    creatorName: '系统管理员',
    createTime: '2022-03-07T11:55:47.000+00:00',
  },
  {
    id: '2',
    name: '2022.3.6报修',
    type: 'word',
    size: 402,
    creatorId: '488666230186573824',
    creatorName: '系统管理员',
    createTime: '2022-03-06T10:24:12.000+00:00',
  },
  {
    id: '3',
    name: 'FY2022检修一组',
    type: 'xls',
    size: 122889,
    creatorId: '488666230186573824',
    creatorName: '系统管理员',
    createTime: '2022-03-04T09:34:32.000+00:00',
  },
  {
    id: '4',
    name: '数字化检修解决方案',
    type: 'pdf',
    size: 9378,
    creatorId: '488666230186573824',
    creatorName: '系统管理员',
    createTime: '2022-03-02T19:15:11.000+00:00',
  },
  {
    id: '5',
    name: '检修一组汇报总结',
    type: 'pptx',
    size: 18212,
    creatorId: '488666230186573824',
    creatorName: '系统管理员',
    createTime: '2022-03-01T12:14:12.000+00:00',
  },
  {
    id: '6',
    name: '检修一组汇报总结',
    type: 'folder',
    size: 0,
    creatorId: '488666230186573824',
    creatorName: '系统管理员',
    createTime: '2022-03-01T09:15:13.000+00:00',
  },
  {
    id: '7',
    name: '年终总结',
    type: 'pptx',
    size: 1812211212,
    creatorId: '488666230186573824',
    creatorName: '系统管理员',
    createTime: '2022-03-01T07:14:12.000+00:00',
  },
]
const props = defineProps({
  pageName: {
    type: String,
  },
  isRecycle: {
    type: Boolean,
    default: false,
  },
})
// 文件数据
const docData = ref(mockData)
// 过滤条件
const condition = ref({
  name: '',
})
// 数据加载
const initData = () => {}
// 展现形式 list 列表 card 卡片
const listType = ref('list')
// 计算文件大小
const initSize = (size) => {
  if (!size || isNaN(size))
    return '-'
  else if (size < 1024)
    return `${size}字节`
  else if (size < 1048576)
    return `${(size / 1024).toFixed(1)}KB`
  else if (size < 1073741824)
    return `${(size / 1048576).toFixed(1)}MB`
  else if (size < 1099511627776)
    return `${(size / 1073741824).toFixed(1)}GB`
  else return `${(size / 1099511627776).toFixed(1)}TB`
}
// 分享
const shareDoc = (data) => {
  console.log(data)
  shareForm.value.docsId = [data.id]
  shareForm.value.docsName = [data.name]
  shareDialogVisible.value = true
}
// 删除
const removeDoc = (data) => {
  ElMessageBox.confirm(
    `您确定要删除文件  ${data.name}  吗？`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(() => {
    ElMessage('执行删除')
  }).catch(() => {
  })
}
// 上传文件抽屉打开
const uploadDrawerVisible = ref(false)
// 分享文件dialog打开
const shareDialogVisible = ref(false)
// 默认有效期
const expireDefault = '2'
// 分享表单
const shareForm = ref({
  // 分享文件id
  docsId: [],
  // 分享文件name
  docsName: [],
  // 有效期
  expire: expireDefault,
})
// 有效期选项
const expireOption = ref([
  {
    code: '99',
    name: '永久有效',
  },
  {
    code: '1',
    name: '1天',
  },
  {
    code: '2',
    name: '7天',
  },
  {
    code: '3',
    name: '30天',
  },
])
// 分享链接
const shareLink = ref('')
// 创建分享链接
const initShareLink = () => {
  shareLink.value = 'http://10.110.96.44/demo/federationHost/dist/'
}
// 重置分享内容
const clearShare = () => {
  shareForm.value.docsId = []
  shareForm.value.docsName = []
  shareForm.value.expire = expireDefault
  shareLink.value = ''
}
// 还原文件
const revertDoc = (data) => {
  console.log(data)
  ElMessageBox.confirm(
    `您确定要还原文件  ${data.name}  吗？`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(() => {
    ElMessage('执行还原')
  }).catch(() => {
  })
}
// 批量选中内容
const multiSelection = ref([])
const handleSelectionChange = (val) => {
  multiSelection.value = val
}
// 批量操作
const multiOperation = (command) => {
  if (multiSelection.value.length) {
    if (command === 'remove') {
      ElMessageBox.confirm(
        `您确定要删除选中的${multiSelection.value.length}个文件吗？`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      ).then(() => {
        ElMessage('执行删除')
      }).catch(() => {
      })
    }
    else if (command === 'revert') {
      ElMessageBox.confirm(
        `您确定要还原选中的${multiSelection.value.length}个文件吗？`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      ).then(() => {
        ElMessage('执行还原')
      }).catch(() => {
      })
    }
    else if (command === 'share') {
      shareForm.value.docsId = multiSelection.value.map(item => item.id)
      shareForm.value.docsName = multiSelection.value.map(item => item.name)
      shareDialogVisible.value = true
    }
  }
  else {
    ElMessage.warning('请选择要操作的文件')
  }
}
</script>

<template>
  <page-header :page-name="pageName">
    <template #headerRight>
      <div class="search">
        <el-input
          v-model="condition.name"
          placeholder="输入关键词"
          @change="initData"
        >
          <template #suffix>
            <el-icon class="el-input__icon" @click="initData">
              <i class="ri-search-line" />
            </el-icon>
          </template>
        </el-input>
      </div>
      <div class="list-type-radio">
        <div class="radio-item" :class="{ active: listType === 'list' }" @click="listType = 'list'">
          <i class="ri-align-justify" />
        </div>
        <div class="radio-item" :class="{ active: listType === 'card' }" @click="listType = 'card'">
          <i class="ri-function-line" />
        </div>
      </div>
      <el-button v-if="!isRecycle" type="primary" @click="uploadDrawerVisible = true">
        <i class="ri-add-fill" />上传文件
      </el-button>
      <el-dropdown class="multiple-operation" @command="multiOperation">
        <el-button>
          批量操作<i class="ri-arrow-down-s-line" />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="!isRecycle" command="share">
              分享
            </el-dropdown-item>
            <el-dropdown-item v-if="isRecycle" command="revert">
              还原
            </el-dropdown-item>
            <el-dropdown-item command="remove">
              <span class="dropdown-item-danger">删除</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </page-header>
  <div class="page-padding">
    <el-table
      v-show="listType === 'list'"
      :data="docData"
      class="list-table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="64" />
      <el-table-column
        label="文件名"
        sortable
        sort-by="name"
      >
        <template #default="scope">
          <div class="file-name">
            <file-icon :file-type="scope.row.type" size="xs" />
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="" width="180">
        <template #default="scope">
          <div class="operation-column">
            <span v-if="!isRecycle" class="list-item-btn" @click="shareDoc(scope.row)">
              <i class="ri-share-line" />
            </span>
            <span v-if="isRecycle" class="list-item-btn" @click="revertDoc(scope.row)">
              <i class="ri-arrow-go-back-line" />
            </span>
            <span class="list-item-btn" @click="removeDoc(scope.row)">
              <i class="ri-delete-bin-line" />
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="大小"
        width="180"
        sortable
        sort-by="size"
      >
        <template #default="scope">
          {{ initSize(scope.row.size) }}
        </template>
      </el-table-column>
      <el-table-column
        label="上传时间"
        width="200"
        sortable
        sort-by="createTime"
      >
        <template #default="scope">
          {{ Datetime.formatDatetime(scope.row.createTime) }}
        </template>
      </el-table-column>
    </el-table>
    <div
      v-show="listType === 'card'"
      class="card-list"
    >
      <el-row :gutter="16">
        <el-col
          v-for="item in docData"
          :key="item.id"
          :span="4"
        >
          <div class="card-item">
            <div class="item-main">
              <file-icon :file-type="item.type" size="md" />
              <div class="item-name">
                {{ item.name }}
              </div>
            </div>
            <div class="item-operation">
              <span v-if="!isRecycle" class="list-item-btn" @click="shareDoc(item)">
                <i class="ri-share-line" />
              </span>
              <span v-if="isRecycle" class="list-item-btn" @click="revertDoc(item)">
                <i class="ri-arrow-go-back-line" />
              </span>
              <span class="list-item-btn" @click="removeDoc(item)">
                <i class="ri-delete-bin-line" />
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <el-drawer
    v-model="uploadDrawerVisible"
    title="文件上传"
    direction="rtl"
  >
    <el-upload
      class="upload-doc"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
    >
      <div class="el-icon--upload">
        <i class="ri-upload-2-line" />
      </div>
      <div class="el-upload__text">
        <em>点击</em>或拖拽文件至此即可上传
      </div>
      <template #tip>
        <div class="el-upload__tip">
          单个文件最大不超过2GB
        </div>
      </template>
    </el-upload>
  </el-drawer>
  <el-dialog
    v-model="shareDialogVisible"
    title="文件分享"
    @closed="clearShare"
  >
    <div v-show="!shareLink">
      <el-form :model="shareForm" label-width="120px" class="share-form">
        <el-form-item label="分享文件">
          {{ shareForm.docsName.join('、') }}
        </el-form-item>
        <el-form-item label="有效期限">
          <el-select v-model="shareForm.expire" placeholder="请选择有效期限">
            <el-option
              v-for="item in expireOption"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="flex justify-center items-center">
        <el-button type="primary" size="large" @click="initShareLink">
          创建链接
        </el-button>
      </div>
    </div>
    <div v-show="shareLink">
      <el-result
        icon="success"
        sub-title="分享链接创建成功"
      >
        <template #extra>
          <div class="flex items-center justify-center link-input">
            <el-input v-model="shareLink" type="text" size="large" />
            <el-button type="primary" size="large">
              复制链接
            </el-button>
          </div>
        </template>
      </el-result>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.search {
  margin-right: var(--px-sm);
}
.search :deep(.el-input__suffix) {
  top: 0;
}
.el-input__icon {
  font-size: 18px;
  margin-top: 7px;
  cursor: pointer;
}
.file-name{
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: var(--transition-time) ease-in;
  &:hover{
    color: var(--color-primary);
    transition-timing-function: ease-out;
  }
  :deep(.file-icon){
    margin-right: var(--px-sm);
  }
}
.list-type-radio{
  display: flex;
  align-items: center;
  height: 32px;
  margin-right: var(--px-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  .radio-item{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 100%;
    font-size: 16px;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: var(--transition-time) ease-in;
    &:hover{
      color: var(--color-primary);
    }
    &.active{
      color: var(--color-text-inverse);
      background-color: var(--color-primary);
      cursor: default;
      transition-timing-function: ease-out;
    }
    &+.radio-item{
      border-left: 1px solid var(--color-border);
      &.active{
        border-left-color: var(--color-primary);
      }
    }
  }
}

.card-item{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 170px;
  margin-bottom: var(--py);
  border-radius: var(--border-radius-lg);
  transition: var(--transition-time) ease-in;
  &:hover{
    box-shadow: 0 4px 14px #DCE4F1;
    transition-timing-function: ease-out;
    .item-operation{
      opacity: 1;
    }
  }
  .item-main{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--py-sm) var(--px);
    cursor: pointer;
    .item-name{
      margin-top: var(--py);
      transition: var(--transition-time) ease-in;
    }
    &:hover{
      .item-name{
        color: var(--color-primary);
        transition-timing-function: ease-out;
      }
    }
  }
  .item-operation{
    flex: none;
    display: flex;;
    justify-content: space-around;
    align-items: center;
    height: 32px;
    padding: 0 var(--px);
    border-top: 1px solid var(--color-border);
    opacity: 0;
    transition: var(--transition-time) ease-in;
    &>span{
      font-size: var(--size-md);
      color: var(--color-text-secondary);
      transition: var(--transition-time) ease-in;
      cursor: pointer;
      &:hover{
        color: var(--color-primary);
        transition-timing-function: ease-out;
      }
    }
  }
}
.upload-doc{
  width: 100%;
  :deep(.el-upload){
    width: 100%;
    .el-upload-dragger{
      width: 100%;
    }
  }
}
.share-form{
  min-height: 200px;
}
.link-input{
  :deep(.el-input){
    .el-input__inner{
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  :deep(.el-button){
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.multiple-operation{
  margin-left: var(--px-sm);
  :deel(.el-button){
    i{
      margin-right: 0;
      margin-left: var(--px-xs);
    }
  }
}
</style>
