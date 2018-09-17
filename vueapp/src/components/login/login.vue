<template>
    <el-form ref="form" label-width="80px" class="box-card" >
        <h1 class="denglu">登录</h1>
        <el-form-item label="账号" class="zhanghao">
        <el-input v-model="zhanghao"></el-input>
       </el-form-item>
        <el-form-item label="密码" class="zhanghao">
        <el-input v-model="mima" type="password"></el-input>
       </el-form-item>
    <el-form-item >
     <el-button @click="denglu" style=" margin-left: -80px;">登录</el-button>
     <el-button @click="reg">注册</el-button>
    </el-form-item>
    </el-form>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      zhanghao: "",
      mima: ""
    };
  },
  computed: {
    ...mapState("login", ["puanduan", "quanxian"])
  },
  methods: {
    ...mapActions("login", ["login"]),
    reg() {
      this.$router.push("/reg");
    },
    async denglu() {
      await this.login({
        userAcount: this.zhanghao,
        userPwd: this.mima
      });
      if (this.$store.state.login.panduan) {
        if (this.$store.state.login.shenghe == "可用") {
          if (this.$store.state.login.quanxian == "平台管理") {
            this.$router.push("/indexForum");
          } else {
            this.$router.push("/indexStore");
          }
        } else {
          this.$alert("你的账号未审核，请等待审核通过再尝试登录", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        }
      } else {
        this.$alert("您输入的账号密码不匹配", "错误", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.box-card {
  width: 500px;
  margin: auto;
  margin-top: 200px;
  border: 1px solid rgb(168, 164, 164);
  text-align: center;
  border-radius: 10px;
}
.zhanghao {
  width: 450px;
}
.denglu {
  text-align: center;
}
</style>

