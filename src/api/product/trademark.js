import request from '@/utils/request'

export default {
  // 每个接口请求函数就是这个对象当中的一个方法
  // 根据id删除某个品牌
  delete(id) {
    return request.delete('admin/product/baseTrademark/remove/${id}')
  },
  // POST 添加新的品牌
  // PUT 修改品牌
  // 增加品牌和修改品牌，最终都会需要传递这样一个对象，请求体参数
  // {
  //   “id”: 1, // 新增不需要传id(数据库会自动生成)，修改需要传id
  //   "logoUrl": "string"
  //   "tmName": "string"
  // }
  addOrUpdate(trademark) {
    // 根据id来决定这个请求函数是添加还是修改
    if (trademark.id) {
      return request.put('/admin/product/baseTrademark/update', trademark)
    } else {
      return request.post('/admin/product/baseTrademark/save', trademark)
    }
  }

}
