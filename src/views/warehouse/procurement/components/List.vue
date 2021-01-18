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
       @selection-change="handleSelectionChange"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getProcurementList } from '@/api/warehouse/index'
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
        { text: '', name: '',default:false },
        { text: '单号', name: 'purNum', width: '150px', sort: true },
        { text: '订单日期', name: 'createTime', width: '150px', sort: true },
        { text: '计划到货日期', name: 'planArriveDate' },
        { text: '物料编码', name: 'goodCode', width: '150px' },
        { text: '旧料号', name: 'color', width: '100px' },
        { text: '物料名称', name: 'goodName', width: '200px' },
       /* { text: '采购单描述', name: 'poDesc' },*/
        { text: '规格', name: 'spec' },
        { text: '数量', name: 'num' },
        { text: '需求数量', name: 'reqQty' },
        { text: '仓库名', name: 'whName' },
        { text: '创建人', name: 'createBy' },
      /*  { text: '核准', name: 'auditStatus' },*/
        { text: '最近同步时间', name: 'syncTime', width: '150px' },
      ]
    };
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
    // 监听多选 参数-所有选中的值
    handleSelectionChange(val){
      this.$store.dispatch('list/setSelections', val)
    },
    dblclick(obj) {
      //this.$emit('showDialog',obj.row)
    },
    //监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true
      getProcurementList(data, val).then(res => {
        this.loading = false;
        if(res.flag && res.data != null) {
          this.list = res.data;
          let record = res.data.records
          let obj = []
          for(const i in record) {
            for(const a in record[i].detail) {
              record[i].detail[a].purNum = record[i].purNum
              record[i].detail[a].createTime = record[i].createTime
              record[i].detail[a].auditStatus = record[i].auditStatus
              obj.push(record[i].detail[a])
            }
          }
          this.list = {
            current: res.data.current,
            pages: res.data.pages,
            size: res.data.size,
            total: res.data.total,
            records: obj
          }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
