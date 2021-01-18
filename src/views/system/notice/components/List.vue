<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {getFrameList,delFrame} from "@/api/basic/index";
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
        { text: "rid", name: "rid" },
        { text: "模块", name: "" },
        { text: "操作事件", name: "" },
        { text: "通知模板", name: "" },
        { text: "接收对象", name: "" },
          { text: "说明", name: "" },
      ]
    };
  },

  methods: {
    handlerForm() {},
      //监听每页显示几条
      handleSize(val) {
          this.list.size = val
          this.$emit('uploadList')
      },
      //监听当前页
      handleCurrent(val) {
          this.list.current = val;
        this.$emit('uploadList')
      },
    dblclick(obj) {
        this.$emit('showDialog',obj)
    },
      //监听单击某一行
      rowClick(obj) {
          this.checkDate=obj;
          this.$emit('showTree',obj)
          this.$store.dispatch("list/setClickData", obj);
      },
      //删除
      delDate(val) {
          delFrame(val).then(res => {
            if(res.flag){
                this.$emit('uploadList',obj)
            }
       });

      },
    fetchData(fid, type) {
      //this.loading = true;

      const data = {
      /*  fid: fid,
        type: type,*/
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50,
      };
        /*getFrameList(data,{ disable: false }).then(res => {
        this.loading = false;
        this.list = res.data;
      });*/
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
