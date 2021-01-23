<template>
  <div>
    <div class="plan-detail">
      <div class="seat-detail">
        <slot></slot>
      </div>
      <div class="plan-detail-item">{{titleText}}</div>
      <div class="plan-detail-item">{{propShowDate}}</div>
      <div class="plan-detail-item">{{propShowTime}}</div>
      <div class="plan-detail-item">{{propHallName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propHallName: String,
    propShowDate: String,
    titleText: String,
    propShowTime: String
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {

    }
  },
  // 方法集合
  methods: {

  },
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped='scoped'>
//@import url(); 引入公共css类
.plan-detail
  border-bottom  1px solid 	#CDBE70
  display flex
  flex-direction row
  justify-content space-between
  align-items center
  font-size 26px
  color #888888
  background #ffffff
  .plan-detail-item
    overflow: hidden
    text-overflow:ellipsis
    white-space: nowrap
.seat-detail
  display flex
  flex-direction row
  justify-content space-around
  align-items center
  font-size 26px
  color #888888
  height 80px
  background #ffffff
  padding 0 20px 0 20px
</style>
