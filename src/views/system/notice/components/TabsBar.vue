<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right">
        <!--<el-button :size="'mini'" type="primary" @click="handlerAdd">新增</el-button>
        <el-button :size="'mini'" type="primary" @click="handlerAlter">修改</el-button>
        <el-button :size="'mini'" type="primary" @click="del">删除</el-button>-->
        <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
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
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });
  },
  methods: {
    onFun(method, event){
      this[method](event)
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
      this.$emit('showDialog',{rid:null})
    },
    del() {
      if (this.clickData.reOdId) {
        this.$emit('del',{
          reOdId:this.clickData.reOdId,
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    handlerAlter() {
      if (this.clickData.rid) {
        this.$emit('showDialog',{rid: this.clickData.rid })
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
