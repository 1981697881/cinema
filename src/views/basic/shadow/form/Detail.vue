<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'电影名'" prop="deptCode">
            <el-input v-model="form.deptCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'电影时长'" prop="deptName">
            <el-input-number v-model="form.deptName"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'上映地区'" prop="orgAttr">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormatT" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'上映时间'" prop="productionDate">
            <div class="block">
              <el-date-picker
                v-model="form.productionDate"
                type="datetime"
                style="width: auto"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'电影分类'" prop="orgAttr">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item  :label="'电影简介'" prop="productionDate">
            <el-input type="textarea" v-model="form.deptCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'电影海报'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :data="imgData"
              :limit="3"
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
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'电影剧照'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :data="imgData"
              :limit="10"
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
        <el-col :span="24" style="text-align: center">
          <el-form-item label="电影预告" prop="Video">
            <!-- action必选参数, 上传的地址 -->
            <el-upload class="avatar-uploader el-upload--text" accept="video/*" :action="fileUrl"
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
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'演职人员'" prop="orgAttr">
            <div style="margin-top: 20px;margin-bottom: 10px">
              <el-button @click="setRow">添加</el-button>
            </div>
            <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true"
                      @row-dblclick="dblclick">
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
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'关键字'" prop="orgAttr">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="演职人员"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="userform" :rules="rules2" ref="userform" label-width="80px" :size="'mini'">
        <el-row :span="20">
          <el-col :span="8">
            <el-form-item :label="'名称'" prop="takeBreaks">
              <el-input v-model="userform.takeBreaks" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'角色名称'" prop="orgAttr">
              <el-input v-model="userform.takeBreaks" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'职务'" prop="orgAttr">
              <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
                <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormatTT" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'个人照片'">
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
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {FrameAdd, FrameAlter} from "@/api/basic/index";
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
        dynamicTags: ['人性', '黑化', '叛逆'],
        inputVisible: false,
        inputValue: '',
        visible: null,
        list: [],
        columns: [
          {text: "名称", name: "startTime"},
          {text: "职务", name: "startTime"},
          {text: "角色名称", name: "takeBreaks"},
        ],
        fileUrl: '',
        imgData: {},
        images: [],
        hideUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        limitCount: 3,
        nowImg: [],
        form: {
          deptId: null,
          deptCode: null, // 名称
          deptName: null,
        },
        userform: {
          deptId: null,
          deptCode: null, // 名称
          deptName: null,
        },
        videoFlag: false,
        videoUploadPercent: 0,
        pArray: [],
        rules: {
          deptCode: [
            {required: true, message: '请输入编码', trigger: 'blur'}
          ],
          deptName: [
            {required: true, message: '请输入名稱', trigger: 'blur'}
          ],
        },
        rules2: {
          takeBreaks: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],
          endTime: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          startTime: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
        },
        levelFormat: [['剧情', '剧情'], ['科幻', '科幻'], ['恐怖', '恐怖'], ['动作', '动作']],
        levelFormatTT: [['导演', '导演'], ['演员', '演员']],
        levelFormatT: [['中国大陆', '中国大陆'], ['中国香港', '中国香港'], ['中国台湾', '中国台湾'], ['其他', '其他']]
      };
    },
    created() {

    },
    mounted() {
      if (this.listInfo) {
        this.form = this.listInfo
      }
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      confirm() {
        this.$refs['userform'].validate((valid) => {
          // 判断必填项
          if (valid) {
            this.visible = false
            this.setList(this.userform)
          } else {
            return false
          }
        })
      },
      setRow() {
        this.visible = true
      },
      dblclick(obj) {
        this.visible = true
        this.form2 = obj
        this.$emit('showDialog', obj)
      },
      beforeUploadVideo(file) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) == -1) {
          this.$message.error('请上传正确的视频格式');
          return false;
        }
        if (!isLt10M) {
          this.$message.error('上传视频大小不能超过10MB哦!');
          return false;
        }
      },

      uploadVideoProcess(event, file, fileList) {
        console.log(event.percent, file, fileList)
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
        this.images.push(res.data)
        this.$message({
          message: res.msg,
          type: "success"
        });
        console.log(this.images)
        this.$emit('uploadList')
      },
      //删除图片
      handleRemove(file, fileList) {
        let array = this.images;
        for (let i in array) {
          if (file.name == array[i]) {
            array.splice(i, 1);
          }

        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleChange(file, fileList) {
        this.hideUpload = fileList.length >= this.limitCount;
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            //修改
            /* if (typeof (this.form.deptId) != undefined && this.form.deptId != null) {
               FrameAlter(this.form).then(res => {
                     this.$emit('hideDialog', false)
                     this.$emit('uploadList')
                 });
                 //保存
             }else{
                 FrameAdd(this.form).then(res => {
                     this.$emit('hideDialog', false)
                     this.$emit('uploadList')
                 });
             }*/
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
