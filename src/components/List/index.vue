<template>
  <div>
    <el-table
      :data="list.records"
      border
      :stripe="timeColor? false : true"
      size="mini"
      :highlight-current-row="highlight"
      @row-dblclick="dblclick"
      @row-click="rowClick"
      :row-class-name="tableRowClassName"
      :row-style="formatRow ? rowClass : null"
       @selection-change="handleSelectionChange"
      :height="height"
      @sort-change="sortChange"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      v-loading="loading"
    >
      <el-table-column align="center" fixed v-if="type" :type="type?'selection':''"></el-table-column>
      <el-table-column v-if="index" prop="date" label="序号" type="index" align="center" sortable></el-table-column>
      <slot name="title"></slot>
      <template v-for="(t,i) in columns">
        <el-table-column
          :prop="t.name"
          :key="i"
          :fixed="t.fixed"
          :sortable="t.sort"
          :formatter="t.formatt!=undefined? (t.formatt == 'checkWarning'? checkWarning : taskWarning) : null"
          v-if="t.default!=undefined ?(t.default =='img'?false:t.default):true"
          :label="t.text"
          :width="t.width?t.width:(selfAdaption?'':'120px')"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          :key="i"
          v-else-if="t.default == 'img'?true:false"
          :label="t.text"
          :width="t.width?t.width:(selfAdaption?'':'120px')"
          show-overflow-tooltip
          align="center"
        >
          <template width="90" slot-scope="scope">
            <img style="width:80px;height:80px;border:none;" :src=" fileUrl+scope.row.posterPhoto">
          </template>
        </el-table-column>
      </template>
      <slot name="after"></slot>
    </el-table>
    <div class="text-center pages" v-if="list.total && list.total!=0" style="padding-top: 15px;">
      <el-pagination
        @size-change="handleSize"
        @current-change="handleCurrent"
        :current-page="list.current"
        :page-sizes="[50, 100, 250, 500, 1000, 2500]"
        :page-size="list.size"
        :page-count="list.pages?list.pages:0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total?list.total:0"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      // 请求返回的json数据
      type: Object,
      default: null
    },
    columns: {
      // 列
      type: Array,
      default: null
    },
    index: {
      // 是否需要序号列
      type: Boolean,
      default: false
    },
    operation: {
      // 是否需要序号列
      type: Boolean,
      default: false
    },
    formatRow: {
      // 是否需要序号列
      type: Boolean,
      default: false
    },
    highlight: {
      // 是否需要序号列
      type: Boolean,
      default: true
    },
    // 是否开启多选
    type: {
      type: Boolean,
      default: false
    },
    // 是否开启多选
    timeColor: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Boolean,
      default: false
    },
    // 是否打开底部合计行
    showSummary: {
      type: Boolean,
      default: false
    },
    // 是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: true
    },
    // 是否自定义高度 默认100%
    height:{
      type: String,
      default: "100%"
    },
    // 自定义按钮
    operationName:{
      type: String,
      default: "+"
    }
  },
  data() {
    return {
      fileUrl: this.$store.state.user.url+'/movie/uploadFiles/image/',
    };
  },
  methods: {
    sortChange(row) {
      return this.$emit('sortChange', { row });
    },
    taskWarning(row, column) {
      let stau = ''
      if(row.isClash){
        if(row.alertStatus == 1) {
          stau = '延误,冲突'
        }else if(row.alertStatus == 2) {
          stau = '冲突,冲突'
        }else if(row.alertStatus == 3) {
          stau = '加急,冲突'
        }else if(row.alertStatus == 4) {
          stau = '暂停,冲突'
        }else{
          stau = '正常,冲突'
        }
      } else {
        if(row.alertStatus == 1) {
          stau = '延误'
        }else if(row.alertStatus == 2) {
          stau = '冲突'
        }else if(row.alertStatus == 3) {
          stau = '加急'
        }else if(row.alertStatus == 4) {
          stau = '暂停'
        }else{
          stau = '正常'
        }
      }
      return  stau
    },
    checkWarning(row, column) {
      let stau = ''
      if(row.nature == 1) {
        stau = '办公室'
      }else if(row.nature == 2) {
        stau = '一线'
      }else if(row.nature == 3) {
        stau = '其他'
      }
      return  stau
    },
    tableRowClassName({row, rowIndex}) {
      if(row.isClash){
        if (row.alertStatus == 3) {
          return 'suspended-row1';
        } else if (row.alertStatus == 1) {
          return 'suspended-row2';
        }else if (row.alertStatus == 4) {
          return 'suspended-row3';
        }else {
          return 'suspended-row0';
        }
      } else {
        if (row.alertStatus == 3) {
          return 'urgent-row';
        } else if (row.alertStatus == 1) {
          return 'delay-row';
        }else if (row.alertStatus == 4) {
          return 'conflict-row';
        }else{
          return '';
        }
      }
    },
    rowClass(row, index) {
      if(row.row.evenNum >= row.row.qty){
        return { 'background-color': '#FFDAB9' }
      }
    },
    // 监听多选 参数-所有选中的值
    handleSelectionChange(val){
      this.$store.dispatch('list/setSelections',val)
    },
    getSummaries({columns,data}) {
      const sums = [];
      columns.forEach((column,index) => {
        if(index == 0){
          sums[index] = '合计'
        }else{
          const values = data.map(item=>Number(item[column.property]))
          const flag = values.every(item=>isNaN(item))
          if(flag){
            return sums[index] = ""
          }else{
            if(column.property == 'num' ||  column.property == 'evenNum'|| column.property == 'adjNum'|| column.property == 'pastNum'|| column.property == 'nowNum') {
              sums[index] = values.reduce((total, item) => total + item);
              sums[index] = Math.round(sums[index] * 100) / 100;
              sums[index] += ""
            }
          }
        }
      })
      return sums
    },
    // 表格单击操作
    rowClick(row, column, el) {
      return this.$emit('row-click', { row, column, el });
    },
    // 表格双击操作
    dblclick(row, column, el) {
      return this.$emit('dblclick', { row, column, el });
    },
    // 监听每页显示数量
    handleSize(size) {
      return this.$emit('handle-size', size);
    },
    // 监听当前页码数
    handleCurrent(current) {
      return this.$emit('handle-current', current);
    }
  }
};
</script>

<!--<style>
  .el-table__body tr.current-row>td{
    background-color: #f19944 !important;
    /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
  }
  /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
  .el-table&#45;&#45;enable-row-hover .el-table__body tr:hover>td {
    background-color: #f19944;
    /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
  }

</style>-->
<style>
  .urgent-row {
    color: red;
  }
  .delay-row {
    color: orange;
  }
  .conflict-row {
    color: blue;
  }
  .suspended-row0 {
    background-color: #CD69C9 !important;
  }
  .suspended-row1 {
    background-color: #CD69C9 !important;
    color: red;
  }
  .suspended-row2 {
    background-color: #CD69C9 !important;
    color: orange;
  }
  .suspended-row3 {
    background-color: #CD69C9 !important;
    color: blue;
  }
</style>
