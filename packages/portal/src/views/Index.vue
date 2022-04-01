<script setup>
import * as echarts from 'echarts'
const orderChart = shallowRef(null)
const notices = ref([{
  id: 1,
  title: '存货资产Inventory Asset',
  date: '2022-03-24',
}, {
  id: 2,
  title: 'PDA固定资产管理系统台账使固定',
  date: '2022-03-24',
}, {
  id: 3,
  title: '“一物一码”系统采用实物资产绑定',
  date: '2022-03-24',
}, {
  id: 4,
  title: 'PDA固定资产管理系统台账使固定',
  date: '2022-03-24',
}])
const apps = [{
  code: 'asset',
  name: '全域信息化资产管理系统',
  icon: 'ri-server-line',
  color: '#4298d8',
  remark: '全域政府数字化资产台账',
  path: '',
}, {
  code: 'customer',
  name: '统一客户服务管理系统',
  icon: 'ri-team-line',
  color: '#18b875',
  remark: '数字政府全域项目、供应商、合同及档案数字化管理',
  path: '',
}, {
  code: 'order',
  name: '统一工单管理系统',
  icon: 'ri-checkbox-multiple-line',
  color: '#8b49ba',
  remark: '统一待办和工单流程管理',
  path: '',
}, {
  code: 'online-deploy',
  name: '应用在线部署管理系统',
  icon: 'ri-exchange-funds-fill',
  color: '#e89121',
  remark: '多租户应用在线部署管理,提高应用运维质量',
  path: '',
}, {
  code: 'monitor',
  name: '综合监控告警管理系统',
  icon: 'ri-alarm-warning-line',
  color: '#f25127',
  remark: '"云-数-用"立体化的监控管理',
  path: '',
}, {
  code: 'credit',
  name: '统一信用考核评价系统',
  icon: 'ri-copper-diamond-line',
  color: '#18b875',
  remark: '统一信用考核评价系统',
  path: '',
}]

const drawOrderChart = () => {
  orderChart.value = echarts.init(document.getElementById('order-analysis'))
  const option = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
      text: '工单统计',
      textStyle: {
        fontSize: 14,
        fontWeight: 'normal',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['2021-11', '2021-12', '2022-01', '2022-02', '2022-03', '2022-04', '2022-05'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '工单总数',
        type: 'line',
        smooth: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(128, 255, 165, 1)',
            },
            {
              offset: 1,
              color: 'rgba(255,255,255, .2)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: '待办工单',
        type: 'line',
        smooth: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 221, 255, 1)',
            },
            {
              offset: 1,
              color: 'rgba(255,255,255, .2)',
            },
          ]),
        },
        data: [120, 282, 111, 234, 33, 246, 310],
      },
    ],
  }
  orderChart.value.setOption(option, true)

  // echart图表自适应
  // handleResize()
}
const noticeClick = () => {

}
const activities = [
  {
    title: 'CISCO-SWITCH-3556',
    content: '[网络设备]CISCO-SWITCH-3556',
    ip: '120.0.0.1',
    timestamp: '2018-04-12 20:46',
    type: 'warning',
  },
  {
    title: 'CISCO-SWITCH-3556',
    content: '[网络设备]CISCO-SWITCH-3556',
    ip: '120.0.0.1',
    timestamp: '2018-04-03 20:46',
    type: 'danger',
  },
  {
    title: 'CISCO-SWITCH-3556',
    content: '[网络设备]CISCO-SWITCH-3556',
    ip: '120.0.0.1',
    timestamp: '2018-04-03 20:46',
    type: 'warning',
  },
]
const todoList = [{
  id: 1,
  type: 'normal',
  name: '机房监控主要是对机房环境和设备的各种参数进行实时监控',
  date: '2022-03-01',
}, {
  id: 2,
  type: 'important',
  name: '机房监控主要是对机房环境和设备的各种参数进行实时监控',
  date: '2022-03-09',
}, {
  id: 3,
  type: 'important',
  name: '机房监控主要是对机房环境和设备的各种参数进行实时监控',
  date: '2022-03-09',
}, {
  id: 4,
  type: 'urgent',
  name: '机房监控主要是对机房环境和设备的各种参数进行实时监控',
  date: '2022-03-11',
}]

const handleResize = () => {
  if (orderChart.value)
    orderChart.value.resize()
}

