<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'soId'" style="display: none">
            <el-input v-model="form.soId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item :label="'厂务预计日期'"   prop="factoryEstimatedDate" >
            <div class="block" >
              <el-date-picker
                v-model="form.factoryEstimatedDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
   </el-form>
   <div slot="footer" style="text-align:center;padding-top: 15px">
       <el-button type="primary" @click.native="confirm('form')">确认</el-button>
     </div>
 </div>
</template>

<script>
import { notarizeList} from "@/api/aftermarket/index"

export default {
 props: {
   soId: {
     type: Number,
     default: null
   },
 },
 data() {
   return {
     form: {
       soId: null,
       factoryEstimatedDate: null,
     },
     rules: {
       factoryEstimatedDate: [
         {required: true, message: '请选择日期', trigger: 'change'}
       ],
     },
   }
 },
 mounted() {
   this.form.soId = this.soId
 },
 methods: {
   confirm(form) {
     this.$refs[form].validate((valid) => {
       // 判断必填项
       if (valid) {
         notarizeList(this.form).then(res => {
           this.$emit('hideDialog', false)
           this.$emit('uploadList')
         })
       } else {
         return false
       }
     })

   },
 }
};
</script>

<style>
</style>
