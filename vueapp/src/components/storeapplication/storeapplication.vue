<template>
<div>
  <el-form :model="application" style="width:600px;margin:auto">
    <el-form-item label="店名" :label-width="formLabelWidth">
      <el-input v-model="application.shopName" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="营业执照号码" :label-width="formLabelWidth">
      <el-input v-model="application.shopLicenceNum" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="营业执照照片" :label-width="formLabelWidth">
      <el-input v-model="application.shopLicenceImg" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="营业地址" :label-width="formLabelWidth">
      <el-input v-model="application.shopAdd" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="定位" :label-width="formLabelWidth">
      <el-input v-model="application.shopLocation" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="法人" :label-width="formLabelWidth">
      <el-input v-model="application.shopCorporate" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="门店电话" :label-width="formLabelWidth">
      <el-input v-model="application.shopTel" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item label="门店图片" :label-width="formLabelWidth">
      <!-- <el-input v-model="application.shopImg" auto-complete="off"></el-input> -->
      <el-upload
  class="avatar-uploader"
  action="/storeapplication/addImg"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="application.shopImg" :src="application.shopImg" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
    <el-form-item label="特殊服务" :label-width="formLabelWidth">
      <el-input v-model="application.shopFeature" auto-complete="off"></el-input>
  </el-form-item>
 </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="applicationSuccess">确 定</el-button>
  </div>
  
</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  async created() {
    await this.asyncGetUser();
  },
  data() {
    return {
      application: {
        shopName: "",
        shopLicenceNum: "",
        shopLicenceImg: "",
        shopAdd: "",
        shopLocation: "",
        shopCorporate: "",
        shopTel: "",
        shopImg: "",
        shopFeature: "",
        status: "未审核",
        userName: "",
        goods: [],
        service: []
      },
      applicationdialogFormVisible: true,
      dialogTableVisible: true,
      formLabelWidth: "120px"
    };
  },
  methods: {
    ...mapActions("storeapplication", ["asyncAddStores","asyncGetUser"]),
    applicationStore() {
      //   this.applicationdialogFormVisible = true;
    },
    applicationSuccess() {
      let obj = {};
      Object.assign(obj, this.application);
    //   console.log(obj);
    //   console.log(this);
      this.asyncAddStores(obj);
      this.$message({
        type: "success",
        message: "申请门店成功!"
      });
      for (let key in this.application) {
        this.application[key] = "";
      }
    },
    handleAvatarSuccess(res, file) {
        console.log(res)
        this.application.shopImg = res
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
    }
  }
};
</script>

<style>
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
