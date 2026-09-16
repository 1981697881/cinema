<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="兑换码" prop="exchangeCode">
            <el-input v-model="form.exchangeCode" placeholder="请输入兑换码" clearable @keyup.enter.native="query" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" :loading="loading" @click="query">查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-table
            class="list-main"
            height="300px"
            :data="list"
            border
            size="mini"
            v-loading="loading"
            :highlight-current-row="true"
          >
            <el-table-column prop="date" label="序号" type="index" align="center" width="60" />
            <el-table-column
              v-for="(t, i) in columns"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              :min-width="t.width || 120"
            >
              <template slot-scope="scope">
                <span v-if="t.name === 'status'">{{ scope.row.status | statusText }}</span>
                <span v-else>{{ scope.row[t.name] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { memberCouponList } from "@/api/extension/index";

export default {
  data() {
    return {
      loading: false,
      list: [],
      form: {
        exchangeCode: null
      },
      rules: {
        exchangeCode: [
          { required: true, message: "请输入兑换码", trigger: "blur" }
        ]
      },
      columns: [
        { text: "兑换码", name: "cdkeyCode", width: 140 },
        { text: "团体票名称", name: "couponName", width: 160 },
        { text: "绑定用户", name: "openId", width: 180 },
        { text: "使用状态", name: "status", width: 100 },
        { text: "生效时间", name: "startDate", width: 150 },
        { text: "失效时间", name: "endDate", width: 150 },
        { text: "描述", name: "description", width: 140 }
      ]
    };
  },
  filters: {
    statusText(value) {
      if (value == "0") {
        return "未使用";
      } else if (value == "1") {
        return "已使用";
      } else if (value == "2") {
        return "已过期";
      }
      return value;
    }
  },
  methods: {
    query() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return;
        }
        this.loading = true;
        memberCouponList({ exchangeCode: this.form.exchangeCode }).then(res => {
          this.loading = false;
          if (res.flag) {
            this.list = res.data || [];
            if (!this.list.length) {
              this.$message({
                message: "未查询到相关数据",
                type: "warning"
              });
            }
          } else {
            this.list = [];
          }
        }).catch(() => {
          this.loading = false;
          this.list = [];
        });
      });
    }
  }
};
</script>
