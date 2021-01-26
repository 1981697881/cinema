<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'标题'" prop="aboutName">
            <el-input v-model="form.aboutName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <tinymce style="width: 99%" language='zh_CN' v-model="form.aboutMessage" :height="500" />
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import { addAbout } from "@/api/system/index";
import Tinymce from "@/components/Tinymce";
import {
  getToken
} from '@/utils/auth'
export default {
  components: { Tinymce },
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
        aboutName: null, // 名称
        aboutMessage: null,
      },
      rules: {
        aboutName: [
          {required: true, message: '请输入标题', trigger: 'blur'},
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
          addAbout(this.form).then(res => {
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

<style>
</style>
