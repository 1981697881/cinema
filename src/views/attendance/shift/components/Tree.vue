<template>
  <div>
    <list
      class="list-main"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      selfAdaption
      @row-click="rowClick"
    />
  </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import {getShiftList, delShift} from "@/api/attendance/index";
    import List from "@/components/List";
    export default {
        components: {
            List
        },
        computed: {
            ...mapGetters(["node"])
        },
        data() {
          return {
            loading: false,
            visible: false,
            list: {},
            fid: null,
            type: null,
            checkDate:null,
            columns: [
              { text: "id", name: "oowId", default: false},
              { text: "班次代码", name: "oowCode" },
              { text: "班次名称", name: "oowName" },
            ]
          };
        },
        methods: {
          dblclick(obj) {
            this.$emit('showDialog',obj)
          },
          //监听单击某一行
          rowClick(obj) {
            this.checkDate = obj.row;
            this.$emit('showTree', obj.row)
            this.$store.dispatch("list/setClickData", obj.row);
          },
          // 删除
          delData(val) {
            delShift(val).then(res => {
              if(res.flag) {
                this.fetchData()
              }
            });
          },
          fetchData(fid, type) {
            this.loading = true;
            getShiftList().then(res => {
              this.loading = false
              this.list = {records: res.data }
            });
          }
        }
    };
</script>
<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 250px);
  }
</style>
