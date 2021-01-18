<template>
  <ele-calendar
    style="margin-top: 20px;"
    :defaultValue="createTime"
    :selectionMode="'dates'"
    :data="list"
    @select="select"
    @date-change="change"
    @pick="pick"
    :render-content="renderContent"
    :prop="prop"></ele-calendar>
</template>
<script>
  import eleCalendar from 'ele-calendar'
  import 'ele-calendar/dist/vue-calendar.css'
    export default {
      components: {
        eleCalendar
      },
      props: {
        list: {
          // 请求返回的json数据
          type: Array,
          default: null
        },
      },
      data() {
        return {
          createTime: null,
          valueDates: [],
          getTime: function () {
            var _this = this;
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth() + 1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
            _this.createTime = yy + '-' + mm
          },
          prop: 'date' // 对应日期字段名
        }
      },
      mounted() {
        this.getTime()
      },
      methods: {
        renderContent(h,parmas) { // 设置lunarcalendar=true,parmas返回值包含农历
          const loop = data =>{
            return (
              data.defvalue.value ? (<div><div>{data.defvalue.text}</div>
                <span>{data.defvalue.value.typename}</span>
                </div>) : <div>{data.defvalue.text}</div>
            )
          }
          return (<div style="min-height:60px;">{loop(parmas)} </div>
        );
        },
        change() {
          //console.log(this.datedef)
        },
        pick() {
          //console.log(this.datedef)
        },
        select(val) {
          this.valueDates=[]
          for(const i in val){
            this.valueDates.push(this.msToDate(val[i]).withoutTime)
          }
          console.log(this.valueDates)
        },
        //中国标准时间转年月日
        msToDate(msec) {
          let datetime = new Date(msec)
          let year = datetime.getFullYear()
          let month = datetime.getMonth()
          let date = datetime.getDate()
          let hour = datetime.getHours()
          let minute = datetime.getMinutes()
          let second = datetime.getSeconds()

          let result1 =
            year +
            '-' +
            (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
            '-' +
            (date + 1 < 10 ? '0' + date : date) +
            ' ' +
            (hour + 1 < 10 ? '0' + hour : hour) +
            ':' +
            (minute + 1 < 10 ? '0' + minute : minute) +
            ':' +
            (second + 1 < 10 ? '0' + second : second)

          let result2 =
            year +
            '-' +
            (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
            '-' +
            (date + 1 < 10 ? '0' + date : date)

          let result = {
            hasTime: result1,
            withoutTime: result2
          }

          return result
        },
      }
    }
</script>

<style scoped>

</style>
