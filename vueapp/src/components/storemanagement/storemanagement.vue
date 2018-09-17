<template>
    <div>
        <div style="margin-top: 10px;">
            <el-input placeholder="请输入内容" v-model="input">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="名称" value="shopName"></el-option>
                    <el-option label="法人" value="shopCorporate"></el-option>
                    <el-option label="地址" value="shopAdd"></el-option>
                    <el-option label="审核状态" value="status"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>
        <el-table :data="rows" style="width: 100%" max-height="500" class="tab">
            <el-table-column fixed prop="shopName" label="名称" width="100%">
            </el-table-column>
            <el-table-column prop="shopLicenceNum" label="营业执照号码" width="150">
            </el-table-column>
            <el-table-column prop="shopLicenceImg" label="营业执照图片" width="150">
            </el-table-column>
            <el-table-column prop="shopAdd" label="营业地址" width="150">
            </el-table-column>
            <el-table-column prop="shopLocation" label="定位" width="150">
            </el-table-column>
            <el-table-column prop="shopCorporate" label="法人" width="150">
            </el-table-column>
            <el-table-column prop="shopTel" label="联系电话" width="150">
            </el-table-column>
            <el-table-column prop="shopImg" label="头图" width="150">
            </el-table-column>
            <el-table-column prop="shopFeature" label="特色" width="150">
            </el-table-column>
            <el-table-column prop="status" label="状态" :filters="[{ text: '未审核', value: '未审核' }, { text: '已审核', value: '已审核' }]" :filter-method="filterTag" filter-placement="bottom-end">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="primary" round v-if="scope.row.status=='未审核'" @click.native.prevent="examine(scope.row)" size="small">
                        审核
                    </el-button>
                    <el-button type="primary" round @click="Update(scope.row)" size="small">
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top:15px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curpage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <div>
                <div>
                    <el-input placeholder="请输入内容" v-model="form.shopName" clearable style="">
                        <template slot="prepend">名称</template>
                    </el-input>
                </div>
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="form.shopAdd" clearable>
                        <template slot="prepend">地址</template>
                    </el-input>
                </div>
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="form.shopLocation" clearable>
                        <template slot="prepend">定位</template>
                    </el-input>
                </div>
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="form.shopCorporate" clearable>
                        <template slot="prepend">法人</template>
                    </el-input>
                </div>
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="form.shopTel" clearable>
                        <template slot="prepend">电话</template>
                    </el-input>
                </div>
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="form.shopFeature" clearable>
                        <template slot="prepend">特色</template>
                    </el-input>
                </div>

            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
    mounted() {
        this.ansycgetStore();
    },
    computed: {
        ...mapState("storemanagement", [
            "curpage",
            "eachpage",
            "rows",
            "maxpage",
            "total"
        ])
    },
    methods: {
        ...mapActions("storemanagement", [
            "ansycgetStore",
            "asyncstoreExamine",
            "asyncstoreUpdate",
            "ansycsearch"
        ]),
        ...mapMutations("storemanagement", [
            "getstoreList",
            "storeExamine",
            "setCurpage",
            "setEachpage",
            "homePage",
            "lastPage",
            "upPage",
            "dnPage"
        ]),
        filterTag(value, row) {
            console.log(value, row);
            return row.status === value;
        },
        search() {
            // console.log(this.select,this.input)
            this.ansycsearch({
                curpage: 1,
                eachpage: this.eachpage,
                type: this.select,
                value: this.input
            });
        },
        confirm() {
            this.asyncstoreUpdate(this.form);
            this.ansycgetStore();
            this.dialogFormVisible = false;
        },
        examine(rows) {
            this.asyncstoreExamine(rows._id);
            console.log(rows._id);
            this.ansycgetStore();
        }, //审核
        Update(rows) {
            console.log(rows);

            this.dialogFormVisible = true;
            Object.assign(this.form, rows);
        }, //修改
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.setEachpage(val);
            this.ansycgetStore({
                type: this.select,
                value: this.input
            });
        },
        handleCurrentChange(val) {
            this.setCurpage(val);
            this.ansycgetStore({
                type: this.select,
                value: this.input
            });
            console.log(`当前页: ${val}`);
        }
    },
    data() {
        return {
            input: "",
            select: "",
            dialogFormVisible: false,
            form: {
                _id: "",
                shopName: "",
                shopAdd: "",
                shopLocation: "",
                shopCorporate: "",
                shopTel: "",
                shopFeature: ""
            }
        };
    }
};
</script>

<style>
.el-select .el-input {
    width: 130px;
}
.tab {
    margin-top: 20px;
}
.tab th > div {
    text-align: center;
}
</style>

