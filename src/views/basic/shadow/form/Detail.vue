<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'电影名'" prop="filmName">
            <el-input v-model="form.filmName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'电影时长'" prop="filmLong">
            <el-input-number v-model="form.filmLong" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'上映地区'" prop="showArea">
            <el-select v-model="form.showArea" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormatT" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'上映时间'" prop="filmDate">
            <div class="block">
              <el-date-picker
                v-model="form.filmDate"
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
          <el-form-item :label="'电影分类'" prop="filmSortid">
            <el-select v-model="form.filmSortid" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'电影简介'" prop="filmIntro">
            <el-input type="textarea" v-model="form.filmIntro"></el-input>
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
              :on-success="uploadPosterSuccess"
              :on-error="uploadError"
              :class="{hide:hideUpload}"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange"
              :file-list="fileList"
              ref="upload"
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
          <el-form-item :label="'电影剧照'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :data="imgData"
              :limit="10"
              name="imgS"
              :on-success="uploadStillSuccess"
              :on-error="uploadError"
              :class="{hide:hideUpload}"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange"
              :file-list="fileList"
              ref="upload"
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
          <el-form-item label="电影预告" prop="Video">
            <!-- action必选参数, 上传的地址 -->
            <el-upload class="avatar-uploader el-upload--text" accept="video/*" :headers="headers" :action="fileUrl"
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
                v-for="(t,i) in columns1"
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
          <el-form-item :label="'关键字'">
            <el-tag
              :key="tag"
              v-for="tag in form.keyWords"
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
      <el-form :model="postform" :rules="rules2" ref="postform" label-width="80px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label-width="0">
              <el-input v-model="starName" placeholder="名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button  :size="'mini'" type="success" @click="query" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="24">
            <el-table class="list-main" height="200px" :data="list2" border size="mini" :highlight-current-row="true"
                      @row-dblclick="dblclick" @row-click="listClick" >
              <el-table-column
                v-for="(t,i) in columns2"
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
        <el-row :span="20" style="padding-top: 15px">
          <el-col :span="12">
            <el-form-item :label="'角色名称'" prop="roleName">
              <el-input v-model="postform.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'职务'" prop="orgAttr">
              <el-select v-model="postform.roleType" class="width-full" placeholder="请选择">
                <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormatTT" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-dialog
        :visible.sync="visible2"
        title="个人信息"
        v-if="visible2"
        :width="'50%'"
        destroy-on-close
        append-to-body
      >
        <el-form :model="userform" :rules="rules3" ref="userform" label-width="80px" :size="'mini'">
          <el-row :span="24">
            <el-col :span="12">
              <el-form-item :label="'名称'" prop="starName">
                <el-input v-model="userform.starName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'性别'" prop="starSex">
                <el-select v-model="userform.starSex" class="width-full" placeholder="请选择">
                  <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormatTTT" :key="i"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="24">
              <el-form-item :label="'个人简介'" prop="starProfile">
                <el-input type="textarea" v-model="userform.starProfile"></el-input>
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
                :on-success="uploadUserSuccess"
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
          <el-button type="primary" @click="saveStart('userform')">保存</el-button>
        </div>
      </el-dialog>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="success" @click="confirm">确认</el-button>
        <el-button type="primary" @click="create">新建</el-button>
        <el-button type="danger" @click="deleteList">删除</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {addMovie,addStar,deleteStar,getStarList} from "@/api/basic/index";
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
        starName: null,
        keyWords: [],
        inputVisible: false,
        inputValue: '',
        visible: null,
        visible2: null,
        list: [],
        list2: [],
        columns1: [
          {text: "名称", name: "starName"},
          {text: "职务", name: "roleType"},
          {text: "角色名称", name: "roleName"},
        ],
        columns2: [
          {text: "名称", name: "starName"},
          {text: "性别", name: "starSex"},
          {text: "个人简介", name: "starProfile"},
        ],
        fileUrl: '',
        imgData: {},
        images: [],
        imagesPoster: [],
        hideUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        limitCount: 3,
        nowImg: [],
        form: {
          filmName: null,
          filmIntro: null,
          filmDate: null,
          filmLong: 100,
          filmPhoto: [],
          still: [],
          herald: null,
          filmSortid: null,
          showArea: null,
          keyWords: [],
        },
        checkData: null,
        postform: {
          roleName: null, // 名称
          roleType: null,
        },
        userform: {
          starSex: null,
          starName: null, // 名称
          starProfile: null,
          starPhotoUrl: null,
        },
        videoFlag: false,
        videoUploadPercent: 0,
        pArray: [],
        rules: {
          filmName: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
          filmIntro: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
          filmLong: [
            {required: true, message: '请输入', trigger: 'change'},
            {type: 'number', message: '只能输入数字', trigger: 'blur'},
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
        }, rules3: {
          starName: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],starProfile: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],
          starSex: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
        },
        levelFormat: [['剧情', '剧情'], ['科幻', '科幻'], ['恐怖', '恐怖'], ['动作', '动作'], ['爱情', '爱情']],
        levelFormatTT: [['导演', '导演'], ['演员', '演员']],
        levelFormatTTT: [['女', '女'], ['男', '男'], ['未知', '未知']],
        levelFormatT: [['中国大陆', '中国大陆'], ['中国香港', '中国香港'], ['中国台湾', '中国台湾'], ['其他', '其他']]
      };
    },
    mounted() {
      this.fileUrl  = `${window.location.origin}/web/file/imgUpload`
      if (this.listInfo) {
        this.form = this.listInfo
      }
    },
    methods: {
      listClick(obj){
        console.log(obj)
        this.checkData = obj
      },
      deleteList(){
        deleteStar({starId: [this.checkData.starId]}).then(res => {
          if (res.flag) {
            this.query()
          }
        })
      },
      // 查询条件过滤
      qFilter() {
        let obj = {}
        this.starName != null && this.starName != '' ? obj.starName = this.starName : null
        return obj
      },
      query(){
        getStarList(this.qFilter()).then(res => {
          if (res.flag) {
            this.list2 = res.data
          }
        })
      },
      create(){
        this.visible2 = true
      },
      handleClose(tag) {
        this.form.keyWords.splice(this.form.keyWords.indexOf(tag), 1);
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
          this.form.keyWords.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      confirm() {
        let me = this
        this.$refs['postform'].validate((valid) => {
          // 判断必填项
          if (valid) {
            if(this.checkData != null){
              let list = me.list
              let number = 0
              for(let val of list){
                if(me.checkData.starId == val.starId && me.postform.roleType == val.roleType){
                  number ++
                }
              }
              if(number == 0){
                me.visible = false
                me.list.push({
                  roleName: me.postform.roleName,
                  starName: me.checkData.starName,
                  roleType: me.postform.roleType,
                  starId: me.checkData.starId,
                })
                me.checkData = null
              }else{
                this.$message.error('影讯内，不允许同职员同职务存在');
              }
            }else{
              this.$message.error('无选中人员');
            }
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
        this.postform = obj
      },
      beforeUploadVideo(file) {
        if(this.form.filmId == null || this.form.filmId == ''){
          this.$message({
            message: '请先保存影讯信息，再上传视频',
            type: "warning"
          });
          return false
        }
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
        console.log(event.percent, file, fileList)
        this.videoFlag = true
        this.videoUploadPercent = Math.floor(event.percent)
      },
      handleVideoSuccess(res, file) {                               //获取上传图片地址
        console.log(res.data)
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
      //海报上传成功
      uploadPosterSuccess(res, file, fileList) {
        file.name = res.data;
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.form.filmPhoto.push(res.data)
      }, //剧照上传成功
      uploadStillSuccess(res, file, fileList) {
        file.name = res.data;
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.form.still.push(res.data)
      },
      uploadUserSuccess(res, file, fileList) {
        file.name = res.data;
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.userform.starPhotoUrl = res.data
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
      beforeUploadImage(){
        if(this.form.filmId == null || this.form.filmId == ''){
          this.$message({
            message: '请先保存影讯信息，再上传图片',
            type: "warning"
          });
          return false
        }
      },
      handleChange(file, fileList) {
        if(this.form.filmId != null && this.form.filmId != ''){
          this.hideUpload = fileList.length >= this.limitCount;
        }else{
          this.$message({
            message: '请先保存影讯信息，再上传图片',
            type: "warning"
          });
          return false
        }
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            //修改
            addMovie(this.form).then(res => {
             /* this.$emit('hideDialog', false)*/
              this.$emit('uploadList')
            });
          } else {
            return false;
          }
        })

      },
      saveStart(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            //修改
            addStar(this.userform).then(res => {
              if(res.flag){
                this.visible2 = false
                this.query()
              }
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
