<template>
  <div>
    <el-form ref="form" label-width="50px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="状态">
          <el-select v-model="value"  placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
            <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true"  @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                v-for="(t,i) in columns1"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
            </el-table>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;margin-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {addMovier,getStarList} from "@/api/basic/index";
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
        options: [{
          value: '可用',
          label: '可用'
        }, {
          value: '已生成',
          label: '已生成'
        }],
        multipleSelection: [],
        value: '可用',
        keyWords: [],
        list: [],
        columns1: [
          {text: "兑换码", name: "starName"},
          {text: "对应二维码号", name: "starName"},
          {text: "状态", name: "starName"},
        ],
      };
    },
    mounted() {
      if (this.listInfo) {

      }
    },
    methods: {
      // 查询条件过滤
      qFilter() {
        let obj = {}
        this.starName != null && this.starName != '' ? obj.starName = this.starName : null
        return obj
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //查询
      query(){
        getStarList(this.qFilter()).then(res => {
          if (res.flag) {
            this.list2 = res.data
          }
        })
      },

      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            //修改
            let param = this.form
            param.filmRoleVOS = this.list
            addMovie(param).then(res => {
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
<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
