<template>
    <el-form ref="form" label-width="80px" class="box-card">
        <h1 class="zhuce">注册</h1>
        <el-form-item  label="账号">
        <el-input v-model="zhanghao" class="input"></el-input>
       </el-form-item>
        <el-form-item label="密码">
        <el-input v-model="mima" type="password" class="input"></el-input>
       </el-form-item>
        <el-form-item  label="手机号">
        <el-input @blur="panduan" v-model="shoujihao" class="input"></el-input>
       </el-form-item>
        <el-form-item label="邮箱">
        <el-input v-model="youxiang" class="input"></el-input>
       </el-form-item>
        <el-form-item label="姓名">
        <el-input v-model="xingming" class="input"></el-input>
       </el-form-item>
        <el-form-item>
    <el-button @click="denglu" style=" margin-left: -80px;">登录</el-button>
    <el-button  @click="reg">注册</el-button>
  </el-form-item>
    </el-form>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      zhanghao: "",
      mima: "",
      shoujihao: "",
      youxiang: "",
      xingming: ""
    };
  },
  computed: {
    ...mapState("login", ["zhuangtai"])
  },
  methods: {
    ...mapActions("login", ["huoqushuju", "phone"]),
    panduan() {
      this.phone({
        userPhone: this.shoujihao
      });
    },
    reg() {
      if (
        this.zhanghao == "" ||
        this.mima == "" ||
        this.shoujihao == "" ||
        this.youxiang == "" ||
        this.xingming == ""
      ) {
        this.$alert("请完善资料", "友情提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
        return;
      }
      if (this.shoujihao.length != 11) {
        this.$alert("手机号格式不正确", "友情提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
        return;
      }
      if (this.zhuangtai) {
        this.huoqushuju({
          userAcount: this.zhanghao,
          userPwd: this.mima,
          userPhone: this.shoujihao,
          userMail: this.youxiang,
          userName: this.xingming,
          userType: "门店管理",
          userStatus: "申请中"
        });
        this.zhanghao = "";
        this.mima = "";
        this.shoujihao = "";
        this.youxiang = "";
        this.xingming = "";
        this.$alert("点击确定跳转到登录页面", "注册成功", {
          confirmButtonText: "确定",
          callback: action => {
            this.$router.push("/");
          }
        });
      } else {
        this.$alert("手机号已注册！", "友情提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    denglu() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.box-card {
  width: 550px;
  margin: auto;
  margin-top: 200px;
  border: 1px solid rgb(168, 164, 164);
  text-align: center;
  border-radius: 10px;
}
.input {
  width: 400px;
}
.zhuce {
  text-align: center;
}
</style>