onMounted(() => {
  drawOrderChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (orderChart.value)
    orderChart.value.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>
<template>
  <div class="page-padding">
    <el-row :gutter="15">
      <el-col :span="18">
        <el-card class="padding-0-card mb15 notice">
          <div class="notice-left">
            <h3>运维</h3>
            <p class="small">
              Digital operation
            </p>
            <p class="button">
              运维指南
            </p>
          </div>
          <div class="notice-right">
            <subject-title
              :subject="{icon:'ri-volume-up-line', bgColor: '#FF9A2E'}"
              @right-click="noticeClick"
            >
              <template #title>
                公告
              </template>
              <template #right>
                更多<i class="ri-more-fill" />
              </template>
            </subject-title>
            <ul class="notice-list">
              <li v-for="notice in notices" :key="notice.id" class="flex justify-between">
                <p class="ellipse">
                  {{ notice.title }}
                </p>
                <span>2022-03-24</span>
              </li>
            </ul>
          </div>
        </el-card>
        <el-card class="padding-0-card mb15">
          <subject-title
            :subject="{icon:'ri-apps-line', bgColor: '#7BD243'}"
          >
            <template #title>
              应用
            </template>
          </subject-title>
          <div class="list-card">
            <app-item v-for="info in apps" :key="info.code" :app-info="info" />
          </div>
        </el-card>
        <el-card class="padding-0-card">
          <subject-title
            :subject="{icon:'ri-bar-chart-box-line', bgColor: '#6EA1FF'}"
          >
            <template #title>
              报表统计
            </template>
          </subject-title>
          <div class="analysis flex justify-between">
            <div class="item">
              <div id="order-analysis" />
            </div>
            <div class="item">
              <p>实时告警</p>
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size"
                  :hollow="activity.hollow"
                  :timestamp="activity.timestamp"
                  placement="top"
                >
                  <div class="timeline flex justify-start">
                    <el-tag effect="dark" :type="activity.type">
                      严重
                    </el-tag>
                    <div class="content">
                      <h4>{{ activity.title }}</h4>
                      <p>{{ activity.ip }}</p>
                      <p>{{ activity.content }}</p>
                    </div>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="padding-0-card">
          <subject-title
            :subject="{icon:'ri-file-edit-line', bgColor: '#6EA1FF'}"
          >
            <template #title>
              待办事项
            </template>
          </subject-title>
          <div v-for="todo in todoList" :key="todo.id" class="todo-item pointer">
            <el-card shadow="hover">
              <div class="flex justify-between mb15">
                <template v-if="todo.type === 'normal'">
                  <el-tag effect="dark">
                    正常
                  </el-tag>
                </template>
                <template v-else-if="todo.type === 'urgent'">
                  <el-tag effect="dark" type="danger">
                    紧急
                  </el-tag>
                </template>
                <template v-else-if="todo.type === 'important'">
                  <el-tag effect="dark" type="warning">
                    重要
                  </el-tag>
                </template>
                <span>{{ todo.date }}</span>
              </div>
              <p>{{ todo.name }}</p>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.mb15 {
  margin-bottom: 15px;
}
.notice {
  :deep(.el-card__body) {
    display: flex;
    justify-content: space-between;
  }
}
.notice-left {
  height: 170px;
  width: 470px;
  padding: 20px 0 0 20px;
  background: url("../assets/images/console-notice-bg.jpg") no-repeat;
  background-size: 470px 170px;
  h3 {
    font-size: 26px;
    font-weight: normal;
    letter-spacing: 3px;
  }
  p.small {
    color: #666;
    letter-spacing: 2px;
  }
  p.button {
    margin-top: 25px;
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #FFFFFF;
    box-shadow: 0px 4px 6px rgba(195, 212, 242, 0.3);
    border-radius: var(--border-radius-lg);
  }
}
.notice-right {
  flex: 1;
  margin-left: 30px;
  ul.notice-list {
    li {
      margin-top: 13px;
      cursor: pointer;
    }
    li p {
      flex: 1;
    }
    li span {
      display: inline-block;
      width: 95px;
      color: #666;
      text-align: right;
    }
  }
}
.list-card {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  :deep(.item) {
    width: 25%;
    margin-top: 20px;
  }
}
.analysis {
  .item {
    width: 48%;
    margin-top: 15px;
    :deep(.el-timeline) {
      margin-top: 15px;
    }
  }
  #order-analysis {
    width: 100%;
    height: 380px;
  }
}
.timeline {
  cursor: pointer;
  border: 1px solid var(--el-card-border-color);
  height: 78px;
  padding: 8px 10px;
  border-radius: 10px;
  .content {
    margin-left: 10px;
  }
}
.timeline:hover {
  box-shadow: var(--el-box-shadow-light);
}
.todo-item {
  margin-top: 15px;
  p {
    line-height: 25px;
  }
}
</style>
