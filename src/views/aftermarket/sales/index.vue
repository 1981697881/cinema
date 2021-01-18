<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @queryBtn="query" @uploadList="uploadList" @exportData="exportData"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog" @uploadList="uploadList"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="确认信息"
      v-if="visible"
      v-dialogDrag
      :width="'30%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="uploadList" :soId="soId"></info>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from "./components"
import { Info } from "./form"

export default {
  components: {
    TabsBar,
    List,
    Info
  },
  data() {
    return {
      visible: null,
      soId: null,
    };
  },
  mounted() {
    console.log(this.$refs.tabs.qFilter())
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    exportData() {
      this.$refs.list.ExportData()
    },
    hideWindow(val) {
      this.visible = val
    },
    handlerDialog(obj) {
      if(obj)this.soId=obj.soId
      this.visible = true
    },// 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    uploadList(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
