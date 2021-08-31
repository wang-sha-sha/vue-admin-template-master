<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="changeData('brandCountList')">品牌数量：
          <count-to :start-val="0" :end-val="summary.brandCount" :duration="1200" class="card-panel-num"/>
        </div>

      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="changeData('shopCountList')">购物数量：
          <count-to :start-val="0" :end-val="summary.shopCount" :duration="1200" class="card-panel-num"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="changeData('goodsCountList')">购买数量：
          <count-to :start-val="0" :end-val="summary.goodsCount" :duration="1200" class="card-panel-num"/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="changeData('vipCountList')">会员数量：
          <count-to :start-val="0" :end-val="summary.vipCount" :duration="1200" class="card-panel-num"/>
        </div>
      </el-col>
    </el-row>
    <div class="block" style=" text-align:right; margin-bottom: -20px;">
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="drawLine"
      >
      </el-date-picker>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="clearfix">
      <el-tab-pane label="图展示" name="first">
        <div id="myChart" style="height: 530px"></div>
      </el-tab-pane>
      <el-tab-pane label="表展示" name="second">
        <el-table
          border
          height="500"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            align="center"
            width="300">
          </el-table-column>
          <el-table-column
            prop="vipPurchaseCount"
            label="会员购买量"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="visitorPurchaseCount"
            label="非会员购买量"
            align="center"
          >
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->


  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from "axios"
import CountTo from 'vue-count-to'

export default {
  name: 'Dashboard',
  components: {
    CountTo
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      chart: null,
      tableData: [],
      data: {},
      dateList: [],
      vipPurchaseCountList: [],
      visitorPurchaseCountList: [],
      summary: {},
      date: [
        this.$moment(new Date()).add(-30, 'days').format('YYYY-MM-DD'),
        this.$moment(new Date().toLocaleDateString()).format('YYYY-MM-DD')
      ],
      activeName: 'first'
    }
  },
  mounted() {
    this.init()//创建echart实例
    this.drawLine()//调接口获取数据
  },
  watch: {
    tableData: {
      // deep:true,
      handler(newVal, oldVal) {
        this.setOption()
      }
    }
  },
  methods: {
    init() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById('myChart'))
      this.setOption()
    },
    setOption() {
      // 绘制图表
      this.chart.setOption({
        title: {text: '购买趋势图'},
        tooltip: {},
        xAxis: {
          data: this.dateList
        },
        yAxis: {},
        series: [{
          name: '会员购买量',
          type: 'bar',
          data: this.vipPurchaseCountList
        }, {
          name: '非会员购买量',
          type: 'bar',
          data: this.visitorPurchaseCountList
        }
        ]
      });
    },
    changeData(dataType) {
      console.log('data type')
      this.dateList = []
      this.vipPurchaseCountList = []
      this.visitorPurchaseCountList = []
      this.tableData = this.data[dataType]
      this.data[dataType].forEach((item) => {
        this.dateList.push(item.date);
        this.vipPurchaseCountList.push(item.vipPurchaseCount);
        this.visitorPurchaseCountList.push(item.visitorPurchaseCount);
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    drawLine() {
      this.dateList = []
      this.vipPurchaseCountList = []
      this.visitorPurchaseCountList = []

      axios.get('http://www.yefengyu.top/shop/summary-data/get-summary', {
        params: {
          startDate: this.date[0],
          endDate: this.date1[1]
        }
      }).then((res) => {
        console.log('成功', res)
        if (res && res.status === 200 && res.data.retCode === 0) {
          this.data = res.data.data
          this.tableData = res.data.data.brandCountList
          this.summary = res.data.data.summary
          res.data.data.brandCountList.forEach((item) => {
            this.dateList.push(item.date);
            this.vipPurchaseCountList.push(item.vipPurchaseCount);
            this.visitorPurchaseCountList.push(item.visitorPurchaseCount);
          })
        } else {

          console.log('非200', res.status, res.data.data.retCode)
        }
      }).catch((err) => {
        console.log(err)
      })


    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard {

  &-container {
    background-color: #fefdff;
    margin: 10px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

//.clearfix:after{
//  content: '';
//  display: block;
//  height: 0;
//  clear: both;
//  visibility: hidden;
//}
</style>
