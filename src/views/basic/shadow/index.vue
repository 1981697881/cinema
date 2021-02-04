<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @del="delivery" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list" @uploadList="uploadPage" @showDialog="handlerDialog"  />
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
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
  methods: {
    delivery(obj) {
      if(obj) {
        this.$refs.list.Delivery(obj)
      }
    },
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
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
