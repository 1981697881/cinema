<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :span="20">
        <el-col :span="12">
          <el-form-item label="是否提醒">
            <el-switch
              v-model="form.hallTip"
              active-value="1"
              inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="20">
        <el-col :span="24">
          <el-form-item :label="'内容'" >
            <el-input type="textarea" v-model="form.hallTipMessage"></el-input>
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
  import { updateHall } from "@/api/studios/index";
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
          hallId: null,
          hallTip: '0',
          hallTipMessage: null,
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
        this.form.hallId = this.listInfo.hallId
        this.form.hallTip = this.listInfo.hallTip
        this.form.hallTipMessage = this.listInfo.hallTipMessage
      }
    },
    methods: {
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            console.log(this.form)
            updateHall(this.form).then(res => {
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
