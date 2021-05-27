<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'广告位置'" prop="type">
            <el-select v-model="form.type" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'广告名称'" prop="posterName">
            <el-input v-model="form.posterName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'广告内容'" >
            <el-input type="textarea" v-model="form.posterContent"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'广告图片'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :data="imgData"
              :limit="1"
              name="imgS"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :class="{hide:hideUpload}"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange"
              :file-list="fileList"
              ref="upload"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'广告链接'" >
            <el-input v-model="form.posterUrl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'日期限定'">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              align="right"
              @change="dateChange"
              style="width: auto"
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
    </el-form>
    <div slot="footer" style="text-align:center;">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import { addPoster } from "@/api/extension/index";
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
      form: {
        posterStartdatetime: null,
        posterEnddatetime: null,
        type: null,
        posterName: null,
        posterType: null,
        posterUrl: null,
        posterPhoto: null,
        posterContent: null,
      },
      fileUrl: '',
      imgData: {},
      images: [],
      hideUpload: false,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      limitCount: 1,
      value: '',
      pickerOptions: {
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
      pidS:[],
      pArray:[],
      levelFormat: [['1', '主页轮播'],['2', '主页推荐']],
      rules: {
        type: [
          {required: true, message: '请选择', trigger: 'change'},
        ], loPrName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        loPrCode: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
      },
    };
  },
  mounted() {
    this.fileUrl  = `${window.location.origin}/web/file/imgUpload`
    if (this.listInfo) {
      this.form = this.listInfo
      if(this.listInfo.posterPhoto != null){
        this.fileList.push({
          url: this.$store.state.user.url+'/movie/uploadFiles/image/' + this.listInfo.posterPhoto
        })
        this.value =[this.listInfo.posterStartdatetime,this.listInfo.posterEnddatetime]
        this.hideUpload = true
      }else{
        this.hideUpload = false
      }
    }
  },
  methods: {
    dateChange(val){
      this.form.posterStartdatetime = val[0]
      this.form.posterEnddatetime = val[1]
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addPoster(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
        }else {
          return false;
        }
      })
    },
    //上传失败事件
    uploadError(res) {
      console.log(res)
      this.$message({
        message: res.msg,
        type: "warning"
      });
      this.$emit('uploadList')
    },
    //上传成功事件
    uploadSuccess(res, file, fileList) {
      file.name = res.data;
      this.form.posterPhoto = res.data
      this.$message({
        message: res.msg,
        type: "success"
      });
      this.$emit('uploadList')
    },
    //删除图片
    handleRemove(file, fileList) {
      let array = this.fileList;
      let img =file.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1]
      array.forEach((item,index)=>{
        if (item.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1] == img) {
          array.splice(index, 1);
        }
      })
      this.$emit('uploadList')
      this.form.posterPhoto= null
      this.hideUpload = false
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
  }
};
</script>

<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
