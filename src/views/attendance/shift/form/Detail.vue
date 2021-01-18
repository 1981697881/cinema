<template>
  <div>
    <el-form :model="form1" :rules="rules" ref="form1" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'oowId'" style="display: none;">
              <el-input v-model="form1.oowId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'班次代码'" prop="oowCode">
              <el-input v-model="form1.oowCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'班次名称'" prop="oowName">
              <el-input v-model="form1.oowName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'取卡最早时间'" prop="punchTimeLimit">
                <el-time-picker
                  arrow-control
                  v-model="form1.punchTimeLimit"
                  :picker-options="{
                selectableRange: '0:00:00 - 23:59:59'
               }"
                  value-format="HH:mm:ss"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'取卡最晚时间'" prop="punchTimeLast">
                <el-time-picker
                  arrow-control
                  v-model="form1.punchTimeLast"
                  :picker-options="{
                selectableRange: '0:00:00 - 23:59:59'
               }"
                  value-format="HH:mm:ss"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'迟到允许值'" prop="allowedLateNum">
                <el-input  v-model="form1.allowedLateNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'早退允许值'" prop="allowEarlyDeparture">
                <el-input v-model="form1.allowEarlyDeparture"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'加班起始值'" prop="overtimeAllowableValue">
                <el-input  v-model="form1.overtimeAllowableValue"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'取整分钟数'" prop="takeWholeMinutes">
                <el-input v-model="form1.takeWholeMinutes"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'第一用餐开始时间'" prop="foodStartTime">
                <el-time-picker
                  arrow-control
                  v-model="form1.foodStartTime"
                  :picker-options="{
                selectableRange: '0:00:00 - 23:59:59'
               }"
                  value-format="HH:mm:ss"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'第一用餐结束时间'" prop="foodEndTime">
                <el-time-picker
                  arrow-control
                  v-model="form1.foodEndTime"
                  :picker-options="{
                selectableRange: '0:00:00 - 23:59:59'
               }"
                  value-format="HH:mm:ss"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <div style="margin-top: 20px;margin-bottom: 10px">
              <el-button @click="setRow">添加</el-button>
            </div>
            <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true"  @row-dblclick="dblclick">
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="班次信息"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="form2" :rules="rules2" ref="form2" label-width="110px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'woId'" style="display: none">
              <el-input v-model="form2.woId" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item :label="'上班时间'" prop="startTime">
              <el-time-picker
                arrow-control
                v-model="form2.startTime"
                :picker-options="{
                selectableRange: '0:00:00 - 23:59:59'
               }"
                value-format="HH:mm:ss"
                placeholder="任意时间点">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item :label="'下班时间'" prop="endTime">
              <el-time-picker
                arrow-control
                v-model="form2.endTime"
                :picker-options="{
                selectableRange: '0:00:00 - 23:59:59'
              }"
                value-format="HH:mm:ss"
                placeholder="任意时间点">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'段内休息时间'" prop="takeBreaks">
              <el-input  v-model="form2.takeBreaks" placeholder="分钟"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'加班休息时间'" prop="overtimeBreak">
              <el-input v-model="form2.overtimeBreak" placeholder="分钟"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <!--<el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'段内休息'" prop="roleName">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item :label="'出勤类型'" prop="roleName">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData">确定</el-button>
    </div>
 </div>
</template>
<script>
  import {getShiftInfoList, shiftAdd, shiftAlter} from "@/api/attendance/index";
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
  },
  },
  data() {
    return {
      form2: {
        endTime: null,
        woId: null,
        takeBreaks: null,
        overtimeBreak: null,
        startTime: null
      },
      form1: {
        allowEarlyDeparture: null,
        allowedLateNum: null,
        oowCode: null,
        oowId: null,
        oowName: null,
        overtimeAllowableValue: null,
        foodStartTime: null,
        foodEndTime: null,
        punchTimeLast: null,
        punchTimeLimit: null,
        takeWholeMinutes: null,
      },
      visible: null,
      pidS: [],
      list: [],
      columns: [
        { text: "上班时间", name: "startTime" },
        { text: "下班时间", name: "endTime" },
        { text: "段内休息时间", name: "takeBreaks" },
        { text: "加班休息时间", name: "overtimeBreak" },
      ],
      pArray: [],
      rules: {
        allowEarlyDeparture: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],
        allowedLateNum: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],
        oowCode: [
          {required: true, message: '请输入编码', trigger: 'blur'},
        ],
        oowName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        overtimeAllowableValue: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],
        punchTimeLast: [
          {required: true, message: '请输入值', trigger: 'change'},
        ],
        punchTimeLimit: [
          {required: true, message: '请输入值', trigger: 'change'},
        ],
        takeWholeMinutes: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],foodStartTime: [
          {required: true, message: '请输入值', trigger: 'change'},
        ],
      foodEndTime: [
          {required: true, message: '请输入值', trigger: 'change'},
        ],
      },
      rules2: {
        overtimeBreak: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],
        takeBreaks: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],
        endTime: [
          {required: true, message: '请选择日期', trigger: 'change'}
        ],
        startTime: [
          {required: true, message: '请选择日期', trigger: 'change'}
        ],
      }
    }
  },
  mounted() {
    if(this.listInfo) {
      this.fetchData(this.listInfo.oowId)
    }
  },
  methods: {
    setList(val) {
      this.list = []
      this.list.push(val)
    },
    setRow() {
      this.visible = true
    },
    dblclick(obj) {
      this.visible = true
      this.form2 = obj
      this.$emit('showDialog', obj)
    },
    saveData() {
      this.$refs["form1"].validate((valid) => {
        //判断必填项
        if (valid) {
          //修改
          this.form1.workingHoursList = this.list
          if (typeof (this.form1.oowId) != undefined && this.form1.oowId != null) {
            shiftAlter(this.form1).then(res => {
              this.$emit('hideDialog')
              this.$emit('uploadList')
            });
            //保存
          }else{
            shiftAdd(this.form1).then(res => {
              this.$emit('hideDialog')
              this.$emit('uploadList')
            });
          }
        }else {
          return false
        }
      })
    },
    fetchData(val) {
      this.loading = true
      getShiftInfoList(val).then(res => {
        if(res.flag) {
          this.loading = false
          this.list = res.data['workingHoursList']
          this.form1 = res.data
        }
      });
    },
    confirm() {
      this.$refs['form2'].validate((valid) => {
        // 判断必填项
        if (valid) {
          this.visible = false
          this.setList(this.form2)
        } else {
          return false
        }
      })
    }
  }
};
</script>
