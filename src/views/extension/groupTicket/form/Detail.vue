<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'团体票类型'" prop="cdkeyNumber">
            <el-select v-model="form.cdkeyNumber" :disabled="disPl" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'数量'" prop="shareCount">
            <el-input-number v-model="form.shareCount" :disabled="disPl"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'使用时间'" prop="value">
            <el-date-picker
              v-model="form.value"
              :disabled="disPl"
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
        <el-col :span="12">
          <el-form-item :label="'是否批量'">
            <el-checkbox :disabled="disPl" v-model="form.batch"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'包含张数'">
            <el-input-number :disabled="disPl" v-model="form.ratio"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'备注'" prop="remark">
            <el-input type="textarea" v-model="form.remark"></el-input>
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
  import {addShareCdKey} from "@/api/extension/index";

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
          shareCount: null,
          cdkeyNumber: null,
          value: '',
          ratio: null,
          batch: false,
          remark: null,
          startDate: null,
          endDate: null,
        },
        disPl: false,
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
        pidS: [],
        pArray: [],
        levelFormat: [[1, '普通票'], [2, '通用票']],
        rules: {
          value: [
            {type: 'array', required: true, message: '请选择日期', trigger: 'change'}
          ],
          shareCount: [
            {required: true, type: 'number', min: 1, message: '请输入', trigger: 'blur'},
          ], cdkeyNumber: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
        },
      };
    },
    mounted() {
      this.fetchFormat();
      if (this.listInfo) {
        this.disPl = true
        this.form = this.listInfo
      } else {
        this.disPl = false
      }
    },
    methods: {
      changeDate(val) {
        this.form.startDate = val[0]
        this.form.endDate = val[1]
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            addShareCdKey(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          } else {
            return false;
          }
        })
      },
      fetchFormat() {
      },
    }
  };
</script>

<style>
</style>
