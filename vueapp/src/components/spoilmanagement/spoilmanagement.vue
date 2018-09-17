<template>
  <el-table class="table" 
    border
    style="width: 100%">
    <el-table-column 
      align="center"
      fixed
      prop="nickname"
      label="昵称"
      width="150">
    </el-table-column>
    <el-table-column
      align="center"
      prop="name"
      label="真实姓名"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="phone"
      label="电话号码"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="membership"
      label="会员卡"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="address"
      label="送货地址"
      width="300">
    </el-table-column>
    <el-table-column
      align="center"
      prop="avatar"
      label="头像"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="area"
      label="区域"
      width="120">
    </el-table-column>
    <el-table-column
     align="center"
      prop="integral"
      label="积分"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      width="120">
      <template slot-scope="scope" >
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small">修改</el-button>
      </template>
    </el-table-column>
     <el-table-column
     align="center"
      prop="zip"
      label="备注">
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "spoilmanagement",
  created() {
    this.asyncGetEmpByPage();
  },
  computed: {
    ...mapState("spoilmanagement", ["curPage", "eachPage", "maxPage", "total", "rows"])
  },
  watch: {
    curPage() {
      this.asyncGetEmpByPage();
    },
    eachPage() {
      this.asyncGetEmpByPage();
    }
  },
  methods: {
    handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
      this.setEachPage(val);
    },
    handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
      this.setCurPage(val);
    },
    ...mapMutations("emp", ["setCurPage", "setEachPage"]),
    ...mapActions("emp", ["asyncGetEmpByPage"]),
    // 首页
    firstPage() {
      this.asyncGetEmpByPage({ curPage: 1 });
    },
    // 尾页
    lastPage() {
      this.asyncGetEmpByPage({ curPage: this.maxPage });
    }
  }
};
</script>

<style scoped>
.table {
  height: 100px;
  line-height: 100px;
}
</style>
