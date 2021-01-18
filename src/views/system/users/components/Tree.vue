<template>
  <div>
<!--    <el-table :data="list" border height="250px" stripe size="mini" :highlight-current-row="true"  @row-click="rowClick">-->
<!--      <el-table-column align="center" type="selection"></el-table-column>-->
<!--      <el-table-column-->
<!--        v-for="(t,i) in columns"-->
<!--        :key="i"-->
<!--        align="center"-->
<!--        :prop="t.name"-->
<!--        :label="t.text"-->
<!--        :width="t.width?t.width:(selfAdaption?'':'120px')"-->
<!--        v-if="t.default!=undefined?t.default:true"-->
<!--      ></el-table-column>-->
<!--    </el-table>-->
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
  import {mapGetters} from "vuex";
  import {getUsersTree, delGroup} from "@/api/system/index";
  import List from "@/components/List";
  export default {
    components: {
      List
    },
    computed: {
      ...mapGetters(["node"])
    },
    props: {
      //是否自适应宽度，不自适应宽度默认为120px
      selfAdaption: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        loading: false,
        columns: [
          {text: "用户组", name: "gpName"},
          {text: "gpLevel", name: "gpLevel", default:false},
          {text: "isDel", name: "isDel", default:false},
          {text:'gpId', name:'gpId', default:false}
        ],
        list: {},
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      //监听单击某一行
      rowClick(obj) {
        this.$store.dispatch("list/setClickData", obj.row);
      },
      Delivery(val) {
        delGroup(val).then(res => {
          if(res.flag){
            this.$store.dispatch("list/setClickData", '');
            this.fetchData()
          }
        })
      },
      fetchData() {
        this.loading = true;
        getUsersTree().then(res => {
          this.loading = false;
          this.list ={
            records: res.data
          }
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

