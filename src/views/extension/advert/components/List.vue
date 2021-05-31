<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getPosterList, deletePoster} from "@/api/extension/index";
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
      list: {},
      columns: [
        { text: "广告位置", name: "posterLocation" },
        { text: "广告名称", name: "posterName" },
        { text: "广告链接", name: "posterUrl" },
        { text: "广告内容", name: "posterContent" },
        { text: "图片", name: "posterPhoto", default: 'img'},
        { text: "开始时间", name: "posterStartdatetime" },
        { text: "结束时间", name: "posterEnddatetime" },
        /*{ text: "状态", name: "status" },*/
      ]
    };
  },
  methods: {
      //监听每页显示几条
      handleSize(val) {
          this.list.size = val
        this.$emit('uploadList')
      },
      //监听当前页
      handleCurrent(val) {
          this.list.current = val
        this.$emit('uploadList')
      },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    Delivery(val) {
      deletePoster(val).then(res => {
        if(res.flag){
          this.$store.dispatch("list/setClickData", '');
          this.uploadPr();
        }
      });
    },
    uploadPr(val={}) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    //监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true;
        getPosterList(data, val).then(res => {
        this.loading = false;
        this.list = res.data;
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
