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
import { getLocationList, deleteLocation} from "@/api/basic/index";
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
        { text: "影城名称", name: "cinemaName" },
        { text: "影城地址", name: "cinemaAddress" },
        { text: "联系人", name: "cinemaContact" },
        { text: "联系电话", name: "cinemaPhone" },
        { text: "固定电话", name: "cinemaTel" },
        { text: "简介", name: "cinemaMessage" },
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
      deleteLocation(val).then(res => {
        if(res.flag){
          this.$store.dispatch("list/setClickData", '');
          this.$emit('uploadList')
        }
      });
    },
    uploadPr(val) {
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
      getLocationList(data, val).then(res => {
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
