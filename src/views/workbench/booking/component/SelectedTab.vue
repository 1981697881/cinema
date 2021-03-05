/*
  @author zenghao0219
  @description 用于座位图下发已选座位的展示
  @updateDate 最后更新时间为:2019-02-20
*/
<template>
  <div class='selected'>
    <div class="scroll" ref="scroll">
      <ul class="scroll-ul" ref="scrollUl">
        <li class="scroll-item" v-for="item in selectedSeat" :key="'select'+item.id" @click="cancelSelect(item)">
          {{item.row}}排{{item.col}}座 {{item.price}}元
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import Bscroll from 'better-scroll'
export default {
// import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    propSelectedSeat: Array
  },
  data () {
    // 这里存放数据
    return {
      selectedSeat: this.propSelectedSeat
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    propSelectedSeat: function (value) {
      let width = this.propSelectedSeat.length * 2.4 + 1.2
      this.$refs.scrollUl.style.width = width + 'rem'
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.scroll, {
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  },
  // 方法集合
  methods: {
    cancelSelect: function (item) {
      this.$emit('cancelSelect', item.orgIndex)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped='scoped'>
//@import url(); 引入公共css类
.selected
  position relative
  background #ffffff
  width 100%
  overflow hidden
  .scroll
    position absolute
    height 81%
    overflow-y scroll
    width 100%
    top 0
    left 0
    z-index 11
    .scroll-ul
      width 100% !important
      height 100%
      display flex
      flex-wrap: wrap
      flex-direction row
      justify-content center
      align-items center
      list-style none
      margin 0
      padding 0
      margin-top 20px
      .scroll-item
        display inline-block
        height 65px
        line-height 65px
        margin  10px
        text-align center
        font-size 23px
        width 160px
        color #888888
        border 2px solid #888888
        border-radius 10px
</style>
