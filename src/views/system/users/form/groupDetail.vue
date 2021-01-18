<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'gpId'" style="display: none">
            <el-input v-model="form.gpId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18" style="padding-left: 15%">
          <el-form-item :label="'用户组名称'" prop="gpName">
            <el-input v-model="form.gpName"></el-input>
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
  import {groupAdd, groupAlter} from "@/api/system/index";
  export default {
    props: {
      gpInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        form: {
          gpId: null,
          gpName: null, // 名称
          gpLevel: -1,
        },
        pidS:[],
        pArray:[],
        rules: {
          gpName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          gpLevel: [
            {required: true, message: '请选择等级', trigger: 'change'},
          ],

        },
        levelFormat: [[1,'一级'],[2,'二级']]
      };
    },
    created() {
      if(this.gpInfo){
        this.form = this.gpInfo
      }
    },
    mounted() {

    },
    methods: {
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            if (typeof (this.form.gpId) != undefined && this.form.gpId != null) {
              groupAlter(this.form).then(res => {
                this.$emit('hideGroupDialog', false)
                this.$emit('uploadGroup')
              });
            } else {
              groupAdd(this.form).then(res => {
                this.$emit('hideGroupDialog', false)
                this.$emit('uploadGroup')
              });
            }
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
