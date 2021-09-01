<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showAddDia">添加</el-button>
    <el-input placeholder="请输入查询条件" style="width: 15%; margin: 0 20px" v-model="queryParam.brandName"></el-input>
    <el-button type="primary" @click="getBrandList">查询</el-button>
    <el-button type="primary" @click="reset">重置</el-button>
    <el-table
      v-loading="loading"
      border
      style="width: 100%;margin:20px 0"
      :data="brandList"
    >
      <el-table-column
        type="selection"
        @selection-change="handleSelectionChange"
        width="55">
      </el-table-column>
      <el-table-column
        label="序号"
        width="80"
        :index="indexMethod"
        type="index"
        align="center"
      />
      <el-table-column
        label="品牌名称"
        width="width"
        prop="brandName"
      />
      <el-table-column
        label="描述"
        width="width"
        prop="desc"
      />
      <el-table-column
        label="操作"
        width="300px">
        <template slot-scope="{row, $index}">
          <!--          <el-button type='primary' icon="el-icon-message" size="mini" @click="showItem(row)">查看详情</el-button>-->
          <el-button type='warning' icon="el-icon-edit" size="mini" @click="showUpdateDia(row)">修改</el-button>
          <!--          <el-button type='warning' icon="el-icon-edit" size="mini" @click="showAddDia()">修改</el-button>-->
          <el-button type='danger' icon="el-icon-delete" size="mini" @click="deleteItem(row)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>

    <el-pagination
      background
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=queryParam.pageNum
      :page-sizes="[3, 10, 20]"
      :page-size=queryParam.pageSize
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--    对话框-->

    <el-dialog :title="tmform.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <el-form :model="tmform" style="width: 80%" :rules="rules" ref="tmform">
        <el-form-item label="品牌管理" :label-width="formLabelWidth" prop="brandName">
          <el-input v-model="tmform.brandName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="品牌url" :label-width="formLabelWidth" prop="url">
          <el-input v-model="tmform.url" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="品牌描述" :label-width="formLabelWidth" prop="desc">
          <el-input v-model="tmform.desc" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="品牌LOGO" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDia">取 消</el-button>
        <el-button type="primary" @click="confirmAddOrUpdateDia">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Trademark',
  data() {
    var descText = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        return callback(new Error('描述必须在2-10个文字'))
      }
    };
    return {
      dialogFormVisible: false, // 控制对话框的显示和隐藏
      formLabelWidth: '100px', // label的宽度
      tmform: {
        // 'id': '',
        brandName: '',
        url: '',
        desc: ''
      },
      imageUrl: '',
      queryParam: {
        brandName: '',
        pageNum: 1,
        pageSize: 10
      },
      brandList: [],
      total: 0,
      loading: true,
      rules: {
        brandName: [
          {required: true, message: '请输入品牌名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        url: [
          {required: true, message: '请输入url地址', trigger: 'blur'},
        ],
        desc: [
          {validator: descText, trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    //console.log(this)
    // 查询所有
    //debugger
    this.getBrandList()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    cancelDia() {
      this.dialogFormVisible = false
      this.$refs.tmform.resetFields()

    },

    // 重置
    reset() {
      this.queryParam.brandName = ''
    },
    // 序号的排序
    indexMethod(index) {
      index = (index + 1) + (this.queryParam.pageNum - 1) * this.queryParam.pageSize
      return index
    },
    // 每页条数改变时
    handleSizeChange(pageSize) {
      this.queryParam.pageSize = pageSize
      this.getBrandList()
    },

    handleCurrentChange(pageNum) {
      this.queryParam.pageNum = pageNum
      this.getBrandList()
    },
    getBrandList() {

      this.loading = true
      if (this.brandList.length === 1) {
        this.queryParam.pageNum--
      }
      axios.get('http://www.yefengyu.top/shop/brand/get-brand-list', {
        params: this.queryParam
      }).then((res) => {
        // console.log(res)
        this.brandList = res.data.data.list
        this.total = res.data.data.total
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    // 添加
    showAddDia(row) {
      // 重新赋值新的对象了
      this.tmform = {
        // 'id': '',
        'brandName': '',
        'url': '',
        'desc': ''
      }
      this.dialogFormVisible = true
    },
    confirmAddOrUpdateDia() {
      //先对表单做整体校验
      this.$refs.tmform.validate((valid) => {
        if (valid) {
          alert('submit')
          this.dialogFormVisible = false
          if (!this.tmform.id) {
            axios.post('http://www.yefengyu.top/shop/brand/save', this.tmform).then((res) => {
              this.tmform = {
                // 'id': '',
                'brandName': '',
                'url': '',
                'desc': ''
              }
              this.$message.success('添加成功')
              // 刷新列表
              this.getBrandList()
            }).catch((err) => {
              this.$message.success('添加失败')
              console.log(new Error(err))
            })
          } else {
            axios.put(`http://www.yefengyu.top/shop/brand/update`, this.tmform).then((res) => {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              // 刷新页面
              this.getBrandList()
            }).catch(() => {
              // console.log('修改失败')
              this.$message({
                type: 'info',
                message: '修改失败'
              });
            })
          }
        } else {
          alert('error')
          return false;
        }
      })
    },
    // 修改
    showUpdateDia(row) {
      // this.updateDialogFormVisible = true
      this.dialogFormVisible = true
      // this.tmform.id = row.id
      // this.tmform.brandName = row.brandName
      // this.tmform.desc = row.desc
      // this.tmform.url = row.url
      this.tmform = {
        ...row
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 删除列表中的项
    deleteItem(row) {
      this.$confirm(`此操作将永久删除该项（品牌名称为：${row.brandName}）, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(`http://www.yefengyu.top/shop/brand/delete/${row.id}`).then((res) => {
          // console.log('删除成功')
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 刷新页面
          this.getBrandList()
        }).catch(() => {
          // console.log('删除失败')
          this.$message({
            type: 'info',
            message: '删除失败'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
