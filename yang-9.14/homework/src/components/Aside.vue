<template>
  <div>
    <el-menu router :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>学生管理
        </template>
        <el-menu-item index="/student">学生列表</el-menu-item>
        <el-menu-item index="/class">学生班级表</el-menu-item>
        <el-menu-item index="1-3">教室表</el-menu-item>
        <el-menu-item index="1-4">教师表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside"
};
</script>

<style lang="scss" scoped>
.el_menu {
  background-color: slategray;
  color: black;
}
</style>
