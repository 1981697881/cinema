<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showInfo="handlerInfo" @delList="delivery"
                  @uploadList="upload" @queryBtn="query"/>
      </div>
      <list ref="list" @uploadList="uploadPage" @showDialog="handlerDialog"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="差价信息"
      v-if="visible"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <detail @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></detail>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="基本信息"
      v-if="visible2"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
  </div>
</template>

<script>
  import {TabsBar, List} from "./components"
  import {detail, info} from "./form"
  export default {
    components: {
      TabsBar,
      List,
      detail,
      info
    },
    data() {
      return {
        visible: null,
        visible2: null,
        oid: null,
        listInfo: null,
        treeId: null,
        floorId: null
      }
    },
    mounted() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    methods: {
      delivery(obj) {
        if (obj) {
          this.$refs.list.Delivery(obj)
        }
      },
      hideWindow(val) {
        this.visible = val
        this.visible2 = val
      },
      handlerDialog(obj) {
        this.listInfo = null
        if (obj) {
          const info = JSON.parse(JSON.stringify(obj))
          this.listInfo = info
        }
        this.visible = true
      },
      handlerInfo(obj) {
        this.listInfo = null
        if (obj) {
          const info = JSON.parse(JSON.stringify(obj))
          this.listInfo = info
        }
        this.visible2 = true
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
