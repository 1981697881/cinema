<template>
  <div class="list-header">
    <el-form  :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'到货日期'">
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
            <el-input v-model="search.docNo" placeholder="单号"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'旧料号'">
            <el-input v-model="search.keyword" placeholder="旧料号"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'仓库'">
            <el-input v-model="search.whName" placeholder="仓库"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
       <!-- <el-col :span="3">
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
        </el-col>-->
        <el-button-group style="float:right;padding-right: 10px">
          <!--  <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="handleSync">U9同步</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="print">打印</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-check" @click="notarize">确认</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handleShow">补充信息</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>-->
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
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
            <el-form-item :label="'供应商名称'" >
              <el-input v-model="form.supplierName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'供应商编码'" >
              <el-input v-model="form.supplierCode"></el-input>
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
import { mapGetters } from "vuex"
import { syncPOInfoQuery, procurementBarcode, exportProcurement, notarizeBeputList} from "@/api/warehouse/index"
import { PrintThree } from '@/tools/doPrint'
import { getByUserAndPrId } from '@/api/system/index'
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      fullscreenLoading: false,
      visible: null,
      form: {
        docNo: '',
        supplierCode: '',
        supplierName: '',
        itemCode: '',
        itemName: '',
        color: '',
        orgCode: '901',
        businessDateStart: '',
        businessDateEnd: '',
        value: [],
      },
      btnList: [],
      options: [{
        value: true,
        label: '已核准'
      }, {
        value: false,
        label: '未核准'
      }],
      value: '',
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
      planArriveDate: null,
      isConfirm: false,
      search: {
        keyword: null,
        whName: null,
        docNo: null,
        type: null
      }
    };
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
    selectChange(val) {
      this.isConfirm = val
      this.$emit('uploadList')
    },
    changeDate(val) {
      this.form.businessDateEnd = val[1]
      this.form.businessDateStart = val[0]
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
    notarize() {
      if (this.clickData.puId) {
        notarizeBeputList(this.clickData.puId).then(res => {
          if(res.flag) {
            this.upload()
          }
        })
        /*this.$emit('showDialog', this.clickData)*/
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    confirm(form) {
      this.fullscreenLoading = true
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          delete this.form.value
          syncPOInfoQuery(this.form).then(res => {
            this.visible = false
            this.fullscreenLoading = false
            this.upload()
          })
        } else {
          return false
        }
      })
    },
    handleSync() {
      this.visible = true
    },
    upload() {
      this.search.keyword = ''
      this.search.whName = ''
      this.search.docNo = ''
      /*this.isConfirm = false*/
     /* this.planArriveDate = ''*/
      this.value = ''
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      console.log(this.value)
      this.search.keyword != null && this.search.keyword != '' ? obj.color = this.search.keyword : null
      this.search.docNo != null && this.search.docNo != '' ? obj.docNo = this.search.docNo : null
      this.search.whName != null && this.search.whName != '' ? obj.whName = this.search.whName : null
     /* this.planArriveDate != null && this.planArriveDate != '' ? obj.planArriveDate = this.planArriveDate : null*/
      this.value != null || this.value != undefined ? obj.planArriveDateEnd = this.value[1] : null
      this.value != null || this.value != undefined ? obj.planArriveDateStart = this.value[0] : null
     /* obj.isConfirm = this.isConfirm*/
      return obj
    },
    exportData() {
      exportProcurement(this.qFilter()).then(res => {
        this.download(res)
      })
    },
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    handleShow() {
      if (this.clickData.puDeId) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    handleAlter() {
      if (this.clickData.puDeId) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },

    print() {
      if (this.selections.length>0) {
        let selections = this.selections
        let array = []
        selections.forEach((item, index) =>{
          let obj = {}
          eval("obj.printId=" + item.puDeId)
          eval("obj.printNum=" + 1 )
          eval("obj.type=" + 1)
          array.push(obj)
        })
        procurementBarcode({barcodeList: array}).then(res => {
          PrintThree(res.data)
          LODOP.PREVIEW()
        })
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
  }
};
</script>

<style>
</style>
