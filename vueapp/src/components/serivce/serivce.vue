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
    
    style="width: 100%">
    <el-table-column
      fixed
      prop="serviceName"
      label="名称"
      
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="serviceType"
      label="类别"
      
      align="center">
    </el-table-column>
    <el-table-column
      prop="serviceSchedule"
      label="排期"
      
      align="center">
    </el-table-column>
    <el-table-column
      prop="serviceCanFor"
      label="适用规格"
      
      align="center">
    </el-table-column>
    <el-table-column
      prop="serviceDetial"
      label="服务规格"
      
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="serviceTime"
      label="耗时(分钟)"
      
      align="center">
    </el-table-column>    
    <el-table-column
      prop="serviceLevel"
      label="服务员等级"
      
      align="center">
    </el-table-column>
    <el-table-column
      prop="servicePrice"
      label="价格(元)"
      
      align="center">
    </el-table-column>
    <el-table-column
      label="操作"
      
      align="center">
      <template slot-scope="scope">
        <el-button @click="putDialog(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="open(scope.row)" type="text" size="small">删除</el-button>
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

<!-- 修改 -->
<el-dialog title="修改服务" :visible.sync="putDialogFormVisible" center class="dialogService">
    <el-form :model="formPut">
        <el-form-item label="服务名称" :label-width="formLabelWidth">
            <el-input v-model="formPut.serviceName" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" :label-width="formLabelWidth" class="type">
            <el-select v-model="formPut.serviceType" placeholder="请选择服务类型">
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
              v-model="startTimePut"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }">
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="endTimePut"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: startTimePut
              }">
            </el-time-select>
        </el-form-item>
        <el-form-item label="适用规格" :label-width="formLabelWidth">
            <el-input v-model="formPut.serviceCanFor" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="服务规格" :label-width="formLabelWidth">
            <el-input v-model="formPut.serviceDetial" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="耗时(分钟)" :label-width="formLabelWidth">
            <el-input v-model="formPut.serviceTime" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="服务员等级" :label-width="formLabelWidth">
            <el-input v-model="formPut.serviceLevel" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)" :label-width="formLabelWidth">
            <el-input v-model="formPut.servicePrice" auto-complete="off" style="width:350px"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="putDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="putData">确 定</el-button>
    </div>
</el-dialog>

<el-dialog
  title="警告"
  :visible.sync="timeDialogVisible"
  width="30%">
  <span>耗时不能超过排期时间</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="timeDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "getService",
  data() {
    return {
      searchInput: "",
      select: "",
      startTime: "",
      endTime: "",
      startTimePut: "",
      endTimePut: "",
      dialogFormVisible: false,
      putDialogFormVisible: false,
      timeDialogVisible: false,
      form: {
        serviceName: "",
        serviceType: "",
        serviceCanFor: "",
        serviceDetial: "",
        serviceTime: "",
        serviceLevel: "",
        // delivery: false,
        servicePrice: ""
      },
      formPut: {
        serviceName: "",
        serviceType: "",
        serviceCanFor: "",
        serviceDetial: "",
        serviceTime: "",
        serviceLevel: "",
        // delivery: false,
        servicePrice: ""
      },
      formLabelWidth: "120px"
    };
  },
  async created() {
    await this.asyncSession();
    await this.asyncGetServiceByPage();
  },
  computed: {
    ...mapState("serivce", ["curPage", "eachPage", "maxpage", "total", "rows"])
  },

  methods: {
    ...mapActions("serivce", [
      "asyncGetServiceByPage",
      "asyncDeleteService",
      "asyncAddService",
      "asyncSearchService",
      "asyncPutService",
      "asyncSession"
    ]),
    ...mapMutations("serivce", ["setCurPage", "setEachPage"]),
    handleSizeChange(val) {
      this.setEachPage(val);
      let obj = {};
      obj.type = this.select;
      obj.text = this.searchInput;
      this.asyncGetServiceByPage(obj);
    },
    handleCurrentChange(val) {
      this.setCurPage(val);
      let obj = {};
      obj.type = this.select;
      obj.text = this.searchInput;
      this.asyncGetServiceByPage(obj);
    },
    addService() {
      let obj = {};
      if (!this.startTime) {
        this.startTime = "08:30";
      }
      if (!this.endTime) {
        this.endTime = "18:30";
      }
      let firstHour = parseInt(this.startTime.split(":")[0]);
      let finishHour = parseInt(this.endTime.split(":")[0]);
      let firstMinute = parseInt(this.startTime.split(":")[1]);
      let finishMinute = parseInt(this.endTime.split(":")[1]);
      let needTime = parseInt(this.form.serviceTime);
      let period = (finishHour - firstHour) * 60 + (finishMinute - firstMinute);
      if (period < needTime) {
        this.timeDialogVisible = true;
      } else {
        Object.assign(obj, this.form, {
          serviceSchedule: `${this.startTime}-${this.endTime}`
        });
        this.asyncAddService(obj);
        for (let key in this.form) {
          this.form[key] = "";
        }
        this.startTime = "";
        this.endTime = "";
        this.asyncGetServiceByPage();
        this.dialogFormVisible = false;
      }
    },
    searchService() {
      let obj = {};
      obj.type = this.select;
      obj.text = this.searchInput;
      obj.curPage = 1;
      this.asyncSearchService(obj);
      // this.searchInput = "";
      // this.select ="";
    },
    //修改
    putDialog(row) {
      this.putDialogFormVisible = true;
      if (!this.startTimePut) {
        this.startTimePut = "08:30";
      }
      if (!this.endTimePut) {
        this.endTimePut = "18:30";
      }
      let times = row.serviceSchedule.split("-");
      this.startTimePut = times[0];
      this.endTimePut = times[1];
      Object.assign(this.formPut, row);
      this.id = row._id;
    },
    putData() {
      let obj = {};
      if (!this.startTimePut) {
        this.startTimePut = "08:30";
      }
      if (!this.endTimePut) {
        this.endTimePut = "18:30";
      }
      let firstHour = parseInt(this.startTimePut.split(":")[0]);
      let finishHour = parseInt(this.endTimePut.split(":")[0]);
      let firstMinute = parseInt(this.startTimePut.split(":")[1]);
      let finishMinute = parseInt(this.endTimePut.split(":")[1]);
      let needTime = parseInt(this.formPut.serviceTime);
      let period = (finishHour - firstHour) * 60 + (finishMinute - firstMinute);
      if (period < needTime) {
        this.timeDialogVisible = true;
      } else {
        Object.assign(obj, this.formPut, {
          serviceSchedule: `${this.startTimePut}-${this.endTimePut}`
        });
        this.asyncPutService(obj);
        this.asyncGetServiceByPage();
        this.putDialogFormVisible = false;
      }
    },
    //删除
    open(row) {
      this.$confirm("此操作将永久删除该服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.asyncDeleteService(row._id);
          this.asyncGetServiceByPage();
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
.serviceTable {
  line-height: 80px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.type .el-input {
  width: 350px;
}

.dialogService .el-dialog__header {
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin: auto;
}
.dialogService .el-dialog__footer {
  width: 200px;
  height: 80px;
  line-height: 80px;
  margin: auto;
}
</style>

