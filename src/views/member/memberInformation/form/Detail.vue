<template>
  <div>
    <el-form ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'状态'">
            <el-select v-model="status" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="'使用时间'">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              align="right"
              style="width: auto"
              class="input-class"
              unlink-panels
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-table class="list-main" height="250px" :data="list" border size="mini" :highlight-current-row="true"  @selection-change="handleSelectionChange">
            <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
            <el-table-column
              type="selection"
              :selectable="selectable"
              width="55">
            </el-table-column>
            <template v-for="(t,i) in columns1" >
            <el-table-column
              align="center"
              :prop="t.name"
              :label="t.text"
              :key="i"
              v-if="t.name!='status'"
              :width="t.width?t.width:''"
            ></el-table-column>
            <el-table-column
              align="center"
              :prop="t.name"
              :label="t.text"
              :key="i"
              v-else
              :width="t.width?t.width:''"
            >
              <template width="90" slot-scope="scope">
                <span>{{scope.row.status | statusText}}</span>
              </template>
            </el-table-column>
</template>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="团体票修改"
      v-if="visible"
      :width="'30%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="userform" :rules="rules" ref="userform" label-width="80px" :size="'mini'">
        <el-row :span="24">
          <el-col :span="12">
            <el-form-item :label="'名称'">
              <el-input v-model="userform.couponName" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'使用时间'" prop="value">
              <el-date-picker
                v-model="userform.value"
                type="datetimerange"
                align="right"
                style="width: auto"
                class="input-class"
                unlink-panels
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-button type="primary" @click="saveData('userform')">保存</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveDataList">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {memberCouponList, updateCouponStatus} from "@/api/extension/index";
  import {
    getToken
  } from '@/utils/auth'

  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        pickerOptions: {
          disabledDate: time => {
            let beginDateVal = new Date()
            beginDateVal = beginDateVal.setDate(beginDateVal.getDate() - 1)
            beginDateVal = new Date(beginDateVal)
            return time.getTime() <= beginDateVal;
          },
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
        headers: {
          'authorization': getToken('cinerx'),
        },
        statuslist:[{name:"0",label:"未使用"},{name:"1",label:"已使用"},{name:"2",label:"已过期"},],
        userform: {
          couponName: null,
          status: "0",
          value: [],
        },
        options: [{
          value: '0',
          label: '正常'
        }, {
          value: '2',
          label: '禁用'
        }],
        status: "0",
        value: [],
        rules: {
          value: [
            {type: 'array', required: true, message: '请选择日期', trigger: 'change'}
          ],
        },
        visible: null,
        keyWords: [],
        list: [],
        multipleSelection: [],
        columns1: [
          {text: "团体票名称", name: "couponName"},
          {text: "生效时间", name: "startDate"},
          {text: "失效时间", name: "endDate"},
          {text: "状态", name: "status"},

        ],
      };
    },
    filters: {
      statusText(value) {
        if (value == "0") {
          return '未使用';
        } else if (value == "1") {
          return '已使用';
        }else if (value == "2") {
          return '已过期';
        }
      }
    },
    mounted() {
      if (this.listInfo) {
        this.query()
      }
    },
    methods: {
      changeDate(val) {
        this.userform.startDate = val[0]
        this.userform.endDate = val[1]
      },
      handleSelectionChange(val) {
        let that = this

          this.multipleSelection = val;



      },
      //判断勾选
      selectable(row, index) {
        if (row.status == '1' ) {
          return false;
        } else {
          return true;
        }
      },
      dblclick(obj){
        if(obj.status != "1" ){
          this.visible = true
          this.userform.value = [obj.startDate,obj.endDate]
          this.userform.couponName = obj.couponName

          this.userform.id = obj.id
        }else{
          this.$message.error('只允许修改未使用或已过期的票据');
        }
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            var params = {...this.userform}
            delete params.value
            updateCouponStatus(params).then(res => {
                  this.visible = false
              });
          } else {
            return false;
          }
        })

      },saveDataList() {
        var that = this
        if(that.value.length > 0){
          var params = []
          this.multipleSelection.forEach((item)=>{
            var obj = {}
            obj.id = item.id
            obj.status = that.status
            obj.endDate = that.value[1]
            params.push(obj)
          })

          updateCouponStatus(params).then(res => {
            this.query()
          });
        }else{
          this.$message.error('请录入时间');
        }


      },
      //查询
      query(){
        memberCouponList({openId: this.listInfo.openId, status: this.listInfo.type}).then(res => {
          if (res.flag) {
            this.list = res.data
          }
        })
      },
    }
  };
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>
<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
</style>

<!--
<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'性别'">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat1" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'会员等级'">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat2" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系地址'" >
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系电话'" >
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生日'" >
            <el-date-picker
              v-model="value1"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import {memberCouponList, alterClerk, clerkInfo,getFrameList, } from "@/api/basic/index";
export default {
  props: {
      listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        eid: null,
        jobNum: null,
        address: null,
        nature: 3,
        tel: null,
        tpId: null,
        plId: null,
        deptIds: [],
        remark: null,
        name: null,// 名称
      },
      value1: '',
      levelFormat1:[['男', '男'], ['女', '女'], ['未知', '未知']],
      levelFormat2:[['一级', '一级'], ['二级', '二级']],
      disPl: true,
      pidS: [],
      pArray: [],
      rArray: [],
      aArray: [],
      rules: {
        jobNum: [
          {required: true, message: '请输入编码', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
      },
    };
  },
  mounted() {
    this.fetchFormat()
    if (this.listInfo) {
      this.form = this.listInfo

    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
         /* if (typeof (this.form.eid) != undefined && this.form.eid != null) {
            alterClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }else{
            addClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }*/
        } else {
          return false;
        }
      })
    },
    fetchFormat() {
      const data = {
        pageNum: 1,
        pageSize: 50,
      };
      getFrameList(data,{ disable: false }).then(res => {
        this.pArray = res.data.records
      });
      },
    fetchData(val) {
      clerkInfo(val).then(res => {
        this.form = res.data;
      });
    }
  }
};
</script>

<style>
</style>
-->
