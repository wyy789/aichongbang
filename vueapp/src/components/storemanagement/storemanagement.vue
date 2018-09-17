<template>
    <div>
        <div style="margin-top: 10px;">
            <el-input placeholder="请输入内容" v-model="input">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="名称" value="shopName"></el-option>
                    <el-option label="法人" value="shopCorporate"></el-option>
                    <el-option label="地址" value="shopAdd"></el-option>
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
            <el-table-column prop="shopEmployee" label="店员属性" width="150">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status=='未审核'" @click.native.prevent="examine(scope.row)" type="text" size="small">
                        审核
                    </el-button>
                    <el-button @click="Update(scope.row)" type="text" size="small">
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
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
        ...mapState("storemanagement", ["rows"])
    },
    methods: {
        ...mapActions("storemanagement", [
            "ansycgetStore",
            "asyncstoreExamine",
            "asyncstoreUpdate",
            "ansycsearch"
        ]),
        ...mapMutations("storemanagement", ["getstoreList", "storeExamine"]),
        search(){
            // console.log(this.select,this.input)
            this.ansycsearch({
                type:this.select,
                value:this.input
            })
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
        } //修改
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

