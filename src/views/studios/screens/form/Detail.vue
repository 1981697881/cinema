<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'所属影城'" prop="orgAttr">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormatTT" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="loPrName">
            <el-input v-model="form.loPrName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'影厅负责人'" >
            <el-input v-model="form.contact"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'影厅类别'" prop="orgAttr">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="20">
        <el-col :span="12">
          <el-form-item :label="'开场时间'" prop="foodStartTime">
            <el-time-picker
              v-model="form.foodStartTime"
              :picker-options="{
                selectableRange: '10:00:00 - 14:00:00'
               }"
              value-format="HH:mm:ss"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'结束时间'" prop="foodEndTime">
            <el-time-picker
              v-model="form.foodEndTime"
              :picker-options="{
                selectableRange: '14:00:00 - 23:59:59'
               }"
              value-format="HH:mm:ss"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="20">
        <el-col :span="24">
          <el-form-item :label="'座位配置'" prop="foodStartTime">

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
import { alterSupplier, addSupplier } from "@/api/basic/index";

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
        loPrId: null,
        loPrName: null, // 名称
        loPrCode: null,
        contact: null,
        addr: null,
        tel: null,
        description: null,
      },
      levelFormatTT: [['A', 'A'], ['B', 'B']],
      levelFormat: [['2D', '2D'], ['3D', '3D']],
      pidS:[],
      pArray:[],
      rules: {
        loPrName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        loPrCode: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
      },
    };
  },
  mounted() {
    this.fetchFormat();
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
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
        }else {
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
