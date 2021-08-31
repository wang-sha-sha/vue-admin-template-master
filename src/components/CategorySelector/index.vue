<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="一级分类">
      <el-select v-model="formInline.category1Id" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select v-model="formInline.category2Id" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select v-model="formInline.category3Id" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      formInline:{
        category1Id:'',
        category2Id: '',
        category3Id:''
      }
    }
  }
}
</script>

<style scoped>

</style>
