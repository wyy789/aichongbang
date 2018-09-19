<template>
    <div>
<el-row>
  <el-button type="primary" icon="el-icon-plus" style="float:left;margin-bottom:10px" @click="addStoreGoods">添加商品</el-button>
</el-row>
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
  </el-table>
<el-dialog title="增加商品到店" :visible.sync="dialogTableVisible">
  <el-table :data="allData"
  height="250"
  border
  style="width: 100%"
  @selection-change="choose"
  >
  <el-table-column
      type="selection"
      width="55"
      >
    </el-table-column>
    <el-table-column property="goodsName" label="商品名" width="150" align="center"></el-table-column>
    <el-table-column property="goodsType" label="品类" width="200"  align="center"></el-table-column>
    <el-table-column property="goodsMaterial" label="材质或制作方法" width="200"  align="center"></el-table-column>
     <el-table-column property="goodsCanFor" label="适用规格" width="150"  align="center"></el-table-column>
    <el-table-column property="goodsOnlyFor" label="专属规格" width="200"  align="center"></el-table-column>
    <el-table-column property="goodsSize" label="包装规格" width="150"  align="center"></el-table-column>
     <el-table-column property="goodsTaste" label="口味" width="150"  align="center"></el-table-column>
    <el-table-column property="goodsSpecial" label="特殊功用" width="200"  align="center"></el-table-column>
    <el-table-column property="goodsRegion" label="产地" width="150"  align="center"></el-table-column>
     <el-table-column property="goodsDate" label="出厂日期" width="150"  align="center"></el-table-column>
    <el-table-column property="goodsTime" label="保质期" width="200"  align="center"></el-table-column>
    <el-table-column property="goodsInrtro" label="特色说明" width="150"  align="center"></el-table-column>
     <el-table-column property="goodsPrice" label="价格" width="150"  align="center"></el-table-column>
    <el-table-column property="goodsImg" label="图片" width="200"  align="center"></el-table-column>
  </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addUser">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  async created() {
    await this.asyncGetUser();
    await this.asyncGetStoreGoods();
    await this.asyncGetStoreAllGoods();
  },
  data() {
    return {
      dialogTableVisible: false,
      arr: []
    };
  },
  computed: {
    ...mapState("storeCommodity", ["rows", "allData"])
  },
  methods: {
    ...mapActions("storeCommodity", [
      "asyncGetStoreGoods",
      "asyncGetUser",
      "asyncGetStoreAllGoods",
      "asyncPutUser"
    ]),
    ...mapMutations("storeCommodity", ["addUserName"]),
    addStoreGoods() {
      this.dialogTableVisible = true;
    },
    choose(row) {
      console.log(row);
      this.arr = row;
      console.log(this.arr);
    },
    addUser() {
      this.addUserName(this.arr);
      this.asyncPutUser(this.arr);
      this.asyncGetStoreGoods()
    }
  }
};
</script>

<style>
</style>
