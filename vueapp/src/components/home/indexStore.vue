<template>
    <el-container>
        <el-header style="height:100px;">爱宠邦门店管理系统</el-header>
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                    <el-col :span="24">
                        <el-menu router default-active="1" class="el-menu-vertical-demo">
                            <!-- <el-menu-item index="1">
                                <i class="el-icon-menu"></i>
                                <span slot="title">门店申请</span>
                            </el-menu-item> -->
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>门店管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="1-1">门店列表</el-menu-item>
                                    <el-menu-item index="1-2">门店申请</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-menu-item index="/indexStore/theorder">
                                <i class="el-icon-sold-out"></i>
                                <span slot="title">订单管理</span>
                            </el-menu-item>
                            <el-menu-item index="3">
                                <i class="el-icon-goods"></i>
                                <span slot="title">商品管理</span>
                            </el-menu-item>
                            <el-menu-item index="/indexStore/serivce">
                                <i class="el-icon-setting"></i>
                                <span slot="title">服务管理</span>
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
<style>
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

