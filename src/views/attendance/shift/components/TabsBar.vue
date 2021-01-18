<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right">
        <!--<el-button :size="'mini'" type="primary" @click="handlerAdd">新建</el-button>
        <el-button :size="'mini'" type="primary" @click="handlerAlter">修改</el-button>
        <el-button :size="'mini'" type="primary" @click="handlerScheduling">排班</el-button>
        <el-button :size="'mini'" type="primary" @click="handlerUnScheduling">取消排班</el-button>
        <el-button :size="'mini'" type="primary" @click="del">删除</el-button>-->
        <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { empRemByEid } from '@/api/attendance/index'
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
    ...mapGetters(['node','clickData','selections'])
  },
  mounted() {
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });
  },
  methods: {
    onFun(method){
      this[method]()
    },
    handleTab(node){
      if(node){
        console.log(node.data.type)
        if(node){

        }
      }else{
        this.$message({
          type:'warning',
          message:'请先选择房产'
        })
      }
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    handlerScheduling() {
      this.$emit('showScheduling')
    },
    del() {
      if (this.clickData.oowId) {
        this.$confirm('是否删除(' + this.clickData.oowName+ ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('del', this.clickData.oowId)
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
        });
      }
    },
    handlerUnScheduling() {
      if (this.selections.length > 0) {
        this.$confirm('是否取消排班', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const selections = this.selections
          let array = []
          selections.forEach((item, index) => {
            array.push(item.eid)
          })
          empRemByEid(array).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    handlerAlter() {
      if (this.clickData.oowId) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    }
  }
};
</script>

<style>
</style>
