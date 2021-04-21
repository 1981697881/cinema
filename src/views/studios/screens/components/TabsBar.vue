<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.hallName" placeholder="名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
         <!-- <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
           <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="syncInfo">同步座位</el-button>
          <!-- <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
         <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"  @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { downloadHallSeats } from '@/api/studios/index'
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      btnList: [],
      search: {
        hallName: null
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
      this.search.hallName != null && this.search.hallName != '' ? obj.hallName = this.search.hallName : null
      return obj
    },
    // 关键字查询
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    Delivery() {
      if (this.clickData.hallId) {
        this.$confirm('是否删除(' + this.clickData.hallName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', {hallId: this.clickData.hallId})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    syncInfo(){
      const loading = this.$loading({
        lock: true,
        text: '加载中......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      downloadHallSeats().then(res => {
        if(res.flag){
          this.$emit('uploadList')
          loading.close();
        }else{
          loading.close();
        }
      });
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.$emit('uploadList')
    },
    handlerAlter() {
      if (this.clickData.hallId) {
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
