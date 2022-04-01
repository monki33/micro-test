<template>
  <div class="banner-group">
    <el-carousel :interval="5000" :arrow="banners.length > 1?'hover':'never'" height="480px" :indicator-position="banners.length > 1?'':'none'">
      <el-carousel-item v-for="item in banners" :key="item.id" :style="{ background:`${item.color}` }">
        <div class="banner" :style="{ background: `#e4ebf3 url('${item.url}') top center no-repeat` }">
          <div class="banner__container">
            <div class="banner__title">
              {{ item.title }}
            </div>
            <div class="banner__description">
              {{ item.description }}
            </div>
            <div class="banner__action">
              <el-button type="primary" size="large">
                登录管理端
              </el-button>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
const banners = reactive([
  {
    id: 1,
    title: '微前端测试平台',
    description: '',
    color: '#e4ebf3',
    url: new URL('../../assets/images/banner.png', import.meta.url).href,
  },
])
</script>

<style lang="scss" scoped>
:deep(.el-carousel__container) {
  height: 100%;
}
.banner-group {
  .banner__container {
    width: 1200px;
    margin: 0 auto;
    padding-top: 140px;
  }
  .banner {
    height: 480px;
    .banner__title {
      font-size: 44px;
      font-weight: bold;
      margin-bottom: 10px;
      color: var(--el-color-primary);
    }
    .banner__description {
      color: #666;
      font-size: 20px;
      width: 100%;
      line-height: 1.8;
      font-weight: 200;
    }
    .banner__action {
      margin-top: 32px;
    }
  }
}
</style>
