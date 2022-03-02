<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="20" style="display: none">
        <el-col :span="24">
          <div class="scanImg" id="qrCode"></div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
       <!-- <el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.couponTitle" placeholder="名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>-->
        <el-button-group style="float:right">
         <!-- <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="downLoad">下载二维码</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"   @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getByUserAndPrId } from '@/api/system/index'
import QRCode from 'qrcodejs2'
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      btnList: [],
      search: {
        couponTitle: null
      }
    };
  },
  mounted() {
    let path = this.$route.meta.id
 /*   getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });*/
  },
  methods: {
    onFun(method){
      this[method]()
    },
    downLoad() {
      if (this.clickData.id) {
        if(this.clickData.couponLimit == 1){
          this.creatQrCode('qrCode','https://cfzx.gzfzdev.com/groupTicket?exchangeTCode='+this.clickData.exchangeCode);
          let myCanvas = document.getElementById('qrCode').getElementsByTagName('canvas');
          let a = document.createElement('a')
          a.href = myCanvas[0].toDataURL('image/png');
          a.download = '二维码';
          a.click()
          this.$message({
            message: "正在进行下载保存",
            type: 'success'
          })
        }else{
          this.$message({
            message: "当前选中优惠券不能生成二维码",
            type: "warning"
          })
        }
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }

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
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.couponTitle != null && this.search.couponTitle != '' ? obj.couponTitle = this.search.couponTitle : null
      return obj
    },
    // 关键字查询
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    Delivery() {
      if (this.clickData.id) {
        this.$confirm('是否删除(' + this.clickData.title + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', {id:this.clickData.id})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.$emit('uploadList')
    },
    handlerAlter() {
      if (this.clickData.id) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
  }
};
</script>

<style>
</style>
