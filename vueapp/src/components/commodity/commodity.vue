<template>
<div>
<div style="margin-bottom:10px;float:left">
  <el-button slot="prepend" icon="el-icon-plus" style="margin-right:10px" @click="dialogFormVisible = true" ></el-button>
  <el-dialog title="添加商品" :visible.sync="dialogFormVisible" close>
  <el-form :model="form">
    <el-form-item label="商品名" :label-width="formLabelWidth">
      <el-input v-model="form.goodsName" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="品类" :label-width="formLabelWidth">
      <el-input v-model="form.goodsType" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="材质或制作方法" :label-width="formLabelWidth">
      <el-input v-model="form.goodsMaterial" auto-complete="off"></el-input>
  </el-form-item>
  </el-form>
   <el-form :model="form">
    <el-form-item label="适用规格" :label-width="formLabelWidth">
      <el-input v-model="form.goodsCanFor" auto-complete="off"></el-input>
  </el-form-item>
  </el-form>
   <el-form :model="form">
    <el-form-item label="专属规格" :label-width="formLabelWidth">
      <el-input v-model="form.goodsOnlyFor" auto-complete="off"></el-input>
  </el-form-item>
  </el-form>
   <el-form :model="form">
    <el-form-item label="包装规格" :label-width="formLabelWidth">
      <el-input v-model="form.goodsSize" auto-complete="off"></el-input>
  </el-form-item>
  </el-form>
   <el-form :model="form">
    <el-form-item label="口味" :label-width="formLabelWidth">
      <el-input v-model="form.goodsTaste" auto-complete="off"></el-input>
  </el-form-item>
  </el-form>
   <el-form :model="form">
    <el-form-item label="特殊功用" :label-width="formLabelWidth">
      <el-input v-model="form.goodsSpecial" auto-complete="off"></el-input>
  </el-form-item>
  </el-form>
   <el-form :model="form">
    <el-form-item label="产地" :label-width="formLabelWidth">
      <el-input v-model="form.goodsRegion" auto-complete="off"></el-input>
  </el-form-item>
  </el-form>
   <el-form :model="form">
    <el-form-item label="出厂日期" :label-width="formLabelWidth">
      <el-input v-model="form.goodsDate" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="保质期" :label-width="formLabelWidth">
      <el-input v-model="form.goodsTime" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="特色说明" :label-width="formLabelWidth">
      <el-input v-model="form.goodsInrtro" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="价格" :label-width="formLabelWidth">
      <el-input v-model="form.goodsPrice" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="图片" :label-width="formLabelWidth">
  <!-- <el-input v-model="form.goodsImg" auto-complete="off"></el-input> -->
   <el-upload
  class="avatar-uploader"
  action="/commodity/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="form.goodsImg" :src="form.goodsImg" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
 </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addGoods">确 定</el-button>
  </div>
</el-dialog>
  <el-input placeholder="请输入内容" v-model="val" class="input-with-select" style="width:600px">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="商品名" value="goodsName"></el-option>
      <el-option label="产地" value="goodsRegion"></el-option>
      <el-option label="价格" value="goodsPrice"></el-option>
      <el-option label="品类" value="goodsType"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
  </el-input>
