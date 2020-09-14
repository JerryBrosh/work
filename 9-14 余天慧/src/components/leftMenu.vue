<template>
  <div>
    <el-menu >
      <el-submenu index="1">
        <template slot="title" id="a"><i class="el-icon-message" ></i>基础管理</template>
        <el-menu-item index="1-1" class="b"><router-link to="/dept">部门管理</router-link></el-menu-item>
        <el-menu-item index="1-2" class="b">职工管理</el-menu-item>
        <el-menu-item index="1-3" class="b">班级管理</el-menu-item>
        <el-menu-item index="1-4" class="b">学生管理</el-menu-item>
        <el-menu-item index="1-5" class="b">数据导出</el-menu-item>
      </el-submenu>
      <el-menu-item index="2" class="a"><i class="el-icon-picture"></i> 照片墙 </el-menu-item>
      <el-menu-item index="3" class="a"><i class="el-icon-s-claim"></i>考勤管理</el-menu-item>
      <el-menu-item index="4" class="a"><i class="el-icon-s-grid"></i>公告管理</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    name:"leftMenu",
    data: function() {
      return { }
    }
  }
</script>
<style>
.b{
   background-color:#079992 ;
   color:white;
}
</style>