<template>
  <div>
    <el-card>
      <!--    因为多个组件会用到三级联动，所以将他作为全局组件引用-->
      <categoryaa></categoryaa>
    </el-card>
    <el-card style="margin-top: 10px">
      <!--    级联练习-->
      <el-cascader
        :show-all-levels="false"
        v-model="value"
        :options="cascaderList"
        :props="props"
        @change="handleChange"
        >
      </el-cascader>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Attr',
  data() {
    return {
      props:{ expandTrigger: 'click'},
      // 接口获取级联数据
      cascaderList: [],
      value: [], // 选中的数据，会以数组形式存在到该变量
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      axios.get("https://www.fastmock.site/mock/abe766b11a658d0959ee84556ab6d2b6/api/testDemo").then(({data}) => {
        console.log(data)
        this.cascaderList = data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    handleChange() {
      // console.log(this.value)
      // console.log(this.value.length)
      // 当选中的不是三级级联
      // if (this.value.length !== 3) {
      //   this.value = []
      //   return
      // }
      // 选中的是三级级联
      console.log(this.value)
    }

  }
}
</script>

<style scoped>

</style>

