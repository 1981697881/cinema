<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'开场时间'">
            <el-date-picker
              v-model="form.putTime"
              align="right"
              type="datetime"
              style="width: auto"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'散场时间'">
            <el-date-picker
              v-model="form.putTime"
              align="right"
              style="width: auto"
              type="datetime"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'正常票价'">
            <el-input-number v-model="form.tel"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'团购票价'">
            <el-input-number v-model="form.tel"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="danger" @click="closeDown">停播</el-button>
      <el-button type="primary" @click="saveData('form')">修改</el-button>
    </div>
  </div>
</template>

<script>
  import {alterSupplier, addSupplier} from "@/api/basic/index";

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
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        form: {
          loPrId: null,
          loPrName: null, // 名称
          loPrCode: null,
          contact: null,
          addr: null,
          tel: null,
          description: null,
        },
        pidS: [],
        pArray: [],
        rules: {
          loPrName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          loPrCode: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
        },
      };
    },
    mounted() {
      this.fetchFormat();
      if (this.listInfo) {
        this.form = this.listInfo
      }
    },
    methods: {
      closeDown() {
        //if (typeof (this.form.loPrId) != undefined && this.form.loPrId != null) {
          this.$prompt('请输入停播原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            this.$message({
              type: 'success',
              message: '你的原因是: ' + value
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        /*} else {
          this.$message({
            type: 'info',
            message: '当前场次不存在'
          });
        }*/
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            /* if (typeof (this.form.loPrId) != undefined && this.form.loPrId != null) {
               alterSupplier(this.form).then(res => {
                 this.$emit('hideDialog', false)
                 this.$emit('uploadList')
               });
             }else{
               addSupplier(this.form).then(res => {
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
      },
    }
  };
</script>

<style>
</style>
