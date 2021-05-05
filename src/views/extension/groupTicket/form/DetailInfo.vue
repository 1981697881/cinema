<template>
  <div>
    <el-row :gutter="20" id="all1" class="printClass">
      <div class="rowClass">
        <div class="pdfClass" v-for="(item,index) in multipleSelection" :key="index">
          <img
            class="pdfImg"
            style="width: 14.5cm; height: 6.62cm;"
            src="@/assets/img/_20210428205913.jpg"
            fit="fit"/>
          <div class="scanImg" :id="'qrCode'+index"></div>
        </div>
      </div>
    </el-row>
    <el-form ref="form" label-width="100px" :size="'mini'">
      <!--<el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label-width="0" >
            <el-input v-model="starName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button  :size="'mini'" type="success" @click="query" icon="el-icon-search">查询</el-button>
        </el-col>
      </el-row>-->

      <el-row :gutter="20">
        <el-col :span="24">
          <el-table class="list-main" height="250px" :data="list" border size="mini" :highlight-current-row="true" @selection-change="handleSelectionChange">
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
      <el-button type="primary" icon="el-icon-printer" @click="downPdf" >打印</el-button>
    </div>
  </div>
</template>

<script>
  import {addMovier,getShareList} from "@/api/extension/index";
  import html2canvas from 'html2canvas';
  import jspdf from 'jspdf';
  import QRCode from 'qrcodejs2'
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
        imageUrl: this.$store.state.user.url + '/movie/uploadFiles/image/',
        keyWords: [],
        list: [],
        multipleSelection: [],
        columns1: [
          {text: "二维码号", name: "memberCdkeyShare"},
          {text: "生成时间", name: "createDatetime"},
          {text: "包含兑换码数量", name: "allCount"},
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
      handleSelectionChange(val) {
        let that = this
        this.multipleSelection = val;
        this.$nextTick(() => {
        this.multipleSelection.forEach((item,index)=>{
          that.creatQrCode('qrCode'+index,item.memberCdkeyShare)
        })
        })
      },
      downPdf() {
        window.scrollTo(0, 0) //注意这里必须设置为顶部不然会出现图片不全
        let that = this;
        html2canvas(document.querySelector('#all1'), {//对应的dom元素id
          allowTaint: true
        }).then(function (canvas) {
          var contentWidth = canvas.width;
          var contentHeight = canvas.height;
          //一页pdf显示html页面生成的canvas高度;
          var pageHeight = contentWidth /841.89  * 592.28;
          //未生成pdf的html页面高度
          var leftHeight = contentHeight;
          //页面偏移
          var position = 0;
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = 841.89;
          var imgHeight = 841.89/contentWidth * contentHeight;
          var pageData = canvas.toDataURL();
          var pdf = new jspdf('l', 'pt', 'a4');
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
          }else {
            while(leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight;
              position -= 592.28;
              //避免添加空白页
              if(leftHeight > 0) {
                pdf.addPage();
              }
            }
          }
          pdf.save('团体票.pdf');
        })
      },
      // 查询条件过滤
      qFilter() {
        let obj = {}
        this.createDatetime != null && this.createDatetime != '' ? obj.createDatetime = this.createDatetime : null
        return obj
      },
      //查询
      query(){
        getShareList(this.qFilter()).then(res => {
          if (res.flag) {
            this.list = res.data
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
  .pdfImg{
    image-rendering: -moz-crisp-edges;         /* Firefox */
    image-rendering:   -o-crisp-edges;         /* Opera */
    image-rendering: -webkit-optimize-contrast;/* Webkit (non-standard naming) */
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;  /* IE (non-standard property) */
  }
  .printClass{
    position: fixed;
    z-index: 99;
    top: -99999999999999px;
    margin-right: 0 !important;
    margin-left: 0 !important;
    heihgt: 21cm;
    width: 29.7cm;
    /*position: fixed;
    z-index: 99;
    left: 10%;*/


  }
  .scanImg{
    position: absolute;
    right:0.4cm;
    bottom: 0.3cm;
    z-index: 101;
    display: inline-block;

  }
  .scanImg img{
    width: 2.5cm; height: 2.5cm;
    background-color: #fff;
    padding: 6px;
    box-sizing: border-box;
  }
  .rowClass{
    display: flex;
    flex-wrap: wrap;
  }
  .rowClass:first-child{
  }

  .pdfClass{
    margin: 5px;
    position: relative;

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
