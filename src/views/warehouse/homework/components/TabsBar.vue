<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              align="right"
              style="width: auto"
              class="input-class"
              unlink-panels
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'员工姓名'">
            <el-select v-model="search.uid" filterable class="width-full" placeholder="请选择员工" @change="changeCheck">
              <el-option :label="t.name" :value="t.uid" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click.native="upload">刷新</el-button>
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
         <!-- <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>-->
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getClerkList } from '@/api/basic/index'
import { getByUserAndPrId } from '@/api/system/index'
export default {
  components: {},
  computed: {
    ...mapGetters(['node','clickData','selections'])
  },
  data() {
    return {
      value: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      btnList: [],
      levelFormat: [],
      search: {
        keyword: null,
        uid: null
      }
    };
  },
  created: function() {
    this.value[0] = this.getDay('', -15).date
    this.value[1] = this.getDay('', 0).date
    this.fetchFormat()
  },
  mounted() {
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });
  },
  methods: {
    onFun(method){
      this[method]()
    },
    // 切换仓库
    changeCheck(val) {
      this.$emit('queryBtn', this.qFilter())
    },
    fetchFormat() {
      const data = {
        pageNum: 1,
        pageSize: 1500
      };
      getClerkList(data, {deptIds: [4], disable: false }).then(res => {
        this.search.uid = res.data.records[0].uid
        this.levelFormat = res.data.records
        this.$emit('queryBtn', this.qFilter())
      });
    },
    // 查询前后三天日期
    getDay(date, day){
      var today = new Date();
      var targetday_milliseconds=today.getTime() + 1000*60*60*24*day
      today.setTime(targetday_milliseconds) //注意，这行是关键代码
      var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      var getDay = today.getDay()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      var weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
      var week = weeks[getDay]
      return {
        day: tDate,
        week: week,
        date: tYear + '-' + tMonth + '-' + tDate
      }
    },
    doHandleMonth(month) {
      var m = month;
      if(month.toString().length == 1) {
        m = '0' + month;
      }
      return m;
    },
    // 下载文件
    download(res) {
      if (!res.data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([res.data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', res.headers['content-disposition'].split('filename=')[1])
      document.body.appendChild(link)
      link.click()
    },
    upload() {
      this.search.uid = null
      this.value = []
      this.value[0] = this.getDay('', -15).date
      this.value[1] = this.getDay('', 0).date
      this.$emit('uploadList')
    },
    // 切换仓库
    selectWorn(val) {
      this.$emit('queryBtn', this.qFilter())
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.uid != null || this.search.uid != undefined ? obj.uid = this.search.uid : null
      this.value != null || this.value != undefined ? obj.endDate = this.value[1] : null
      this.value != null || this.value != undefined ? obj.startDate = this.value[0] : null

      return obj
    },
    exportData() {
     /* this.$message({
        message: '抱歉，功能尚未完善！',
        type: 'warning'
      });*/
      this.$emit('exportData')
      /* exportOutboundStatistics(this.qFilter()).then(res => {
         this.download(res)
       })*/
    },
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
  }
};
</script>

<style>
</style>
