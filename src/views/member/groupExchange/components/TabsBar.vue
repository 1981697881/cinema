<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.loPrName" placeholder="名称"/>
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
      btnList: [],
      search: {
        loPrName: null
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
      this.search.loPrName != null && this.search.loPrName != '' ? obj.loPrName = this.search.loPrName : null
      obj.status = 1
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
