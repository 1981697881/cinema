<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'影城'" prop="cinemaId">
            <el-select v-model="form.cinemaId" class="width-full" @change="selectChange" placeholder="请选择">
              <el-option :label="t.cinemaName" :value="t.cinemaId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'影厅'" prop="hallId">
            <el-select v-model="form.hallId" class="width-full" placeholder="请选择" :disabled="disPl">
              <el-option :label="t.hallName" :value="t.hallId" v-for="(t,i) in rArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'影片'" prop="filmId">
            <el-select v-model="form.filmId" class="width-full" placeholder="请选择">
              <el-option :label="t.filmName" :value="t.filmId" v-for="(t,i) in nArray" :key="i"></el-option>
            </el-select>
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
          <el-form-item :label="'清洁时长'" prop="restLong">
            <el-input-number v-model="form.restLong" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'整点'" prop="isZ">
            <el-input-number v-model="form.isZ" :min="-1" placeholder="默认-1，-1为不进行整点计算"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'正常票价'" prop="money">
            <el-input-number v-model="form.money" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'团体票价'" prop="memberMoney">
            <el-input-number v-model="form.memberMoney" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form-item :label="'放映日期'" prop="value2">
            <el-date-picker
              v-model="form.value2"
              type="daterange"
              range-separator="至"
              format="yyyy-MM-dd"
              @change="changeDate"
              style="width: auto"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form-item :label="'场次时间'" prop="value">
            <el-time-picker
              is-range
              v-model="form.value"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="changeTime"
              format="HH:mm"
              style="width: auto"
              value-format="HH:mm"
              placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <el-button type="primary" @click="produce('form')">生成</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'场次预览'">
            <el-table :key="Math.random()" :height="'calc(100vh/2)'" :data="list" border size="mini" :highlight-current-row="true">
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
                    <el-input-number size="mini" v-if="t.name == 'money'" placeholder="请输入内容"
                                     v-model="sel[t.name]">
                    </el-input-number>
                    <el-input-number size="mini" v-else-if="t.name == 'memberMoney'" placeholder="请输入内容"
                                     v-model="sel[t.name]">
                    </el-input-number>
                   <!-- <div class="block" v-else-if="t.name == 'FPlanCommitDate'">
                    <el-date-picker
                      @change="changeListDate($event,sel)"
                      v-model="sel[t.name]"
                      type="date"
                      size="mini"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                    </div>-->
                    <span v-else>{{sel[t.name]}}</span>
                  </span>
                  <span v-else>{{scope.row[t.name]}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="150">
                <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;"
                        @click="pwdChange(scope.row,scope.$index,true)">
                    {{scope.row.isSet?'确定':"修改"}}
                  </span>
                  <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" @click="deleteRow(scope.$index,list)" style="cursor: pointer;">
                    删除
                  </span>
                  <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;"
                        @click="pwdChange(scope.row,scope.$index,false)">
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
  import {createMDetailCal, addMarshallin, hallFormat,movieFormat} from "@/api/studios/index";
  import {locationFormat} from "@/api/basic/index";

  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        list: [],
        sel: null, // 选中行
        columns: [
          {text: "场次", name: "sessionsDate"},
          {text: "开场时间", name: "sessionsStarttime"},
          {text: "散场时间", name: "sessionsEndtime"},
          {text: "正常票价", name: "money"},
          {text: "优惠票价", name: "memberMoney"},
        ],
        disPl: true,
        levelFormat: [[0, '测试1'], [1, '测试2']],
        form: {
          filmLong: 1,
          cinemaId: null,
          hallId: null,
          filmId: null,
          restLong: 0,
          isZ: -1,
          value: '',
          value2: '',
          startDate: null,
          endDate: null,
          startTime: null,
          endTime: null,
          money: 1,
          memberMoney: 1,
        },
        pidS: [],
        pArray: [],
        rArray: [],
        nArray: [],
        rules: {
          cinemaId: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          hallId: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          filmId: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          startDate: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ], endDate: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ], loPrCode: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          filmLong: [
            {required: true, message: '请输入', trigger: 'change'},
            {type: 'number', message: '只能输入数字', trigger: 'blur'},
          ], isZ: [
            {required: true, message: '请输入', trigger: 'change'},
            {type: 'number', message: '只能输入数字', trigger: 'blur'},
          ], restLong: [
            {required: true, message: '请输入', trigger: 'change'},
            {type: 'number', message: '只能输入数字', trigger: 'blur'},
          ], money: [
            {required: true, message: '请输入', trigger: 'change'},
            {type: 'number', message: '只能输入数字', trigger: 'blur'},
          ], memberMoney: [
            {required: true, message: '请输入', trigger: 'change'},
            {type: 'number', message: '只能输入数字', trigger: 'blur'},
          ],
          value: [
            {type: 'array', required: true, message: '请选择', trigger: 'change'}
          ], value2: [
            {type: 'array', required: true, message: '请选择', trigger: 'change'}
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
      changeListDate(val, row) {
        this.$set(row, 'FPlanFinishDate', val)
      },
      fetchLine(val) {
        hallFormat(val).then(res => {
          if (res.flag) {
            this.rArray = res.data
          }
        })
      },
      // 切换类别
      selectChange(val) {
        this.disPl = false
        this.form.hallId = null
        this.rArray = []
        this.fetchLine({cinemaId: val})
      },
      changeDate(val) {
        this.form.startDate = val[0]
        this.form.endDate = val[1]
      }, changeTime(val) {
        this.form.startTime = val[0]
        this.form.endTime = val[1]
      },
      //修改 sessionsId money memberMoney
      //修改
      pwdChange(row, index, cg) {
        if(this.sel == null){
          this.sel = row
        }
        //点击修改 判断是否已经保存所有操作
        for (let i of this.list) {
          if (i.isSet && i.sessionsId != row.sessionsId) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.sel.sessionsId) this.list.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        //提交数据
        if (row.isSet) {
          //项目是模拟请求操作  自己修改下
          const sel = this.sel
          if((sel.money == null || sel.money == '') || (sel.memberMoney == null || sel.memberMoney == '')){
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
            this.$set(row,'isSet',false)
            //然后这边重新读取表格数据
            this.readMasterUser();
          }
        } else {
          this.$set(row,'isSet',true)
          this.sel = JSON.parse(JSON.stringify(row));
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
      produce(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            createMDetailCal(this.form).then(res => {
              this.list = res.data
            });
          } else {
            return false;
          }
        })
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            if (this.list.length > 0) {
              let obj = {}
              obj.marshallinDetails = this.list
              obj.hallId = this.form.hallId
              obj.money = this.form.money
              obj.memberMoney = this.form.memberMoney
              obj.cinemaId = this.form.cinemaId
              obj.startDate = this.form.startDate
              obj.endDate = this.form.endDate
              obj.filmId = this.form.filmId
              addMarshallin(obj).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            } else {
              return this.$message({
                type: 'error',
                message: "请生成场次数据!"
              });
            }
          } else {
            return false;
          }
        })
      },
      fetchFormat() {
        locationFormat().then(res => {
          if (res.flag) {
            this.pArray = res.data
          }
        })
        movieFormat().then(res => {
          if (res.flag) {
            this.nArray = res.data
          }
        })
      },
    }
  };
</script>

<style>
</style>
