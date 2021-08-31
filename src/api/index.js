export { default as trademark } from './product/trademark'
export { default as attr } from './product/attr'
// 引入并暴露（不能使用简写方式省去default）
// 可以这么理解
// 第一步： 引入
// import {default as trademark} from './product/trademark'
// 简写为 import trademark from './product/trademark'
// 引入之后就相当于把下面这个对象引过来了，并且将这个对象赋值给了trademark
// trademark = {
//  delete(){},
//  addOrUpdate(){}
// }

// 第二步：暴露（部分暴露）
// export trademark = {
//  delete(){},
//  addOrUpdate(){}
// }

// 最终从index.js中暴露出去的就是： 自动加{}
// {
//   trademark:{},
//   attr:{},
//   sku:{}
// }
// main里就可以import * as $API from '@/api' 拿到暴露出去的整个对象

// index.js其实就是把不同的模块当中接口请求函数整合到同一个文件进行一次性暴露，
// 这样我们就可以直接获取到所有的接口请求函数，进行同意的处理
