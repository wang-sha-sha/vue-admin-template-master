<template>
<div>
  <el-card>
<!--    因为多个组件会用到三级联动，所以将他作为全局组件引用-->
    <categoryaa></categoryaa>
  </el-card>
  <el-card style="margin-top: 10px"></el-card>
</div>
</template>

<script>

export default {
  name: 'Attr',
}
</script>

<style scoped>

</style>
