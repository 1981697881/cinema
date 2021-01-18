<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true"   @row-click="rowClick">
            <el-table-column
              v-for="(t,i) in columns"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              v-if="t.default!=undefined?t.default:true"
              :width="t.width?t.width:''"
            ></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="14">
          <el-col :span="12">
            <el-form-item :label="'模板编码'" prop="roleName">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'模板名称'" prop="roleName">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'内容'" prop="roleName">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'名称'" prop="roleName">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'接收人员'" prop="roleName">
              <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true"   @row-click="rowClick">
                <el-table-column
                  v-for="(t,i) in columns"
                  :key="i"
                  align="center"
                  :prop="t.name"
                  :label="t.text"
                  v-if="t.default!=undefined?t.default:true"
                  :width="t.width?t.width:''"
                ></el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px;">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import {FrameAdd,updateRoles,getSuperior,getCompany} from "@/api/system/permissions";

export default {
  props: {
      rid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
          rid: null,
          roleName: null, // 名称
          roleLevel:null,
      },
        pidS:[],
        columns: [
            { text: "模块列表", name: "" }
        ],
        pArray:[],
        rules: {
            roleName: [
                {required: true, message: '请输入名稱', trigger: 'blur'},
            ],
            roleLevel: [
                {required: true, message: '请选择等级', trigger: 'change'},
            ],

        },
      levelFormat: [[1,'一级'],[2,'二级']]
    };
  },
  created() {
      this.form.rid=this.rid
  },
  mounted() {
      this.fetchFormat();
    if (this.form.rid) {

    }
  },
  methods: {
      //监听单击某一行
      rowClick(obj) {
          this.checkDate=obj;
          this.$emit('showTree',obj)
          this.$store.dispatch("list/setClickData", obj);
      },
    saveData(form) {
        this.$refs[form].validate((valid) => {
            //判断必填项
            if (valid) {
                //修改
                if (typeof (this.form.rid) != undefined && this.form.rid != null) {
                    updateRoles(this.form).then(res => {
                        this.$emit('hideDialog', false)
                        this.$emit('uploadList')
                    });
                    //保存
                }else{
                    FrameAdd(this.form).then(res => {
                        this.$emit('hideDialog', false)
                        this.$emit('uploadList')
                    });
                }


            }else {
                return false;
            }
        })

    },
      fetchFormat() {
        //获取公司、上级下拉
          getSuperior().then(res => {
              this.pArray = res.data;
          });
          getCompany().then(res => {
              this.pArray = res.data;
          });
      },
    fetchData(val) {

    }
  }
};
</script>

<style>
</style>
