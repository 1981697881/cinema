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
import { mapGetters } from 'vuex'
import {materialMonthlyReport} from '@/api/warehouse/index'
import List from '@/components/List'

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
        { text: '', name: '', default: false },
        { text: '人员/项目', name: 'empName' },
        { text: '工时', name: 'hour' },
        { text: '入库批次', name: 'putBatch' },
        { text: '入库重量', name: 'putWeight' },
        { text: '移库批次', name: 'warehouseMoveBatch' },
        { text: '移库重量', name: 'warehouseMoveWeight' },
        { text: '调整批次', name: 'adjustBatch' },
        { text: '调整重量', name: 'adjustWeight' },
        /* { text: '备料批次', name: 'stockBatch' },
        { text: '备料重量', name: 'stockWeight' }, */
        { text: '出库批次', name: 'outBatch' },
        { text: '出库重量', name: 'outWeight' },
        { text: '出货批次', name: 'outShipBatch' },
        { text: '出货重量', name: 'outShipWeight' },
      ]
    }
  },

  methods: {
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val;
      this.$emit('uploadList')
    },
    dblclick(obj) {
      // this.$emit('showDialog',obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    uploadPr(val) {
      this.fetchData(val)
    },
    fetchData(val) {
      this.loading = true;
      materialMonthlyReport(val).then(res => {
        this.loading = false;
        console.log(res)
        this.list = {records: res.data};
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
