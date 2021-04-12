<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right;padding-bottom: 10px">
       <!-- <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
      <!--  <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>-->
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
       <!-- <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="del">删除</el-button>-->
       <!-- <el-button :size="'mini'" type="primary" icon="el-icon-error" @click="disable" >上映</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-success" @click="enable" >下架</el-button>-->
        <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { FrameAlter } from '@/api/basic/index'
import { getByUserAndPrId } from '@/api/system/index'

export default {
  data() {
    return {
      btnList: [],
      search: {
        name: ""
      }
    };
  },
  computed: {
    ...mapGetters(['node','clickData'])
  },
  mounted() {
    let path = this.$route.meta.id
    /*getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });*/
  },
  methods:{
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.cinemaName != null && this.search.cinemaName != '' ? obj.cinemaName = this.search.cinemaName : null
      return obj
    },
    onFun(method){
      this[method]()
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.$emit('uploadList')
    },
    del() {
      if (this.clickData.filmId) {
        this.$confirm('是否删除(' + this.clickData.filmName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('del', {filmId :this.clickData.filmId})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    handlerAlter() {
      if (this.clickData.filmId) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    disable() {
      if (this.clickData.filmId) {
        FrameAlter({filmId: this.clickData.filmId, disable: true}).then(res => {
          if(res.flag) {
            this.$emit('uploadList')
          }
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    enable() {
      if (this.clickData.filmId) {
        FrameAlter({filmId: this.clickData.filmId, disable: false}).then(res => {
          if(res.flag){
            this.$emit('uploadList')
          }
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
  }
};
</script>

<style>
</style>
