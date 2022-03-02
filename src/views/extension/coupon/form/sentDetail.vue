<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'优惠券名称'" >
            <el-input v-model="form.cname" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'开启时间'" prop="value">
            <el-date-picker
              v-model="form.value"
              type="datetimerange"
              align="right"
              style="width: auto"
              @change="dateChange"
              class="input-class"
              unlink-panels
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'发布数量'">
            <el-input-number v-model="form.totalCount" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="是否限量">
            <el-radio-group v-model="form.isPermanent" >
              <el-radio :label=0>限量</el-radio>
              <el-radio :label=1>不限量</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="是否限定" prop="couponLimit">
            <el-radio-group v-model="form.couponLimit" >
              <el-radio :label=0>否</el-radio>
              <el-radio :label=1>是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="hidden:true;">
        <el-col :span="24">
          <div class="scanImg" id="qrCode"></div>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
     <!-- <el-button v-if="form.isPermanent.couponLimit==1" type="success" @click="downLoad('form')">下载二维码</el-button>-->
    </div>
  </div>
</template>

<script>
  import { addCouponIssue} from "@/api/extension/index";
  import html2canvas from 'html2canvas';
  import QRCode from 'qrcodejs2'
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
          title: null, // 名称
          isPermanent: 0,
          couponLimit: 0,
          value: [],
          totalCount: null,
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 3600 * 1000 * 24;
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        rules: {
          value: [
            {type:'array',required: true, message: '请输入日期', trigger: 'change'},
          ],
        },
      };
    },
    mounted() {
      this.fetchFormat();
      if (this.listInfo) {
        this.form = this.listInfo
        this.form.cname = this.listInfo.title
        this.form.ctype = this.listInfo.type
        this.form.cid = this.listInfo.id
       /* if(this.listInfo.couponLimit==1){
          this.creatQrCode('qrCode','https://cfzx.gzfzdev.com/groupTicket?exchangeTCode=')
        }*/
      }
    },
    methods: {
      downLoad() {
        let myCanvas = document.getElementById('qrCode').getElementsByTagName('canvas');
        let a = document.createElement('a')
        a.href = myCanvas[0].toDataURL('image/png');
        a.download = '二维码';
        a.click()
        this.$message({
          message: "正在进行下载保存",
          type: 'success'
        })
      },
      creatQrCode(element,val) {
        var deleteNode =document.getElementById(element).innerText ='';
        var qrcode = new QRCode(element, {
          text: val, // 需要转换为二维码的内容
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
      },
      dateChange(val){
        this.form.startTime = val[0]
        this.form.endTime = val[1]
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            addCouponIssue(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          } else {
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
