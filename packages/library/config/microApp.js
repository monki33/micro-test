// 部署环境的统一host，注意，必须要与同级的vite.build.js保持一致！
const baseProd = 'http://47.100.82.202/dda/demo/mictest/child'
const microAppList = [
  {
    app: 'doc', // 主应用注册的子应用的名称
    base: 'doc', // 子应用内 vite.config 的base，不包含两侧斜杠
    host: 'http://localhost:3034', // 子应用dev的host
  },
]
// 线上环境地址
if (process.env.NODE_ENV === 'production')
  microAppList.map(item => item.host = baseProd)

export { baseProd, microAppList }
