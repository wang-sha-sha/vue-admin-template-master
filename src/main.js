import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// 引入echarts
import * as echarts from 'echarts'
import moment from 'moment'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as API from '@/api'
// 相当于
// API = {
//   trademark:{},
//   attr:{},
//   sku:{}
// }

import categoryqqq from '@/components/CategorySelector'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const {mockXHR} = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, {locale})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 全局注册组件
// 第一个参数是使用自定义标签组件的时候的组件名
// 第二个参数是import引入时的名字
Vue.component('categoryaa', categoryqqq)

Vue.config.productionTip = false
// 把所有的接口请求函数最终整体的对象挂载到vue原型上，以便在每个组件当中去使用
Vue.prototype.$API = API
// API = {
//   trademark:{各种方法},
//   attr：{各种方法}
//   ...
// }
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment;//赋值使用



// Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD') {
//   return moment(dateStr).format(pattern)
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
