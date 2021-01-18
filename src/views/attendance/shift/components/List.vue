<template>
  <div>
    <list
      class="list-main"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      selfAdaption
      @row-click="rowClick"
      @dblclick="dblclick"
    />
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import List from "@/components/List";
  import {getShiftClerkList} from "@/api/attendance/index";
  export default {
    components: {
      List
    },
    computed: {
      ...mapGetters(["node"])
    },
    data() {
      return {
        list: {},
        loading: false,
        columns: [
          { text: "id", name: "oowId", default: false},
          { text: "部门", name: "deptName" },
          { text: "工号", name: "jobNum" },
          { text: "职员", name: "name" },
          { text: "上班时间", name: "startTime" },
          { text: "下班时间", name: "endTime" },
        ]
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      dblclick(obj) {
        console.log(13)
        this.$emit('showScheduling', obj)
      },
      //监听单击某一行
      rowClick(obj) {
        this.$store.dispatch("list/setClickData", obj);
      },
      fetchData(val) {
        this.loading = true
        getShiftClerkList(val).then(res => {
          if(res.flag) {
            this.loading = false
            this.list = {records: res.data }
          }
        });
      }
    }
  };
</script>

<style>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100% !important;
  }
</style>
<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 250px);
  }
</style>
