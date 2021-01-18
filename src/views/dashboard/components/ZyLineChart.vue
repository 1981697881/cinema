<template>
  <div :class="className" :style="{width:width}" style=" height: calc(100vh /3)">
  </div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        number: 0,
        chart: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        //this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart(value) {
        console.log(value)
        this.orderNum = value.orderNum
        this.dopeYield = value.dopeYield
        this.dopeDeliveryNum = value.dopeDeliveryNum
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              /* dataView: {show: true, readOnly: false},
               magicType: {show: true, type: ['line', 'bar']},
               restore: {show: true},
               saveAsImage: {show: true}*/
            }
          },
          legend: {
            top: 'bottom',
            data: ['订单量（桶）', '产量（桶）', '发货量（桶）']
          },
          xAxis: [
            {
              type: 'category',
              data: value.arrayDay,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '数量',
              min: 0,
              max: 20000,
              interval: 5000,
              axisLabel: {
                formatter: '{value} 桶'
              }
            },
            {
              type: 'value',
              name: '数量',
              min: 0,
              max: 20000,
              interval: 5000,
              axisLabel: {
                formatter: '{value} 桶'
              }
            }
          ],
          series: [
            {
              name: '订单量（桶）',
              type: 'bar',
              data: this.orderNum
            },
            {
              name: '产量（桶）',
              type: 'bar',
              data: this.dopeYield
            },
            {
              name: '发货量（桶）',
              type: 'line',
              yAxisIndex: 0,
              data: this.dopeDeliveryNum
            },
          ]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh /3);
  }
</style>
