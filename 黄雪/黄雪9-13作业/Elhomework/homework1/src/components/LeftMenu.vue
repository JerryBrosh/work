<template>
  <div>
        <el-menu>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>基础管理</template>
          <el-menu-item index="1-1"><router-link to="/deptMange">部门管理</router-link></el-menu-item>
          <el-menu-item index="1-2">职工管理</el-menu-item>
          <el-menu-item index="1-3">班级管理</el-menu-item>
          <el-menu-item index="1-4">学生管理</el-menu-item>
          <el-menu-item index="1-5">数据导出</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>照片墙</template>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>考勤管理</template>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>公告管理</template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name:'LeftMenu',
  data: function () {
    return {}
  }
}
</script>

<style scoped>
  .el-menu{
    color: #fff;
  }
</style>