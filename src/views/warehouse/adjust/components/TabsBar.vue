<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'60px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              style="width: auto"
              align="right"
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
        <el-col :span="3">
          <el-form-item :label="'旧料号'">
            <el-input v-model="search.keyword" placeholder="旧料号"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'料号'">
            <el-input v-model="search.goodCode" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'批号'">
            <el-input v-model="search.lotNo" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'仓库'" prop="plaIdS">
            <el-select v-model="parent"  placeholder="请选择" @change="selectWorn">
              <el-option :label="t.positionName" :value="t.piId" v-for="(t,i) in plaArray" :key="i">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'库位号'">
            <el-input v-model="search.positionCode" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'操作人'">
            <el-input v-model="search.username" />
          </el-form-item>
        </el-col>
        <el-button-group style="float:right">
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
        <!--  <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click.native="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getWarehouseList } from '@/api/basic/index'
import { exportAdjust } from '@/api/warehouse/index'
import { getByUserAndPrId } from '@/api/system/index'
export default {
  components: {},
  computed: {
    ...mapGetters(['node','clickData','selections'])
  },
  data() {
    return {
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
      parent: null,
      plaArray: [],
      btnList: [],
      search: {
        keyword: null,
        goodCode: null,
        positionCode: null,
        username: null,
        lotNo: null,
        type: null
      }
    };
  },
  mounted() {
    this.fetchWare(-1)
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });
  },
  methods: {
    onFun(method){
      this[method]()
    },
    // 关键字查询
    query(){
      this.$emit('queryBtn', this.qFilter())
    },
    // 切换仓库
    selectWorn(val) {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.search.keyword = ''
      this.search.goodCode = ''
      this.search.positionCode = ''
      this.search.username = ''
      this.search.lotNo = ''
      this.value = ''
      this.parent = null
      this.$emit('uploadList')
    },
    fetchWare(val) {
      getWarehouseList(val).then(res => {
        if(res.flag) {
          this.plaArray = res.data
        }
      })
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null || this.search.keyword != undefined ? obj.oldCode = this.search.keyword : null
      this.search.positionCode != null || this.search.positionCode != undefined ? obj.positionCode = this.search.positionCode : null
      this.search.lotNo != null || this.search.lotNo != undefined ? obj.lotNo = this.search.lotNo : null
      this.search.username != null || this.search.username != undefined ? obj.username = this.search.username : null
      this.search.goodCode != null || this.search.goodCode != undefined ? obj.goodCode = this.search.goodCode : null
      this.value != null || this.value != undefined ? obj.endDate = this.value[1] : null
      this.parent != null && this.parent != undefined ? obj.grandpaPiId = this.parent : null
      this.value != null || this.value != undefined ? obj.startDate = this.value[0] : null
      return obj
    },
    // 下载文件
    download(res) {
      if (!res.data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([res.data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', res.headers['content-disposition'].split('filename=')[1])
      document.body.appendChild(link)
      link.click()
    },
    exportData() {
      exportAdjust(this.qFilter()).then(res => {
        this.download(res)
      })
    },
    handleAlter() {
      if (this.clickData.gid) {
        this.$emit('showDialog',{
          gid: this.clickData.gid,
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
  }
};
</script>

<style>
</style>
