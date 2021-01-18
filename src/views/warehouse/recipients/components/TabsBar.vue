<template>
  <div class="list-header">
    <el-form  :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'出货日期'">
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
          <el-form-item :label="'单号'">
            <el-input v-model="search.docNo" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'色号'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'仓库'">
            <el-input v-model="search.whName" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'核准状态'" :label-width="'70px'">
            <el-select v-model="isConfirm" placeholder="请选择" @change="selectChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right;padding-right: 10px">
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="handleSync">U9同步</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-check" @click="notarize">核准</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-error" @click="cancelNotarize">取消核准</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
        </el-button-group>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="确认信息"
      v-if="visible"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <el-form :model="form" ref="form" label-width="120px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'单号'" >
              <el-input v-model="form.docNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'组织编码'" >
              <el-input v-model="form.orgCode" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'物料名'" >
              <el-input v-model="form.itemName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'物料编码'" >
              <el-input v-model="form.itemCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'色号'" >
              <el-input v-model="form.color"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'客户名称'" >
              <el-input v-model="form.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'客户编码'" >
              <el-input v-model="form.customeCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" >
            <el-form-item :label="'日期'" >
              <el-date-picker
                v-model="form.value"
                type="daterange"
                align="right"
                style="width: auto"
                unlink-panels
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeDate"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="primary" @click.native="confirm('form')" v-loading.fullscreen.lock="fullscreenLoading">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {syncShipInfo, exportRecipients, notarizeOutputMorn, notarizeCancelOutputList} from '@/api/warehouse/index'
import { getByUserAndPrId } from '@/api/system/index'
export default {
  components: {},
  computed: {
    ...mapGetters(['node','clickData','selections'])
  },
  data() {
    return {
      visible: null,
      fullscreenLoading: false,
      form: {
        docNo: '',
        customeCode: '',
        customerName: '',
        color: '',
        itemCode: '',
        itemName: '',
        orgCode: '901',
        businessDateStart: '',
        businessDateEnd: '',
        value: [],
      },
      options: [{
        value: true,
        label: '已核准'
      }, {
        value: false,
        label: '未核准'
      }],
      btnList: [],
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
      isConfirm: false,
      search: {
        keyword: null,
        whName: null,
        docNo: null,
        type: null
      }
    };
  },
  created: function() {
    this.value[0] = this.getDay('', -30).date
    this.value[1] = this.getDay('', 10).date
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
    changeDate(val) {
      this.form.businessDateEnd = val[1]
      this.form.businessDateStart = val[0]
    },
    selectChange(val) {
      this.isConfirm = val
      this.$emit('uploadList')
    },
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
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
      this.search.whName = ''
      this.search.keyword = ''
      this.search.docNo = ''
      this.value = []
      this.value[0] = this.getDay('', -15).date
      this.value[1] = this.getDay('', 0).date
      this.isConfirm = false
      this.$emit('uploadList')
    },
    notarize() {
      if (this.selections.length>0) {
        const selection = this.selections
        let arrray = []
        selection.forEach((item, index) => {
          if(arrray.indexOf(item.spId) == -1){
            arrray.push(item.spId)
          }
        })
        notarizeOutputMorn(arrray).then(res => {
          if(res.flag) {
            this.upload()
          }
        })
        /*this.$emit('showDialog', this.clickData)*/
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    cancelNotarize() {
      if (this.clickData.spId) {
        this.$confirm('是否取消核准' + this.clickData.shipNo + '整张单据，取消后PDA将不展示该单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          notarizeCancelOutputList(this.clickData.spId).then(res => {
            if(res.flag) {
              this.upload()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

        /*this.$emit('showDialog', this.clickData)*/
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null && this.search.keyword != '' ? obj.color = this.search.keyword : null
      this.search.docNo != null && this.search.docNo != '' ? obj.docNo = this.search.docNo : null
      this.search.whName != null && this.search.whName != '' ? obj.whName = this.search.whName : null
      this.value != null || this.value != undefined ? obj.businessDateEnd = this.value[1] : null
      this.value != null || this.value != undefined ? obj.businessDateStart = this.value[0] : null
      obj.isConfirm = this.isConfirm
      return obj
    },
    exportData() {
      exportRecipients(this.qFilter()).then(res => {
        this.download(res)
      })
    },
    confirm(form) {
      this.fullscreenLoading = true
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          /*   if(this.form.value.length > 0) {*/
          delete this.form.value
          syncShipInfo(this.form).then(res => {
            this.fullscreenLoading = false
            this.visible = false
            this.upload()
          })
          /* }else{
            this.$message({
              message: '请选择时间',
              type: 'warning'
            });
          }*/
        } else {
          return false
        }
      })
    },
    handleSync() {
      this.visible = true
    },
    handleAlter() {
      if (this.clickData.gid) {
        this.$emit('showDialog',{
          gid: this.clickData.gid,
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
  }
};
</script>

<style>
</style>
