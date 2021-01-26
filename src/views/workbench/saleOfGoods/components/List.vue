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
import { supplierList, delSupplier} from "@/api/basic/index";
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
      list: {
        records: [{
          type:'电子设备',
          name:'苹果手机',
          price:'10',
          stock:12,
          id:'1',
          img: "https://m.360buyimg.com/babel/jfs/t1/117444/8/7913/170413/5ec683daEb1c3383c/2329ef2d22fa3a4f.jpg!q70.jpg",
        },{
          type:'电子设备',
          name:'三星笔记本',
          price:'10',
          stock:12,
          id:'2',
          img: "https://m.360buyimg.com/babel/jfs/t1/98009/30/16479/84223/5e7cb5e6E314629e2/3dff9921d9b72d21.jpg!q70.jpg",
        }]
      },
      columns: [
        { text: "商品类型", name: "type" },
        { text: "商品名称", name: "name" },
        { text: "价格", name: "price" },
        { text: "商品库存", name: "stock" },
        { text: "图片", name: "img", default: 'img'},
        { text: "状态", name: "" },
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
      delSupplier(val).then(res => {
        if(res.flag){
          this.$store.dispatch("list/setClickData", '');
          this.fetchData();
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
    uploadPr(val) {
      this.fetchData(val,{
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
     /* this.loading = true;
        supplierList(data, val).then(res => {
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
