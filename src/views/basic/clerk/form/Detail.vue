<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工号'" prop="jobNum">
            <el-input v-model="form.jobNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'所属影城'" prop="deptIds">
            <el-select v-model="form.cinemaId" class="width-full"  placeholder="请选择影城">
              <el-option :label="t.cinemaName" :value="t.cinemaId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系地址'" >
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系电话'" >
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'描述'" >
            <el-input v-model="form.remark"></el-input>
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
import { addClerk, alterClerk, locationFormat, clerkInfo,getFrameList } from "@/api/basic/index";
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
        eid: null,
        jobNum: null,
        address: null,
        tel: null,
        cinemaId: null,
        remark: null,
        name: null,// 名称
      },
      disPl: true,
      pidS: [],
      pArray: [],
      rArray: [],
      aArray: [],
      rules: {
        jobNum: [
          {required: true, message: '请输入工号', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        deptId: [
          {type: 'array', required: true, message: '请选择影城', trigger: 'change'},
        ],
      },
    };
  },
  mounted() {
    this.fetchFormat()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (typeof (this.form.eid) != undefined && this.form.eid != null) {
            alterClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }else{
            addClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }
        } else {
          return false;
        }
      })
    },
    // 切换类别
    selectChange(val) {
      this.disPl = false
      this.form.plId = null
      this.rArray = []
      this.fetchLine(val)
    },
    fetchFormat() {
      locationFormat().then(res => {
        this.pArray = res.data
      });
      },
    fetchData(val) {
      clerkInfo(val).then(res => {
        this.form = res.data;
      });
    }
  }
};
</script>

<style>
</style>
