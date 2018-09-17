<template>
    <div>
    <div style="float: left;">
      <el-input placeholder="请输入搜索内容" v-model="input5" class="input-with-select" style="width:600px;">
      <el-select v-model="select" slot="prepend" placeholder="请选择" >
      <el-option label="姓名" value="memberName"></el-option>
      <el-option label="商品/服务" value="goodsMaterial"></el-option>
      <el-option label="用户电话" value="memberPhone"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="serach">搜索</el-button>
  </el-input>
</div>
    <el-table
    :data="rows"
    border
    style="width: 100%"
    >
    <el-table-column
      prop="_id"
      label="订单号"
      width="250"
      align="center">
    </el-table-column>
    <el-table-column
      prop="memberName"
      label="姓名"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="memberPhone"
      label="电话"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="memberArea"
      label="市区"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="shopName"
      label="店名"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goodsMaterial"
      label="商品/服务"
      width="100"
      align="center">
    </el-table-column>
     <el-table-column
      prop="quantity"
      label="数量"
      width="100"
      align="center">
    </el-table-column>
     <el-table-column
      prop="goodsPrice"
      label="单价"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="memberAdd"
      label="收货地址"
      width="250"
      align="center">
    </el-table-column>
    <el-table-column
    fixed="right"
      label="操作"
      width="110"
      align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="open2(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curpage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data(){
    return{
      input5:"",
      select:""
    }
  },
  created() {
    // console.log(this,"15")
    this.asyncGetEmpByPage();
  },
  computed: {
    ...mapState("theorder", ["curpage", "eachpage", "maxpage", "total", "rows"])
  },
  // watch: {
  //   curpage() {
  //     this.asyncGetEmpByPage({
  //       type:this.input5,
  //       value:this.select,
  //     });
  //   },
  //   eachpage() {
  //     this.asyncGetEmpByPage({
  //       type:this.input5,
  //       value:this.select,
  //     });
  //   }
  // },
  methods: {
    serach(){
      // console.log(this.input5,this.select)
      this.asyncserach({
        type:this.input5,
        value:this.select,
      })
    },
    open2(row) {
      // console.log(this)
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.asyncdelete(row._id)
          this.asyncGetEmpByPage();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
       this.setEachPage(val);
        this.asyncGetEmpByPage({
          type:this.input5,
          value:this.select,
        })
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
       this.setCurPage(val);
       this.asyncGetEmpByPage({
          type:this.input5,
          value:this.select,
        })
    },
    ...mapMutations("theorder", ["setEachPage", "setCurPage",]),
    ...mapActions("theorder", ["asyncGetEmpByPage","asyncdelete","asyncserach"]),
    firstPagr() {
      this.asyncGetEmpByPage({ curPage: 1 });
    },
    lastPage() {
      this.asyncGetEmpByPage({ curPage: this.maxPage });
    }
  }
};
</script>

<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
