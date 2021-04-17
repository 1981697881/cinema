<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @delList="delivery" @uploadList="upload" @queryBtn="query"/>
      </div>
      <list ref="list"  @uploadList="uploadPage" />
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
      listInfo: null,
    };
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
