<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :span="20">
        <el-col :span="12">
          <el-form-item label="需补差额">
            <el-input-number v-model="form.hallImbalance" :min="0"></el-input-number>
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
import { hallImbalance } from "@/api/studios/index";
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
        hall_id: null,
        hallImbalance: 0,
      },
      rules: {
        hallName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        cinemaId: [
          {required: true, message: '请选择', trigger: 'change'},
        ],

      },
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form.hall_id = this.listInfo.hallId
    }
  },
  methods: {

    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          console.log(this.form)
          hallImbalance(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
        }else {
          return false;
        }
      })
    },

  }
};
</script>

<style type="scss">
  .seat .el-form-item__content{
    height: 250px;
    overflow: auto;
  }
  .el-form-item__error{
    display: contents;
  }
</style>
