<template>
    <div>123</div>
</template>

<script>
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

</style>
