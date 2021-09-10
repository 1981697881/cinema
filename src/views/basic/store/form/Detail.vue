<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-form-item :label="'名称'" prop="storeName">
          <el-input v-model="form.storeName"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item :label="'影院内码'" prop="cinemaLinkId">
          <el-input v-model="form.cinemaLinkId"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item :label="'影院key'" prop="fhKey">
          <el-input v-model="form.fhKey"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item :label="'接口地址'" prop="fhUrl">
          <el-input v-model="form.fhUrl"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item :label="'渠道码'" prop="channelCode">
          <el-input v-model="form.channelCode"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item :label="'门店地址'" prop="storeAddress">
          <el-input v-model="form.storeAddress"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item :label="'经度'" prop="longitude">
          <el-input-number v-model="form.longitude"></el-input-number>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item :label="'纬度'" prop="latitude">
          <el-input-number v-model="form.latitude"></el-input-number>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item :label="'V8接口'" prop="v8Url">
          <el-input v-model="form.v8Url"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item :label="'V8场地id'" prop="v8PlaceId">
          <el-input v-model="form.v8PlaceId"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-form-item :label="'V8key'" >
          <el-input v-model="form.v8Key"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
          <el-form-item :label="'是否启用'" >
            <el-switch
              v-model="form.status"
              active-value="0"
              inactive-value="1"
            >
            </el-switch>
          </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'客服电话'" prop="orgAttr">
            <div style="margin-top: 20px;margin-bottom: 10px">
              <el-button @click="setRow">添加</el-button>
              <el-button @click="delRow">删除</el-button>
            </div>
            <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true" >
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="delRow(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="客服信息"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="userform" :rules="rules1" ref="userform" label-width="80px" :size="'mini'">
        <el-row :span="24">
          <el-col :span="12">
            <el-form-item :label="'客服电话'" prop="phone">
              <el-input v-model="userform.phone"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="primary" @click="saveStart('userform')">保存</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {addStore} from "@/api/basic/index";

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
          storeName: null,
          cinemaLinkId: null,
          fhKey: null,
          fhUrl: null,
          channelCode: null,
          storeAddress: null,
          longitude: 0,
          latitude: 0,
          v8Url: null,
          v8PlaceId: null,
          v8Key: null,
          status: "0",
        },
        userform: {
          phone: null,
        },
        disPl: true,
        visible: false,
        pidS: [],
        checkData: {},
        list: [],
        columns: [{ text: "客服电话", name: "phone" },],
        rules: {
          storeName: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
          cinemaLinkId: [
            {required: true, message: '请输入', trigger: 'blur'},
          ], fhKey: [
            {required: true, message: '请输入', trigger: 'blur'},
          ], fhUrl: [
            {required: true, message: '请输入', trigger: 'blur'},
          ], channelCode: [
            {required: true, message: '请输入', trigger: 'blur'},
          ], storeAddress: [
            {required: true, message: '请输入', trigger: 'blur'},
          ], v8Url: [
            {required: true, message: '请输入', trigger: 'blur'},
          ], v8PlaceId: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
        },rules1: {
          phone: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
        },
      };
    },
    mounted() {
      if (this.listInfo) {
        this.form = this.listInfo
        if(this.form.customerServicePhoneList!=null){
          this.form.customerServicePhoneList.forEach((item)=>{
            let obj = {
              phone: item
            }
            this.list.push(obj)
          })
        }
      }
    },
    methods: {
      saveStart(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            let obj = {
              phone: this.userform.phone
            }
            this.list.push(obj)
            this.visible = false
          } else {
            return false;
          }
        })

      },
      yzClick(row, column, event){
        console.log(row)
        console.log(column)
        this.checkData = row
        this.checkIndex = column
      },
      setRow() {
        this.postform ={
          roleName: null, // 名称
          roleType: null,
        }
        this.visible = true
      },
      delRow(index, row){
        if (row.phone) {
          this.$confirm('是否删除(' + row.phone + ')，删除后将无法恢复?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.list.splice(index, 1)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message({
            message: '无选中行',
            type: 'warning'
          })
        }
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            let array = []
            this.list.forEach((item)=>{
              array.push(item.phone)
            })
            this.form.customerServicePhoneList = array
            addStore(this.form).then(res => {
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
</style>
