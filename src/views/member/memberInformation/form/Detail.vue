<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'性别'">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat1" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'会员等级'">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat2" :key="i"></el-option>
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
          <el-form-item :label="'生日'" >
            <el-date-picker
              v-model="value1"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
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
import {addClerk, alterClerk, clerkInfo,getFrameList, } from "@/api/basic/index";
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
        nature: 3,
        tel: null,
        tpId: null,
        plId: null,
        deptIds: [],
        remark: null,
        name: null,// 名称
      },
      value1: '',
      levelFormat1:[['男', '男'], ['女', '女'], ['未知', '未知']],
      levelFormat2:[['一级', '一级'], ['二级', '二级']],
      disPl: true,
      pidS: [],
      pArray: [],
      rArray: [],
      aArray: [],
      rules: {
        jobNum: [
          {required: true, message: '请输入编码', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
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
         /* if (typeof (this.form.eid) != undefined && this.form.eid != null) {
            alterClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }else{
            addClerk(this.form).then(res => {
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
      const data = {
        pageNum: 1,
        pageSize: 50,
      };
      getFrameList(data,{ disable: false }).then(res => {
        this.pArray = res.data.records
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
