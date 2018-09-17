<template>
<div>
   <div style="float:left;">
       <el-button style="width:80px;" type="primary" plain @click="dialogFormVisible = true">增加</el-button>
  <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
    <el-select style="width:130px;" v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="姓名" value="memberName"></el-option>
      <el-option label="电话" value="memberPhone"></el-option>
      <el-option label="会员卡号" value="memberCard"></el-option>
    </el-select>
    <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
  </el-input>
</div>

  <el-table class="table" 
  :data="rows"
    border
    style="width: 100%"
    
    >
    <el-table-column 
      align="center"
      fixed
      prop="memberAcount"
      label="昵称"
      width="150">
    </el-table-column>
    <el-table-column
      align="center"
      prop="memberName"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="memberPhone"
      label="电话号码"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="memberCard"
      label="会员卡"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="memberAdd"
      label="送货地址"
      width="300">
    </el-table-column>
  
    <el-table-column
      align="center"
      prop="memberArea"
      label="区域"
      width="120">
    </el-table-column>
    <el-table-column
     align="center"
      prop="memberPoint"
      label="积分"
      width="120">
    </el-table-column>
      <el-table-column
      align="center"
      prop="memberImg"
      label="头像"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      width="120">
      <template slot-scope="scope" >
        <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
      </template>
    </el-table-column>
   
    
  </el-table>
  <el-pagination
        @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :size-change="eachPage"
      :current-change="curPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

   <el-dialog title="新增宠主"  :visible.sync="dialogFormVisible">
  <el-form :model="form" style="margin-left: 150px" >
    <el-form-item label="昵称" style="width:500px;" :label-width="formLabelWidth">
      <el-input v-model="form.memberAcount"  auto-complete="off" ></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="form.memberName" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="电话号码"  style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="form.memberPhone" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="会员卡" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="form.memberCard" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="送货地址" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="form.memberAdd" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="区域" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="form.memberArea" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="积分" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="form.memberPoint" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="头像"  style="width:500px" :label-width="formLabelWidth">
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "spoilmanagement",

  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      input3: "",
      input4: "",
      input: "",
      select: "",
      form: {
        memberName: "",
        memberAcount: "",
        memberPhone: "",
        memberCard: "",
        memberAdd: "",
        memberImg: "",
        memberArea: "",
        memberPoint: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },

  created() {
    this.asyncSpoilmanagementByPage();
  },
  computed: {
    ...mapState("spoilmanagement", [
      "curPage",
      "eachPage",
      "maxPage",
      "total",
      "rows"
    ])
  },
  watch: {
    curPage() {
        let obj={}
        obj.type=this.select
        obj.text=this.input
      this.asyncSpoilmanagementByPage(obj);
    },
    eachPage() {
        let obj={}
        obj.type=this.select
        obj.text=this.input
      this.asyncSpoilmanagementByPage(obj);
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

    ...mapMutations("spoilmanagement", ["setCurPage", "setEachPage"]),
    ...mapActions("spoilmanagement", [
      "asyncSpoilmanagementByPage",
      "asyncDeleteSpoilmanagement",
      "asyncSearchSpoilmanagement",
      "asyncAddSpoilmanagement"
    ]),
    // 首页
    deleteClick(data) {
      //  console.log(data)
      this.asyncDeleteSpoilmanagement(data._id);
      this.asyncSpoilmanagementByPage();
    },
    search() {
        let obj={}
        obj.type=this.select,
        obj.value=this.input
      this.asyncSearchSpoilmanagement(obj);
    },
    add() {
      let obj = {};
    //   console.log(obj)
      obj.memberAcount = this.form.memberAcount;
      obj.memberName = this.form.memberName;
      obj.memberPhone = this.form.memberPhone;
      obj.memberCard = this.form.memberCard;
      obj.memberAdd = this.form.memberAdd;
      obj.memberArea = this.form.memberArea;
      obj.memberPoint = this.form.memberPoint;
      obj.memberImg = this.form.memberImg;
      this.asyncAddSpoilmanagement(obj);
      this.asyncSpoilmanagementByPage();
      this.dialogFormVisible = false;
    },
    firstPage() {
      this.asyncSpoilmanagementByPage({ curPage: 1 });
    },
    // 尾页
    lastPage() {
      this.asyncSpoilmanagementByPage({ curPage: this.maxPage });
    }
  }
};
</script>

<style scoped>
.table {
  /* height: 500px; */
  line-height: 100px;
}
.el-select .el-input {
  width: 200px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input {
  width: 500px;
}

</style>
