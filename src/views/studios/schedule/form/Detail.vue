<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'影城'" prop="orgAttr">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'影厅'" prop="orgAttr">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'影片'" prop="orgAttr">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'正常票价'" >
            <el-input-number v-model="form.tel"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'团体票价'" >
            <el-input-number v-model="form.description"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'上映时间'">
            <el-date-picker
              v-model="form.putTime"
              align="right"
              type="datetime"
              style="width: auto"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'下架时间'">
            <el-date-picker
              v-model="form.putTime"
              align="right"
              style="width: auto"
              type="datetime"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'场次预览'" >
            <el-table el-table :height="'calc(100vh/2)'"  :data="list" border size="mini" :highlight-current-row="true">
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:'150px'"
              >
                <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input size="mini" v-if="t.name == 'FBatchNO'" placeholder="请输入内容" v-model="sel[t.name]"></el-input>
                  <el-input-number size="mini" v-else-if="t.name == 'FPlanQty'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input-number>
                  <el-input-number size="mini" v-else-if="t.name == 'putNum'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input-number>
                  <div class="block"  v-else-if="t.name == 'FPlanCommitDate'">
                  <el-date-picker
                    @change="changeDate($event,sel)"
                    v-model="sel[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <div class="block"  v-else-if="t.name == 'FPlanFinishDate'">
                  <el-date-picker
                    v-model="sel[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <span v-else>{{sel[t.name]}}</span>
                </span>
                  <span v-else>{{scope.row[t.name]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                    {{scope.row.isSet?'确定':"修改"}}
                  </span>
                  <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" @click="deleteRow(scope.row,scope.$index,list)" style="cursor: pointer;">
                    删除
                  </span>
                  <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                    取消
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import { alterSupplier, addSupplier } from "@/api/basic/index";

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      list: '',
      sel: null, // 选中行
      columns: [
        { text: "场次", name: "FICMONo" },
        { text: "开场时间", name: "FOrderNo" },
        { text: "散场时间", name: "FEntryID" },
        { text: "正常票价", name: "FCardNo" },
        { text: "团体票价", name: "FKDNo" },
      ],
      levelFormat: [['2D', '2D'], ['3D', '3D']],
      form: {
        loPrId: null,
        loPrName: null, // 名称
        loPrCode: null,
        contact: null,
        addr: null,
        tel: null,
        description: null,
      },
      pidS:[],
      pArray:[],
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
    //修改
    pwdChange(row, index, cg) {
      //点击修改 判断是否已经保存所有操作
      for (let i of this.list) {
        if (i.isSet && (i.FOrderNo != row.FOrderNo || i.RowNumber != row.RowNumber)) {
          this.$message.warning("请先保存当前编辑项");
          return false;
        }
      }
      //是否是取消操作
      if (!cg) {
        if (!this.sel.FOrderNo) this.list.splice(index, 1);
        return row.isSet = !row.isSet;
      }
      //提交数据
      if (row.isSet) {
        //项目是模拟请求操作  自己修改下
        const sel = this.sel
        if((sel.FBatchNO == null || sel.FOrderNo == '') || (sel.FPlanQty == null || sel.FPlanQty == '')|| (sel.putNum == null || sel.putNum == '') || (sel.FPlanCommitDate == null || sel.FPlanCommitDate == '') || (sel.FPlanFinishDate == null || sel.FPlanFinishDate == '')){
          return this.$message({
            type: 'error',
            message: "请输入必填项!"
          });
        }else {
          let data = JSON.parse(JSON.stringify(this.sel));
          for (let k in data) row[k] = data[k]
          this.$message({
            type: 'success',
            message: "添加成功!"
          });
          //然后这边重新读取表格数据
          this.readMasterUser();
          row.isSet = false;
        }
      } else {
        this.sel = JSON.parse(JSON.stringify(row));
        row.isSet = true;
      }
    },
    //删除带确认区 单行删除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    //读取表格数据
    readMasterUser() {
      //根据实际情况，自己改下啊
      this.list.map(i => {
        i.isSet = false; //给后台返回数据添加`isSet`标识
        return i;
      });
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
        }else {
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
