<template>
  <div>
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
      <el-row :gutter="20" id="all1" class="printClass">
        <div class="pdfClass">
        <img
          style="width: 14.5cm; height: 5.61cm"
          src="@/assets/img/_20210428205913.jpg"
          fit="fit"/>
          <img
            class="scanImg"
            style="width: 2cm; height: 2cm"
            src="@/assets/img/erweima.png"
            fit="fit" />
          </div><div class="pdfClass">
        <img
          style="width: 14.5cm; height: 5.61cm"
          src="@/assets/img/_20210428205913.jpg"
          fit="fit"/>
          <img
            class="scanImg"
            style="width: 2cm; height: 2cm"
            src="@/assets/img/erweima.png"
            fit="fit" />
          </div> <div class="pdfClass">
        <img
          style="width: 14.5cm; height: 5.61cm"
          src="@/assets/img/_20210428205913.jpg"
          fit="fit"/>
          <img
            class="scanImg"
            style="width: 2cm; height: 2cm"
            src="@/assets/img/erweima.png"
            fit="fit" />
          </div><div class="pdfClass">
        <img
          style="width: 14.5cm; height: 5.61cm"
          src="@/assets/img/_20210428205913.jpg"
          fit="fit"/>
          <img
            class="scanImg"
            style="width: 2cm; height: 2cm"
            src="@/assets/img/erweima.png"
            fit="fit" />
          </div> <div class="pdfClass">
        <img
          style="width: 14.5cm; height: 5.61cm"
          src="@/assets/img/_20210428205913.jpg"
          fit="fit"/>
          <img
            class="scanImg"
            style="width: 2cm; height: 2cm"
            src="@/assets/img/erweima.png"
            fit="fit" />
          </div><div class="pdfClass">
        <img
          style="width: 14.5cm; height: 5.61cm"
          src="@/assets/img/_20210428205913.jpg"
          fit="fit"/>
          <img
            class="scanImg"
            style="width: 2cm; height: 2cm"
            src="@/assets/img/erweima.png"
            fit="fit" />
          </div>

      </el-row>
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
          var pageHeight = contentWidth;
          //未生成pdf的html页面高度
          var leftHeight = contentHeight;
          //pdf页面偏移
          var position = 0;
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = 585.28;
          var imgHeight = 841.89;

          var pageData = canvas.toDataURL('image/jpeg', 1.0);
          var pdf = new jspdf('', 'pt', 'a4');
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 5, 10, imgWidth, imgHeight);
          } else {
            while (leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 5, position, imgWidth, imgHeight)
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if (leftHeight > 0) {
                pdf.addPage();
              }
            }
          }
          pdf.save('1111.pdf');
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
  .printClass{
    margin-right: 0 !important;
    margin-left: 0 !important;
    heihgt: 21cm;
    width: 29.7cm;
    margin-top: 7cm;
    display: flex;
    flex-wrap: wrap;
    /*position: fixed;
    z-index: 99;
    left: 10%;*/
    transform:rotate(90deg);
    -ms-transform:rotate(90deg); 	/* IE 9 */
    -moz-transform:rotate(90deg); 	/* Firefox */
    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
    -o-transform:rotate(90deg); 	/* Opera */

  }
  .scanImg{
    position: absolute;
    right:0.3cm;
    bottom: 0.3cm;
    z-index: 101;
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
