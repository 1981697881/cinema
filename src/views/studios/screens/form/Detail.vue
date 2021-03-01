<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'所属影城'" prop="cinemaId">
            <el-select v-model="form.cinemaId" class="width-full" placeholder="请选择">
              <el-option :label="t.cinemaName" :value="t.cinemaId" v-for="(t,i) in studiosList" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'影厅名称'" prop="hallName">
            <el-input v-model="form.hallName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'影厅负责人'" >
            <el-input v-model="form.hallPerson"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'影厅类别'" >
            <el-select v-model="form.hallType" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="20">
        <el-col :span="8">
          <el-form-item label="行">
            <el-input-number v-model="form.line" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="列">
            <el-input-number v-model="form.column" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="produce">生成</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="座位配置" class="seat" prop="seats">
            <el-checkbox-group v-model="form.seats">
              <template v-for="(t,i) in seat" >
                <div style="display: flex">
                  <el-checkbox v-for="(item,index) in t" :key="index" :label="item.name"></el-checkbox>
                </div>
              </template>
            </el-checkbox-group>
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
import { addHall } from "@/api/studios/index";
import { getLocationList } from "@/api/basic/index";
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        line:1,
        column:1,
        hallName: null, // 名称
        seats: [],
        hallPerson: null,
        hallType: null,
      },
      studiosList: [],
      levelFormat: [['2D', '2D'], ['3D', '3D']],
      pidS:[],
      pArray:[],
      seat: [],
      rules: {
        hallName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        cinemaId: [
          {required: true, message: '请选择', trigger: 'change'},
        ],
        seats: [
          { required: true, message: '请设置座位', trigger: 'change' }
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
    produce(){
      let array = []
      this.seat = []
      for(let i = 0;i <this.form.line;i++){
       let arr = []
        for(let j = 0;j <this.form.column;j++){
          let obj = {}
          obj.name = i+1+"-"+(j+1)
          obj.id = i+1+"-"+(j+1)
          arr.push(obj)
        }
        array.push(arr)
      }
      this.seat = array
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          console.log(this.form)
          addHall(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
        }else {
          return false;
        }
      })
    },
    fetchFormat() {
      getLocationList({
        pageNum: 1,
        pageSize: 1000
      }, {}).then(res => {
        this.studiosList = res.data.records;
      });
    },
  }
};
</script>

<style type="scss">
  .seat .el-form-item__content{
    height: 250px;
    overflow: auto;
  }
  .el-form-item__error{
    display: contents;
  }
</style>