</div>
<el-table
    :data="rows"
    border
    style="width: 100%"
   >
    <el-table-column
      fixed
      prop="goodsName"
      label="商品名"
      width="120"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="goodsType"
      label="品类"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goodsMaterial"
      label="材质或制作方法"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goodsCanFor"
      label="适用规格"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goodsOnlyFor"
      label="专属规格"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goodsSize"
      label="包装规格"
      width="120"
      align="center">
    </el-table-column>
     <el-table-column
      prop="goodsTaste"
      label="口味"
      width="120"
      align="center">
    </el-table-column>
      <el-table-column
      prop="goodsSpecial"
      label="特殊功用"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goodsRegion"
      label="产地"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goodsDate"
      label="出厂日期"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goodsTime"
      label="保质期"
      width="120"
      align="center">
    </el-table-column>
     <el-table-column
      prop="goodsInrtro"
      label="特色说明"
      width="120"
      align="center">
    </el-table-column>
     <el-table-column
      prop="goodsPrice"
      label="价格"
      width="120"
      align="center">
    </el-table-column>
       <el-table-column
      prop="goodsImg"
      label="图片"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100"
      align="center">
      <template slot-scope="scope">
        <el-button   type="text" size="small"  @click="handleChange(scope.row)">修改</el-button>
        <el-button type="text" size="small"  @click="open2(scope.row)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="block" style="margin-top:10px;width:1000px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="prePage"
      @next-click="nextPage"
      :current-page="curpage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
    <el-dialog title="修改商品" :visible.sync="changedialogFormVisible">
  <el-form :model="change">
    <el-form-item label="商品名" :label-width="formLabelWidth">
      <el-input v-model="change.goodsName" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="品类" :label-width="formLabelWidth">
      <el-input v-model="change.goodsType" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="材质或制作方法" :label-width="formLabelWidth">
      <el-input v-model="change.goodsMaterial" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="适用规格" :label-width="formLabelWidth">
      <el-input v-model="change.goodsCanFor" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="专属规格" :label-width="formLabelWidth">
      <el-input v-model="change.goodsOnlyFor" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="包装规格" :label-width="formLabelWidth">
      <el-input v-model="change.goodsSize" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="口味" :label-width="formLabelWidth">
      <el-input v-model="change.goodsTaste" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="特殊功用" :label-width="formLabelWidth">
      <el-input v-model="change.goodsSpecial" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="产地" :label-width="formLabelWidth">
      <el-input v-model="change.goodsRegion" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="出厂日期" :label-width="formLabelWidth">
      <el-input v-model="change.goodsDate" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="保质期" :label-width="formLabelWidth">
      <el-input v-model="change.goodsTime" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="特色说明" :label-width="formLabelWidth">
      <el-input v-model="change.goodsInrtro" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="价格" :label-width="formLabelWidth">
      <el-input v-model="change.goodsPrice" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="图片" :label-width="formLabelWidth">
  <el-input v-model="change.goodsImg" auto-complete="off"></el-input>
  </el-form-item>
 </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="changedialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeGoods">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      input3: "",
      input4: "",
      input5: "",
      select: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      changedialogFormVisible: false,
      val: "",
      select: "",
      form: {
        goodsName: "",
        goodsType: "",
        goodsMaterial: "",
        goodsCanFor: "",
        goodsOnlyFor: "",
        goodsSize: "",
        goodsTaste: "",
        goodsSpecial: "",
        goodsRegion: "",
        goodsDate: "",
        goodsTime: "",
        goodsInrtro: "",
        goodsPrice: "",
        goodsImg: "",
        userName: []
      },
      change: {
        goodsName: "",
        goodsType: "",
        goodsMaterial: "",
        goodsCanFor: "",
        goodsOnlyFor: "",
        goodsSize: "",
        goodsTaste: "",
        goodsSpecial: "",
        goodsRegion: "",
        goodsDate: "",
        goodsTime: "",
        goodsInrtro: "",
        goodsPrice: "",
        goodsImg: "",
        userName: []
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.asyncGetGoodsByPage();
  },
  computed: {
    ...mapState("commodity", [
      "curpage",
      "eachpage",
      "maxpage",
      "rows",
      "total"
    ])
  },
  methods: {
    ...mapMutations("commodity", [
      "setCurPage",
      "setEachPage",
      "prePage",
      "nextPage",
      "addGoods"
    ]),
    ...mapActions("commodity", [
      "asyncGetGoodsByPage",
      "asyncDleteData",
      "asyncAddGoodsImage",
      "asyncAddGoods",
      "asyncChange"
    ]),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.setEachPage(val);
      this.asyncGetGoodsByPage();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.setCurPage(val);
      this.asyncGetGoodsByPage();
    },
    handleChange(row) {
      console.log(row);
      Object.assign(this.change, row);
      this.changedialogFormVisible = true;
    },
    // handleDelete(index, row) {
    //   this.asyncDleteData(row._id);
    //   this.asyncGetGoodsByPage();
    // },
    searchGoods() {
      // console.log(this.val, this.select);
      let obj = {};
      obj.type = this.select;
      obj.text = this.val;
      this.asyncGetGoodsByPage(obj);
    },
    handleAvatarSuccess(res, file) {
      // console.log(res,file)
      this.form.goodsImg = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      // console.log(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addGoods() {
      this.dialogFormVisible = false;
      let obj = {};
      Object.assign(obj, this.form);
      // console.log(obj);
      this.asyncAddGoods(obj);
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.asyncGetGoodsByPage();
    },
    changeGoods() {
      this.changedialogFormVisible = false;
      let obj = {};
      Object.assign(obj, this.change);
      // console.log(obj);
      this.asyncChange(obj);
      this.asyncGetGoodsByPage();
    },
    open2(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.asyncDleteData(row._id);
          this.asyncGetGoodsByPage();
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
.block {
  margin-right: 0;
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

