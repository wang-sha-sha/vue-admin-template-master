<template>
  <div>
    <el-tree :data="data" :props="defaultProps" @node-click="nodeClick" ref="tree">
    <span slot-scope="{node, data}">
      <span>
        {{ data.label }}
      </span>
    </span>
    </el-tree>
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
            label: '三级 2-2-1'
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
  methods: {
    nodeClick(data, node) {
      // console.log('data', data)
      console.log('node', node)
      // 将数据传给父组件
      this.$emit('test', data, node)
      // console.log('父节点', node.parent.data.label)
      // console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
    },
    // forTest() {
    //   console.log('点击了')
    //   this.$emit('test', 666)
    // }
  }
}
</script>

