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
        this.indentNum = value.indentNum
        this.invPorcelainNum = value.invPorcelainNum
        this.porcelainYield = value.porcelainYield
        this.porcelainDeliveryNum = value.porcelainDeliveryNum
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
            data: ['订货量（支）', '库存量（支）', '产量（支）', '发货量（支）']
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
              max: 1000000,
              interval: 150000,
              axisLabel: {
                formatter: '{value} 支'
              }
            },
            {
              type: 'value',
              name: '数量',
              min: 0,
              max: 100000,
              interval: 10000,
              axisLabel: {
                formatter: '{value} 支'
              }
            }
          ],
          series: [
            {
              name: '订货量（支）',
              type: 'bar',
              data: this.indentNum
            },
            {
              name: '库存量（支）',
              type: 'bar',
              data: this.invPorcelainNum
            },
            {
              name: '产量（支）',
              type: 'bar',
              yAxisIndex: 0,
              data: this.porcelainYield
            },
            {
              name: '发货量（支）',
              type: 'line',
              yAxisIndex: 0,
              data: this.porcelainDeliveryNum
            }
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
