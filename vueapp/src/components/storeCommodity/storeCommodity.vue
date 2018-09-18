<template>
    <div>
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
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      userName: "10001"
    };
  },
  created() {
    this.asyncGetStoreGoods(this.userName);
    console.log(this);
    console.log(this.userName)
  },
  computed: {
    ...mapState("storeCommodity", ["rows"])
  },
  methods: {
    ...mapActions("storeCommodity", ["asyncGetStoreGoods"])
  }
};
</script>

<style>
</style>
