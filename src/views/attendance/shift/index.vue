<template>
  <div class="app-list">
    <Tree ref="tree" class="list-table" @showTree="handlerNode" />
    <div class="list-containerT">
      <div>
        <tabs-bar ref="tabs" @del="delList" @queryBtn="query" @uploadList="upload" @showDialog="handlerDialog" @showScheduling="handlerSch" />
      </div>
      <list ref="list" @uploadList="upload" />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="班次信息"
      v-if="visible"
      v-dialogDrag
      :width="'60%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="排班信息"
      v-if="visible2"
      v-dialogDrag
      :width="'80%'"
      destroy-on-close
    >
      <grade @hideDialog="hideSch" @uploadList="uploadSch" :listInfo="listInfo"></grade>
    </el-dialog>
  </div>
</template>

<script>
import { Tree, TabsBar,List } from "./components";
import { Info, Grade} from "./form"
export default {
  components: {
    Tree,
    TabsBar,
    Info,
    Grade,
    List
  },
  data() {
    return {
      visible: null,
      visible2: null,
      listInfo: null,
      oowId: null
    }
  },
  mounted() {
    this.$refs.tree.fetchData()
  },
  methods: {
    hideWindow(val) {
      this.visible = val
    },
    hideSch(val) {
      this.visible2 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    handlerSch(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    },
    reset(obj) {
      this.$refs.list.reset()
    },
    delList(val) {
      this.$refs.tree.delData(val)
    },
    setData(val) {
      this.$refs.list.setList(val)
    },
    handlerSave() {
      this.$refs.list.saveData()
    },
    // 更新列表
    upload() {
      this.$refs.tree.fetchData()
      this.uploadSch(this.oowId)
    },
    // 更新列表
    uploadSch(val) {
      this.oowId = val
      this.$refs.list.fetchData(val)
    },// 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    handlerNode(val) {
      this.oowId = val.oowId
      this.$refs.list.fetchData(val.oowId)
    },

  }
};
</script>

<style lang="scss" scoped>
</style>
