<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'场次时间'">
            <el-time-picker
              is-range
              v-model="value1"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="timeChange"
              value-format="HH:mm:ss"
              format="HH:mm:ss"
              placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'正常票价'" prop="money">
            <el-input-number v-model="form.money"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'团购票价'" prop="memberMoney">
            <el-input-number v-model="form.memberMoney"></el-input-number>
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
        value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        form: {
          sessionsStarttime: null,
          sessionsEndtime: null, // 名称
          money: null,
          memberMoney: null,
        },
        pidS: [],
        pArray: [],
        rules: {
           money: [
            {required: true, message: '请输入',type:'number', trigger: 'blur'}
          ], memberMoney: [
            {required: true, message: '请输入',type:'number', trigger: 'blur'}
          ],
        },
      };
    },
    mounted() {
      this.fetchFormat();
      if (this.listInfo) {
        this.form = this.listInfo
        let date = this.listInfo.sessionsDate.split('-')
        let time1 = this.listInfo.sessionsStarttime.split(':')
        let time2 = this.listInfo.sessionsEndtime.split(':')
        this.value1 = [new Date(date[0],date[1],date[2],time1[0],time1[1]),new Date(date[0],date[1],date[2],time2[0],time2[1])]
      }
    },
    methods: {
      timeChange(val){
        this.form.sessionsStarttime = val[0]
        this.form.sessionsEndtime = val[1]
      },
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
            if(this.form.sessionsStarttime != null){
              console.log(this.form)
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
            }else{
              this.$message({
                type: 'info',
                message: '请选择时间'
              });
            }
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
