<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
       type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRecipientsList } from '@/api/warehouse/index'
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
        { text: '行号', name: 'lineNo' },
        { text: '出货日期', name: 'businessDate', width: '100px', sort: true },
        { text: '单号', name: 'shipNo', width: '150px', sort: true },
       /* { text: '客户编码', name: 'customerCode' },*/
        { text: '客户名称', name: 'customerName', width: '200px' },
        { text: 'U9料号', name: 'goodCode', width: '150px' },
        { text: '品名', name: 'goodName', width: '200px' },
        { text: '色号', name: 'color', width: '200px' },
        { text: '规格', name: 'spec' },
        { text: '出货数量', name: 'qty' },
        { text: '库存数量', name: 'stockNum' },
        { text: '仓库名', name: 'wareName' },
        { text: '核准人', name: 'confirmBy' },
        { text: '核准', name: 'auditStatus' },
        { text: '创建人', name: 'createBy' },
        { text: '最近同步时间', name: 'syncTime', width: '150px' },
       /* { text: '最终价', name: 'finallyPrice' },
        { text: '金额', name: 'totalMoneyTc' },
        { text: '未税金额', name: 'totalNetMoneyTc' },*/
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
    dblclick(obj) {
      // this.$emit('showDialog',obj.row)
    },
    // 监听单击某一行
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
      getRecipientsList(data, val).then(res => {
        this.loading = false;
        if(res.flag && res.data != null) {
          this.list = res.data;
          let record = res.data.records
          let obj = []
          for(const i in record) {
            for(const a in record[i].detail) {
              record[i].detail[a].shipNo = record[i].shipNo
              record[i].detail[a].createBy = record[i].createBy
              record[i].detail[a].businessDate = record[i].businessDate
              record[i].detail[a].customerName = record[i].customerName
              record[i].detail[a].customerCode = record[i].customerCode
              record[i].detail[a].spId = record[i].spId
              record[i].detail[a].status = record[i].status
              record[i].detail[a].confirmBy = record[i].confirmBy
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
