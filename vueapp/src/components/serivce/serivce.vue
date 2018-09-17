<template>
<div>
    <div>
        <el-button type="primary" plain @click="dialogFormVisible = true" >增加</el-button>
        <el-input placeholder="请输入内容" v-model="input5" style="width:500px;" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="类别" value="1"></el-option>
            <el-option label="名称" value="2"></el-option>
            <el-option label="适用规格" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>
    <el-table
    class="serviceTable"
    :data="rows"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="serviceName"
      label="名称"
      width="100"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="serviceType"
      label="类别"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="serviceSchedule"
      label="排期"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="serviceCanFor"
      label="适用规格"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="serviceDetial"
      label="服务规格"
      width="100"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="serviceTime"
      label="耗时"
      width="100"
      align="center">
    </el-table-column>    
    <el-table-column
      prop="serviceLevel"
      label="服务员等级"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="servicePrice"
      label="价格"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="curPage"
    :page-sizes="[10,5, 8,15]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  <!-- 增加 -->
<el-dialog title="新增服务" :visible.sync="dialogFormVisible" center>
    <el-form :model="form">
        <el-form-item label="服务名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择服务类型">
                <el-option label="洁毛" value="shanghai"></el-option>
                <el-option label="修甲" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="服务排期" :label-width="formLabelWidth">
              <el-time-picker
                    is-range
                    v-model="time"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                </el-time-picker>
        </el-form-item>
        <el-form-item label="适用规格" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务规格" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务耗时" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务员等级" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务价格" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
</el-dialog>

</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "getService",
  data() {
    return {
        input3: '',
        input4: '',
        input5: '',
        select: '',
        time: [new Date(), new Date()],
        dialogFormVisible: false,
        form: {
            name: "",
            region: "",
            date1: "",
            date2: "",
            delivery: false,
            type: [],
            resource: "",
            desc: ""
        },
        formLabelWidth: "120px"
    };
  },
  created() {
    this.asyncGetServiceByPage();
  },
  computed: {
    ...mapState("serivce", ["curPage", "eachPage", "maxpage", "total", "rows"])
  },
  watch: {
    curPage() {
      this.asyncGetServiceByPage();
    },
    eachPage() {
      this.asyncGetServiceByPage();
    }
  },
  methods: {
    ...mapActions("serivce", ["asyncGetServiceByPage"]),
    ...mapMutations("serivce", ["setCurPage","setEachPage"]),
    handleSizeChange(val) {
      console.log(123, val);
      this.setEachPage(val);
    },
    handleCurrentChange(val) {
      console.log(456, val);
      this.setCurPage(val);
    }
  }
};
</script>

<style>
.serviceTable {
  line-height: 80px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
