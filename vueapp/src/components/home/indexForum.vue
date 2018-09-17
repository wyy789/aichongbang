<template>
    <el-container>
        <el-header style="height:100px;" class="head">爱宠邦平台管理系统
            <h1 class="yonghu" >欢迎你：{{username}}
             <button class="zhuxiao" @click="zhuxiao">注销</button>
            </h1>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                    <el-col :span="24">
                        <el-menu router default-active="1" class="el-menu-vertical-demo">
                            <el-menu-item index="/indexForum/usercontrol">
                                <i class="el-icon-menu"></i>
                                <span slot="title">用户管理</span>
                            </el-menu-item>
                            <el-menu-item index="/indexForum/storemanagement">
                                <i class="el-icon-document"></i>
                                <span slot="title">门店管理</span>
                            </el-menu-item>
                            <el-menu-item index="/indexForum/spoilmanagement">
                                <i class="el-icon-setting"></i>
                                <span slot="title">宠主管理</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      zhuangtai1: ""
    };
  },
  computed: {
    ...mapState("home", ["username", "puandan"])
  },
  methods: {
    ...mapActions("home", ["login", "yanzheng", "tuichu"]),
    async zhuxiao() {
      await this.tuichu();
      this.$router.push("/");
    }
  },
  mounted() {},
  async created() {
    await this.yanzheng();
    if (!this.$store.state.home.puandan) {
      this.$router.push("/");
    }
    this.login();
    this.zhuangtai1 = this.username;
  }
};
</script>

<style>
.head {
  position: relative;
}
.yonghu {
  display: inline-block;
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 15px;
}
.zhuxiao {
  background-color: white;
  color: red;
}
.el-header {
  color: #fff;
  text-align: center;
  background-color: #409eff;
  line-height: 100px;
  font-size: 24px;
}

.el-aside {
  text-align: center;
}

.el-main {
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}
</style>

