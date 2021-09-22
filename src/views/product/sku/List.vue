<template>
  <div>
    <el-tree default-expand-all :data="data" :props="defaultProps" @node-click="handleNodeClick"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1',
            children: [{
              label: '四级4-1-1'
            }, {
              label: '四级4-1-2'
            }]
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
      console.log(data.index)
    },
    load() {
      // 便利data
      // this.data.forEach((item) => {
      //   item.layer = '我是1级'
      //   if (item.children != null) {
      //     // 便利第二层
      //     item.children.forEach((item2) => {
      //       item2.layer = '我是2级'
      //       if (item2.children != null) {
      //         // 便利第3层
      //         item2.children.forEach((item3) => {
      //           item3.layer = '我是3级'
      //         })
      //       }
      //     })
      //   }
      // })
      // debugger
      const dataList = JSON.parse(JSON.stringify(this.data))
      let n = 0
      dataList.forEach((item) => {
        item.index = 1
        while (item) {
          item = item.children
          this.loopTree(item, n++)
        }
      })
      this.data = dataList
      console.log('data', this.data)
    },
    loopTree(d, n) {
      d.forEach((item) => {
        item.index = n
      })
    }
  }
}
</script>
