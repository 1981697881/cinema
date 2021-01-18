<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @del="delList" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list" @showDialog="handlerDialog"  />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="电影信息"
      v-if="visible"
      v-dialogDrag
      :width="'70%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar,List } from "./components"
import { Info } from "./form"
import { delFrame } from "@/api/basic/index";
export default {
  components: {
    TabsBar,
    List,
    Info
  },
  data() {
    return {
      visible: null,
      rid: null,
      listInfo: null,
      floorId: null
    }
  },
    mounted() {
      this.$refs.list.fetchData()
    },
  methods: {
      hideWindow(val) {
          this.visible = val
      },
      handlerDialog(obj) {
        this.listInfo = null
        if(obj) {
          const info = JSON.parse(JSON.stringify(obj))
          this.listInfo = info
        }
          this.visible = true
      },
      //更新列表
      upload(){
          this.$refs.list.fetchData()
      },// 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    delList(val) {
      this.loading = true
      console.log(val)
      delFrame(val).then(res => {
        this.loading = false
        this.list = res.data
        this.$refs.list.fetchData()
      })
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
