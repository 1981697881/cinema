<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @exportData="exportData" @delList="delivery" @uploadList="upload" @queryBtn="query"/>
      </div>
      <list ref="list"  @uploadList="uploadPage"  @showDialog="handlerDialog"/>
    </div>


  </div>
</template>

<script>
  import { TabsBar, List } from "./components";

  export default {
    components: {
      TabsBar,
      List,
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
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    methods: {
      exportData() {
        this.$refs.list.ExportData()
      },
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
