<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @dblclick="dblclick"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
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
        columns: []
      };
    },
    methods: {
      ExportData() {
        import('@/vendor/Export2Excel').then(excel => {
          // 表格的表头列表
          const columns = this.columns
          const tHeader = []
          // 与表头相对应的数据里边的字段
          const filterVal = []
          columns.forEach((item, index) => {
            tHeader.push(item.text)
            filterVal.push(item.name)
          })
          const list = this.list.records
          const data = this.formatJson(filterVal, list);
          // 这里还是使用export_json_to_excel方法比较好，方便操作数据
          excel.export_json_to_excel([tHeader],data,'主营业务成品线效率表')
        })
      },
      formatJson(filter, jsonDate){
        return jsonDate.map(v =>
          filter.map(j => {
            return v[j]
          })
        )
      },
      uploadPr(val) {
        this.fetchData(val.columns, val.array)
      },
      dblclick(obj) {
        // this.$emit('showDialog',obj.row)
      },
      // 监听单击某一行
      rowClick(obj) {
        this.$store.dispatch('list/setClickData', obj.row);
      },

      fetchData(val) {
        this.loading = true
        this.columns = val.columns
        this.list = { records: val.array }
        this.loading = false
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh /3);
  }
</style>
