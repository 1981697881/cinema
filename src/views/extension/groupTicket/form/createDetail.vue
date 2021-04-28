<template>
  <div>
    <el-form ref="form" label-width="50px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="状态">
          <el-select v-model="value"  @change="selectChange" placeholder="请选择">
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
            <el-table class="list-main" height="250px" :data="list" border size="mini" :highlight-current-row="true"  @selection-change="handleSelectionChange">
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
      <el-button :disabled="isClick" type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {handShareCdKey,qrShareList} from "@/api/extension/index";
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
        isClick: false,
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
          {text: "兑换码", name: "cdkeyCode"},
          {text: "状态", name: "statusMessage"},
        ],
      };
    },
    mounted() {
      if (this.listInfo) {
          this.createDatetime = this.listInfo.createDatetime
          this.query()
      }
    },
    methods: {
      selectChange(val){
        if(val =='已生成'){
          this.isClick = true
        }else{
          this.isClick = false
        }
        console.log(val)
        this.query()
      },
      // 查询条件过滤
      qFilter() {
        let obj = {}
        this.value != null && this.value != '' ? obj.memberCdkeyShare = this.value : null
        this.createDatetime != null && this.createDatetime != '' ? obj.createDatetime = this.createDatetime : null
        return obj
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //查询
      query(){
        qrShareList(this.qFilter()).then(res => {
          if (res.flag) {
            this.list = res.data
          }
        })
      },

      saveData() {
          //判断必填项
          if (this.multipleSelection.length>0) {
            //修改
            let param = this.form
            let sArray =[]
            this.multipleSelection.forEach((item,index)=>{
              sArray.push(item.cdkeyCode)
            })
            handShareCdKey({cdkeyCodes:sArray}).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          } else {
            return false;
          }
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
