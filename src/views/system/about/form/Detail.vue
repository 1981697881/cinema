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
          <quill-editor v-model="form.aboutMessage"  :options="quillOption" style="height: 200px"></quill-editor>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 100px">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import { addAbout } from "@/api/system/index";
import { quillEditor } from 'vue-quill-editor'
import quillConfig from '@/quill-config.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {
  getToken
} from '@/utils/auth'
export default {
  components: { quillEditor },
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
      quillOption: quillConfig,
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
