<template>
<div>
   <div style="float:left;">
       <el-button style="width:80px;" type="primary" plain @click="dialogFormVisible = true">增加</el-button>
  <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
    <el-select style="width:130px;" v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="姓名" value="memberName"></el-option>
      <el-option label="电话" value="memberPhone"></el-option>
      <el-option label="会员卡号" value="memberCard"></el-option>
      <el-option label="昵称" value="memberAcount"></el-option>
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
      label="真实姓名"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="memberPet"
      label="宠物"
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
        <el-button @click="open(scope.row)" type="text" size="small">删除</el-button>
        <el-button @click="Update(scope.row)" type="text" size="small">修改</el-button>
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
    <el-form-item label="宠物" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="form.memberPet" auto-complete="off"></el-input>
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
    <el-form-item label="头像" style="width:500px" :label-width="formLabelWidth">
       <el-upload
  class="avatar-uploader"
  action="/member/addImg"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="form.memberImg" :src="form.memberImg" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </div>
</el-dialog>


 <el-dialog title="修改宠主"  :visible.sync="putdialogFormVisible">
  <el-form :model="formput" style="margin-left: 150px" >
    <el-form-item label="昵称" style="width:500px;" :label-width="formLabelWidth">
      <el-input v-model="formput.memberAcount"  auto-complete="off" ></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="formput.memberName" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="宠物" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="formput.memberPet" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="电话号码"  style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="formput.memberPhone" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="会员卡" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="formput.memberCard" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="送货地址" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="formput.memberAdd" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="区域" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="formput.memberArea" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="积分" style="width:500px" :label-width="formLabelWidth">
        <el-input v-model="formput.memberPoint" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="头像"  style="width:500px" :label-width="formLabelWidth">
       <!-- <el-input v-model="formput.memberImg" auto-complete="off"></el-input> -->
        <el-upload
  class="avatar-uploader"
  action="/member/addImg"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="formput.memberImg" :src="formput.memberImg" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="putdialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
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
      putdialogFormVisible: false,
      form: {
        memberName: "",
        memberAcount: "",
        memberPhone: "",
        memberCard: "",
        memberAdd: "",
        memberImg: "",
        memberArea: "",
        memberPoint: "",
        memberPet: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formput: {
        memberName: "",
        memberAcount: "",
        memberPhone: "",
        memberCard: "",
        memberAdd: "",
        memberImg: "",
        memberArea: "",
        memberPoint: "",
        memberPet: "",
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
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.memberImg = res;
    },
    handleAvatarSuccess(res, file) {
      this.formput.memberImg = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.setEachPage(val);
      let obj = {};
      obj.text = this.input;
      obj.type = this.select;
      this.asyncSpoilmanagementByPage(obj);
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.setCurPage(val);
      let obj = {};
      obj.text = this.input;
      obj.type = this.select;
      this.asyncSpoilmanagementByPage(obj);
    },

    ...mapMutations("spoilmanagement", ["setCurPage", "setEachPage"]),
    ...mapActions("spoilmanagement", [
      "asyncSpoilmanagementByPage",
      "asyncDeleteSpoilmanagement",
      "asyncSearchSpoilmanagement",
      "asyncAddSpoilmanagement",
      "asyncUpdateSpoilmanagement"
    ]),
    // 首页
    // 删除
    open(rows) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.asyncDeleteSpoilmanagement(rows._id);
          this.asyncSpoilmanagementByPage();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 搜索
    search() {
      let obj = {};
      obj.curPage = 1;
      (obj.type = this.select), (obj.value = this.input);
      this.asyncSearchSpoilmanagement(obj);
    },
    // 修改
    Update(rows) {
      this.putdialogFormVisible = true;
      Object.assign(this.formput, rows);
    },
    // 确认修改
    confirm() {
      this.asyncUpdateSpoilmanagement(this.formput);
      this.asyncSpoilmanagementByPage();
      this.putdialogFormVisible = false;
    },
    // 增加
    add() {
      let obj = {};
      obj.memberAcount = this.form.memberAcount;
      obj.memberName = this.form.memberName;
      obj.memberPhone = this.form.memberPhone;
      obj.memberCard = this.form.memberCard;
      obj.memberAdd = this.form.memberAdd;
      obj.memberArea = this.form.memberArea;
      obj.memberPoint = this.form.memberPoint;
      obj.memberImg = this.form.memberImg;
      obj.memberPet = this.form.memberPet;
      this.asyncAddSpoilmanagement(obj);
      this.asyncSpoilmanagementByPage();
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style scoped>
.table {
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
