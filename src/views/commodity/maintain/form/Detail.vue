<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="'商品类型'" prop="orgAttr">
                <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
                  <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'商品序列号'">
                <el-input v-model="form.tel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="'商品名称'">
                <el-input v-model="form.tel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'商品排序'">
                <el-input-number v-model="form.description"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="'商品价格'">
                <el-input-number v-model="form.description"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'商品库存'">
                <el-input-number v-model="form.description"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" style="text-align: center">
              <el-form-item :label="'商品主图'">
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
              <el-form-item :label="'商品列表图'">
                <el-upload
                  :action="fileUrl"
                  list-type="picture-card"
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
        </el-tab-pane>
        <el-tab-pane label="详细描述" name="second">
          <el-row :gutter="20">
            <el-col :span="24">
                <tinymce style="width: 99%" language='zh_CN' v-model="content" :height="500" />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="third">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="'热销'" prop="loPrName">
                <el-radio-group v-model="radio">
                  <el-radio :label="3">是</el-radio>
                  <el-radio :label="6">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row><el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="'是否新商品'" prop="loPrName">
                <el-radio-group v-model="radio">
                  <el-radio :label="3">是</el-radio>
                  <el-radio :label="6">否</el-radio>
                </el-radio-group>
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
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
  import {alterSupplier, addSupplier} from "@/api/basic/index";
  import Tinymce from "@/components/Tinymce";
  import {
    getToken
  } from '@/utils/auth'
  export default {
    components: { Tinymce },
    props: {
      listInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        dynamicTags: ['人性', '黑化', '叛逆'],
        inputVisible: false,
        inputValue: '',
        headers: {
          'authorization': getToken('cinerx'),
        },
        content: '',
        radio: '',
        fileUrl: '',
        imgData: {},
        images: [],
        hideUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        limitCount: 3,
        activeName: 'first',
        form: {
          loPrId: null,
          loPrName: null, // 名称
          loPrCode: null,
          contact: null,
          addr: null,
          tel: null,
          description: null,
        },
        pidS: [],
        pArray: [],
        levelFormat: [['剧情', '剧情'], ['科幻', '科幻'], ['恐怖', '恐怖'], ['动作', '动作']],
        rules: {
          loPrName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          loPrCode: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
        },
      };
    },
    mounted() {
      this.fetchFormat();
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
      handleClick(tab, event) {
        console.log(tab, event);
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            /* if (typeof (this.form.loPrId) != undefined && this.form.loPrId != null) {
               alterSupplier(this.form).then(res => {
                 this.$emit('hideDialog', false)
                 this.$emit('uploadList')
               });
             }else{
               addSupplier(this.form).then(res => {
                 this.$emit('hideDialog', false)
                 this.$emit('uploadList')
               });
             }*/
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
