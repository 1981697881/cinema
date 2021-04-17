<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6" style="display: inline-block">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              style="width: auto"
              align="right"
              class="input-class"
              unlink-panels
              range-separator="至"
              value-format="HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'单号'">
            <el-input v-model="search.rechargeId" placeholder="单号"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
         <!-- <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
          <!-- <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
         <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"    @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { refundOrder } from '@/api/studios/index'
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value: '',
      btnList: [],
      search: {
        rechargeId: null
      }
    };
  },
  mounted() {
    let path = this.$route.meta.id
 /*   getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });*/
  },
  methods: {
    onFun(method){
      this[method]()
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.rechargeId != null && this.search.rechargeId != '' ? obj.rechargeId = this.search.rechargeId : null
      this.value != null && this.value != undefined ? obj.endDateTime = this.value[1] : null
      this.value != null && this.value != undefined ? obj.createDateTime = this.value[0] : null
      return obj
    },
    // 关键字查询
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    returnTicket() {
      if (this.clickData.orderId) {
        this.$confirm('退票确认', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          refundOrder({
            orderId: this.clickData.orderId
          }).then(res => {
            if(res.flag){
              this.$store.dispatch("list/setClickData", '');
              this.$emit('uploadList')
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.$emit('uploadList')
    },
    handlerAlter() {
      if (this.clickData.loPrId) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
  }
};
</script>

<style>
</style>
