<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @settlement="settlement" @showDialog="handlerDialog" @uploadList="upload" @queryBtn="query"/>
      </div>
      <list ref="list"  @uploadList="upload" />
    </div>
    <el-drawer
      title="购物车"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-table height="calc(100vh - 250px)" :data=productList>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <img v-bind:src="scope.row.img" height="80px;"/>
            </template>
          </el-table-column>
          <el-table-column label="信息">
            <template slot-scope="scope">
              <h3>{{scope.row.name}}</h3>
              <h4>{{scope.row.price}}</h4>
              <el-input-number style="width: 100%" v-model="scope.row.num"  :min="1" :max="scope.row.stock" label="描述文字"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete" circle @click.native="deleteList(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot demo-drawer__footer text-center">
        <el-button type="danger" round @click="cancelForm">清空</el-button>
        <el-button type="primary" round @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '结算 ￥'+countPrice+' 元' }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import { Info } from "./form";

export default {
  components: {
    TabsBar,
    List,
    Info
  },
  data() {
    return {
      total:0,
      productList:[],
      visible: null,
      listInfo: null,
      dialog: false,
      loading: false,
      timer: null,
    };
  },
  computed: {
    countPrice: function () {
      let total = 0;
      this.productList.forEach(p=>{
        total += p.price * p.num
      })
      return total
    },
  },
  created(){
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    deleteList(row){
      this.$confirm('是否删除（' + row.name + '）?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.productList.splice(row,1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    settlement(){
        this.dialog = true
    },
    handleChange(){
      console.log(this.productList)
      this.totalPrice()
    },
    totalPrice(){
      let total = 0;
      this.productList.forEach(p=>{
        total += p.price * p.num
      })
      this.total = total
    },
    //关闭表单事件
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch(_ => {})
    },
    cancelForm() {
      this.$confirm('是否清空购物车?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.productList = []
        this.loading = false
        this.dialog = false
        clearTimeout(this.timer)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消清空'
        });
      });
    },
    delivery(obj) {
      if(obj) {
        this.$refs.list.Delivery(obj)
      }
    },
    hideWindow(val) {
      this.visible = val
    },
    handlerDialog(obj) {
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        /*this.$confirm('已添加，是否打开购物车结算？')
          .then(_ => {
            this.dialog = true
          })
          .catch(_ => {})*/
        let productList = this.productList
        for(let item of info){
          let number = 0
          productList.some((product,index) =>{
            if(item.id==product.id){
              if(product.num >= item.stock){
                this.$message({
                  message: product.name+'库存不足',
                  type: "warning"
                })
                number++
                return true
              }else{
                product.num = product.num + 1
                number++
                return true
              }
            }
          })
           if(number ==0){
             item.num = 1
             productList.push(item)
           }
        }
      }
    },
    // 查询
    query(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
  .foot{
    padding: 20px;
    position: relative;
    width: 100%;
  }
</style>
