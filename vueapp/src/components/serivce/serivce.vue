<template>
<div>
    <div style="float:left">
        <el-button type="primary" plain @click="dialogFormVisible = true" >增加</el-button>
        <el-input placeholder="请输入内容" v-model="searchInput" style="width:500px;" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="类别" value="serviceType"></el-option>
            <el-option label="名称" value="serviceName"></el-option>
            <el-option label="适用规格" value="serviceCanFor"></el-option>
            </el-select>
            <el-button slot="append" @click="searchService" icon="el-icon-search"></el-button>
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
        <el-button  type="text" size="small">修改</el-button>
        <el-button @click="deleteData(scope.row)" type="text" size="small">删除</el-button>
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
<el-dialog title="新增服务" :visible.sync="dialogFormVisible" center class="dialogService">
    <el-form :model="form">
        <el-form-item label="服务名称" :label-width="formLabelWidth">
            <el-input v-model="form.serviceName" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" :label-width="formLabelWidth" class="type">
            <el-select v-model="form.serviceType" placeholder="请选择服务类型">
                <el-option label="洁毛" value="洁毛"></el-option>
                <el-option label="修甲" value="修甲"></el-option>
                <el-option label="美容" value="美容"></el-option>
                <el-option label="驱虫" value="驱虫"></el-option>
                <el-option label="绝育" value="绝育"></el-option>
                <el-option label="疫苗" value="疫苗"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="服务排期" :label-width="formLabelWidth" >
            <el-time-select
              placeholder="起始时间"
              v-model="startTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }">
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: startTime
              }">
            </el-time-select>
        </el-form-item>
        <el-form-item label="适用规格" :label-width="formLabelWidth">
            <el-input v-model="form.serviceCanFor" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="服务规格" :label-width="formLabelWidth">
            <el-input v-model="form.serviceDetial" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="耗时(分钟)" :label-width="formLabelWidth">
            <el-input v-model="form.serviceTime" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="服务员等级" :label-width="formLabelWidth">
            <el-input v-model="form.serviceLevel" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)" :label-width="formLabelWidth">
            <el-input v-model="form.servicePrice" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addService">确 定</el-button>
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
        searchInput: '',
        select: '',
        startTime: '',
        endTime: '',
        dialogFormVisible: false,
        form: {
            serviceName: "",
            serviceType: "",
            serviceCanFor: "",
            serviceDetial:"",
            serviceTime:"",
            serviceLevel:"",
            delivery: false,
            servicePrice: ""
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
      let obj ={};
      obj.type = this.select;
      obj.text = this.searchInput;
      this.asyncGetServiceByPage(obj);
    },
    eachPage() {
      let obj ={};
      obj.type = this.select;
      obj.text = this.searchInput;
      this.asyncGetServiceByPage(obj);
    }
  },
  methods: {
    ...mapActions("serivce", ["asyncGetServiceByPage","asyncDeleteService","asyncAddService","asyncSearchService"]),
    ...mapMutations("serivce", ["setCurPage","setEachPage"]),
    handleSizeChange(val) {
      console.log(123, val);
      this.setEachPage(val);
    },
    handleCurrentChange(val) {
      console.log(456, val);
      this.setCurPage(val);
    },
    deleteData(data){
        this.asyncDeleteService(data._id);
        this.asyncGetServiceByPage();
    },
    addService(){
      let obj ={};
      obj.serviceName = this.form.serviceName;
      obj.serviceType = this.form.serviceType;
      obj.serviceSchedule = `${this.startTime}-${this.endTime}`;
      obj.serviceCanFor = this.form.serviceCanFor;
      obj.serviceDetial = this.form.serviceDetial;
      obj.serviceTime = this.form.serviceTime;
      obj.serviceLevel = this.form.serviceLevel;
      obj.servicePrice = this.form.servicePrice;
      this.asyncAddService(obj);
      for(let key in this.form){
        this.form[key] =""
      }
      this.startTime ="",
      this.endTime="",
      this.asyncGetServiceByPage();
      this.dialogFormVisible = false;
    },
    searchService(){
      let obj ={};
      obj.type = this.select;
      obj.text = this.searchInput;
      this.asyncSearchService(obj)
      // this.searchInput = "";
      // this.select ="";
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
.type .el-input{
    width: 350px;
}

.dialogService .el-dialog__header{
    width: 100px;
    height: 40px;
    line-height: 40px;
    margin: auto;
}
.dialogService .el-dialog__footer{
    width: 200px;
    height: 80px;
    line-height: 80px;
    margin: auto;
}
</style>
