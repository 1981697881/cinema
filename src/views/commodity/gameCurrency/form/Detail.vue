<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'商品名称'" prop="goodsName">
            <el-input v-model="form.goodsName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'商品价格'">
            <el-input-number :min="1" v-model="form.goodsPrice"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'游戏币'">
            <el-input-number :min="1" v-model="form.coinCount"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'积分'">
            <el-input-number :min="1" v-model="form.integral"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-form-item :label="'描述'">
          <el-input type="textarea" v-model="form.goodsDescribe"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
  import {addCommodity} from "@/api/commodity/index";
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
        headers: {
          'authorization': getToken('cinerx'),
        },
        form: {
          goodsPrice: null,
          goodsType: 1,
          goodsName: null, // 名称
          coinCount: null,
          integral: null,
          goodsDescribe: null,
        },
        rules: {
          goodsName: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
        },
      };
    },
    mounted() {
      if (this.listInfo) {
        this.form = this.listInfo
      }
    },
    methods: {
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            addCommodity(this.form).then(res => {
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
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
