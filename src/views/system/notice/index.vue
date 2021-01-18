<template>
  <div class="app-list">
    <Tree ref="tree" class="list-table" @handler-node="handlerNode" />
    <div class="list-containerT">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @queryBtn="query" @del="delList" @uploadList="upload"/>
      </div>
      <list ref="list" @showDialog="handlerDialog"  />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-dialogDrag
      v-if="visible"
      :width="'60%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :rid="rid"></info>

    </el-dialog>
  </div>
</template>

<script>
import { Tree, TabsBar,List } from "./components";
import { Info } from "./form";
export default {
  components: {
    Tree,
    TabsBar,
    List,
      Info
  },
  data() {
    return {
        visible:null,
        rid:null,
      floorId: null
    }
  },
    mounted() {
        this.$refs.list.fetchData()
    },
  methods: {
      hideWindow(val){
          this.visible = val
      },
      handlerDialog(obj){
          if(obj)this.rid = obj.rid
          this.visible = true
      },
      delList(){
          this.$refs.list.delData()
      },
      //更新列表
      upload(){
          this.$refs.list.fetchData()
      },// 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    handlerNode(node) {
      // 触发列表的获取数据函数（原为像list组件传入id并监听变动在list组件里触发函数，已销毁）
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },

  }
};
</script>

<style lang="scss" scoped>
</style>
