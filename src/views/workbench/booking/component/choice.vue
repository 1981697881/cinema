<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="90px">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'电影'" prop="filmId">
            <el-select v-model="form.filmId" clearable filterable class="width-full" placeholder="请选择">
              <el-option :label="t.filmName" :value="t.filmId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'时间'" prop="showDatetime">
            <el-date-picker
              v-model="form.showDatetime"
              align="right"
              type="date"
              style="width: 100% "
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'会员手机号'">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-dialog
        :visible.sync="visible"
        title="场次"
        v-if="visible"
        :width="'50%'"
        destroy-on-close
        append-to-body
      >
        <el-form :size="'mini'">
          <list
            class="list-main box-shadow"
            :columns="columns"
            :loading="loading"
            :list="list"
            index
            height="300px"
            @dblclick="dblclick"
          />
        </el-form>
      </el-dialog>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">查询</el-button>
    </div>
  </div>
</template>

<script>
  import { querySchedules } from "@/api/workbench/index";
  import { movieFormat } from "@/api/studios/index";
  import List from "@/components/List";
  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      }
    },
    components: {
      List
    },
    data() {
      return {
        form: {
          filmId: null,
          showDatetime: null,
        },
        loading: false,
        visible: null,
        list: [],
        columns: [
          {text: "影厅", name: "hallName"},
          {text: "场次", name: "showDatetime"},
          {text: "类型", name: "dimensional"},
        ],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 3600 * 1000 * 24;
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '后天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
              picker.$emit('pick', date);
            }
          }]
        },
        pidS:[],
        pArray:[],
        levelFormat: [['剧情', '剧情'], ['科幻', '科幻'], ['恐怖', '恐怖'], ['动作', '动作']],
        rules: {
          filmId: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          showDatetime: [
            {required: true, message: '请选择', trigger: 'change'},
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
      dblclick(obj) {
        obj.row.phone = this.form.phone
        this.$emit('uploadList',obj.row)
        this.$emit('hideDialog',false)
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            this.loading = true;
            querySchedules(this.form).then(res => {
              if(res.flag){
                this.loading = false;
                this.list = {records:res.data}
                this.visible = true
              }
            });
          }else {
            return false;
          }
        })
      },
      fetchFormat() {
        movieFormat({}).then(res => {
          if(res.flag){
            this.pArray = res.data
          }
        });
      },
    }
  };
</script>

<style>
</style>
