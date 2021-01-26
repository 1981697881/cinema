<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @uploadList="upload" @queryBtn="query"/>
      </div>
      <list ref="list" @uploadList="uploadPage"  @showDialog="handlerDialog"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>

    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import { Info } from "./form";

export default {
  components: {
    TabsBar,
    List,
    Info
  },
  data() {
    return {
      visible: null,
      oid: null,
      listInfo: null,
      treeId: null, // null
      floorId: null
    };
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
    // 更新列表
    upload() {
      this.$refs.list.uploadPr()
    },
    uploadPage(val) {
      this.$refs.list.fetchData()
    },
    // 查询
    query() {
      this.$refs.list.uploadPr()
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
