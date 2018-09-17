<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 15px;float: left;">
  <el-input placeholder="请输入内容" v-model="input5" style="width:500px;">
    <el-select slot="prepend" v-model="select" placeholder="请选择">
      <el-option label="用户名" value="userAcount"></el-option>
      <el-option label="手机号" value="userPhone"></el-option>
      <el-option label="姓名" value="userName"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="shousuo">搜索</el-button>
  </el-input>
</div>
    <template>
    <el-table
      :data="rows"
      border
      style="width: 100%">
      <el-table-column align="center"
        prop="userAcount"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column align="center"
        prop="userPwd"
        label="密码"
        width="180">
      </el-table-column>
      <el-table-column align="center"
        prop="userPhone"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column align="center"
        prop="userMail"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column align="center"
        prop="userName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column align="center"
        prop="userType"
        label="角色"
        width="180">
      </el-table-column>
      <el-table-column align="center"
        prop="userStatus"
        label="状态"
        width="180">
    </el-table-column>
     <el-table-column align="center"
      label="操作"
      width="300">
      <template slot-scope="scope" >
       <el-button type="primary" v-model="zhuangtai1" plain  @click="tongguo(scope.row)">可用</el-button>
       <el-button type="primary" v-model="zhuangtai2" plain  @click="butongguo(scope.row)">不可用</el-button>
       <el-button type="primary" v-model="zhuangtai3" plain  @click="delet(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
   </template>
 </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      zhuangtai1: "可用",
      zhuangtai2: "不可用",
      zhuangtai3: "删除",
      input5: "",
      select: ""
    };
  },
  computed: {
    ...mapState("usercontrol", ["rows"]),
    ...mapState("home", ["username"])
  },
  methods: {
    ...mapActions("usercontrol", ["phone", "shenghe", "shanchu", "chaxun"]),
    tongguo(row) {
      this.shenghe({
        row,
        text: this.zhuangtai1
      });
    },
    butongguo(row) {
      this.shenghe({
        row,
        text: this.zhuangtai2
      });
    },
    delet(row) {
      this.shanchu(row);
    },
    shousuo() {
      this.chaxun({
        type: this.select,
        text: this.input5
      });
    }
  },
  increment: {},
  mounted() {},
  created() {
    this.phone();
  }
};
</script>
<style scoped>
.zhuangtai {
  color: red;
}
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
</style>

