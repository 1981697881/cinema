<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'puId'" style="display: none">
            <el-input v-model="form.puId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'puDeId'" style="display: none">
            <el-input v-model="form.puDeId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="12">
          <el-form-item :label="'批号'">
            <el-input v-model="form.lotNo"  label="请输入批号" ></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20" type="flex" justify="center">
        <el-col :span="12">
          <el-form-item :label="'重量'">
            <el-input-number v-model="form.weight"  label="请输入重量" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20" type="flex" justify="center">
        <el-col :span="12">
          <el-form-item :label="'入库日期'">
            <el-date-picker
              v-model="form.putTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
   </el-form>
   <div slot="footer" style="text-align:center;padding-top: 15px">
       <el-button type="primary" @click.native="save('form')">保存</el-button>
     </div>
 </div>
</template>

<script>
import { procurementUpdate } from "@/api/warehouse/index";

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      form: {
        puDeId: null,
        puId: null,
        lotNo: null,
        weight: null,
        putTime: null
      },
      loading: false,
      list: [],
      type: null,
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
      rules: {
        lotNo: [
          {required: true, message: '请输入批号', trigger: 'blur'},
        ],
        weight: [
          {required: true, message: '请输入重量', trigger: 'blur'},
        ],
        putTime: [
          {required: true, message: '请输入生成日期', trigger: 'blur'},
        ],
      },
    };
  },
  created() {
  },
  mounted() {
    if (this.listInfo) {
     this.form = this.listInfo
    }
 },
 methods: {
    save(form) {
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          procurementUpdate(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          });
        } else {
          return false;
        }
      })
    },
 }
};
</script>

<style>
</style>
