<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'机台名称'" prop="playName">
            <el-input v-model="form.playName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'封面照片'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :limit="1"
              name="imgS"
              :on-success="uploadPosterSuccess"
              :on-error="uploadError"
              :class="{hide:hidePicture}"
              :on-preview="handlePictureCardPreview"
              :on-change="handlePictureChange"
              :file-list="pictureList"
              :before-upload="beforeUploadImage"
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
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'机台海报'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :limit="1"
              name="imgS"
              :on-success="uploadStillSuccess"
              :on-error="uploadError"
              :class="{hide:hideStillUpload}"
              :on-preview="handlePictureCardPreview"
              :on-change="handleStillChange"
              :file-list="stillList"
              :before-upload="beforeUploadImage"
              :on-remove="handleRemovet">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'电影剧照'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :limit="1"
              name="imgS"
              :on-success="uploadStillSuccess"
              :on-error="uploadError"
              :class="{hide:hideStillUpload}"
              :on-preview="handlePictureCardPreview"
              :on-change="handleStillChange"
              :file-list="stillList"
              :before-upload="beforeUploadImage"
              :on-remove="handleRemovet">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>-->
      <!--<el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item label="电影预告" prop="Video">
            &lt;!&ndash; action必选参数, 上传的地址 &ndash;&gt;
            <el-upload class="avatar-uploader el-upload&#45;&#45;text" accept="video/*" :headers="headers" :action="fileUrl"
                       :show-file-list="false" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo"
                       :on-progress="uploadVideoProcess">
              <video v-if="form.Video !='' && videoFlag == false" :src="form.Video" class="avatar" controls="controls">
                您的浏览器不支持视频播放
              </video>
              <i v-else-if="form.Video =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
              <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent"
                           style="margin-top:30px;"></el-progress>
            </el-upload>
            <P class="text">请保证视频格式正确，且不超过10M</P>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row :gutter="20">
        <el-col :span="24">
          <quill-editor v-model="form.playTxt"  :options="quillOption" style="height: 200px"></quill-editor>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 100px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {addPlay} from "@/api/basic/index";
  import { quillEditor } from 'vue-quill-editor'
  import quillConfig from '@/quill-config.js'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {
    getToken
  } from '@/utils/auth'

  export default {
    components: { quillEditor },
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
        quillOption: quillConfig,
        fileUrl: '',
        images: [],
        imagesPoster: [],
        hidePicture: false,
        hideStillUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        pictureList: [],
        stillList: [],
        limitPicture: 1,
        limitStill: 3,
        nowImg: [],
        form: {
          playName: null,
          playPhoto: null,
          playPosterphotoList: [],
          playTxt: null,
        },
        videoFlag: false,
        videoUploadPercent: 0,
        pArray: [],
        rules: {
          filmName: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
        },
      };
    },
    mounted() {
      this.fileUrl  = `${window.location.origin}/web/file/imgUpload`
      if (this.listInfo) {
        this.form = this.listInfo
        this.pictureList = []
        if(this.form.playPhoto != null && this.form.playPhoto.length>0){
          this.pictureList.push({
            url: this.$store.state.user.url+'/movie/uploadFiles/image/' + this.form.playPhoto
          })
          this.hidePicture = true
        }else{
          this.hidePicture = false
        }
        this.listInfo.playPosterphotoList = this.listInfo.playPosterphotoList.filter(function(n) { return n; });
        if (this.form.playPosterphotoList.length > 0) {
          //到图片数量大于3或等于3时添加按钮隐藏
          if (this.form.playPosterphotoList.length >= 3) {
            this.hideStillUpload = true;
          } else {
            this.hideStillUpload = false;
          }
          this.stillList = []
          for (let i in this.form.playPosterphotoList) {
            this.stillList.push({
              url: this.$store.state.user.url+'/movie/uploadFiles/image/' + this.form.playPosterphotoList[i]
            })
          }
        } else {
          this.stillList = [];
        }
      }
    },
    methods: {

      beforeUploadVideo(file) {
       /* if(this.form.filmId == null || this.form.filmId == ''){
          this.$message({
            message: '请先保存影讯信息，再上传视频',
            type: "warning"
          });
          return false
        }*/
        const isLt10M = file.size / 1024 / 1024 < 20;
        if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) == -1) {
          this.$message.error('请上传正确的视频格式');
          return false;
        }
        if (!isLt10M) {
          this.$message.error('上传视频大小不能超过20MB哦!');
          return false;
        }
      },

      uploadVideoProcess(event, file, fileList) {
        this.videoFlag = true
        this.videoUploadPercent = Math.floor(event.percent)
      },
      handleVideoSuccess(res, file) {                               //获取上传图片地址
        this.videoFlag = false;
        this.videoUploadPercent = 0;
        if (res.status == 200) {
          this.form.videoUploadId = res.data.uploadId;
          this.form.Video = res.data.uploadUrl;
        } else {
          this.$message.error('视频上传失败，请重新上传！');
        }
      },
      //上传失败事件
      uploadError(res) {
        this.$message({
          message: res.msg,
          type: "warning"
        });
        this.$emit('uploadList')
      },
      //封面上传成功
      uploadPosterSuccess(res, file, fileList) {
        file.name = res.data;
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.form.playPhoto=res.data
      },
      //海报上传成功
      uploadStillSuccess(res, file, fileList) {
        file.name = res.data;
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.form.playPosterphotoList.push(res.data)
      },
      //删除图片
      handleRemove(file, fileList) {
        let array = this.pictureList;
        let img =file.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1]
            array.forEach((item,index)=>{
              if (item.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1] == img) {
                array.splice(index, 1);
              }
            })
            this.$emit('uploadList')
        this.form.playPhoto= null
        this.hidePicture = false
      },
      handleRemovet(file, fileList) {
        let array = this.stillList;
        let img =file.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1]
        array.forEach((item,index)=>{
          if (item.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1] == img) {
            array.splice(index, 1);
          }
        })
        this.form.playPosterphotoList.forEach((item,index)=>{
          if(item == img){
            this.form.playPosterphotoList.splice(index, 1);
          }
        })
        this.$emit('uploadList')
        this.hideStillUpload = false
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeUploadImage(){

      },
      handlePictureChange(file, fileList) {
        this.hidePicture = fileList.length >= this.limitPicture;
      },
      handleStillChange(file, fileList) {
        this.hideStillUpload = fileList.length >= this.limitStill;
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            console.log(this.form)
            if(this.form.playPhoto){
              //修改
              let param = this.form
              addPlay(param).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            }else{
              this.$message({
                message: '请上传图片',
                type: "warning"
              });
            }
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
</style>
<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
