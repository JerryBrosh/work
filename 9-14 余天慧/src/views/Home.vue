<template>
  <div id="homeBody">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6"><h2 class="headH2">内江师范幼儿学院</h2></el-col>
          <el-col :span="12"></el-col>
          <el-col :span="6"><p class="headP">daydayup</p></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px"><leftMenu /></el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import leftMenu from './../components/leftMenu.vue'

export default {
  name: "Home",
  components: {
    leftMenu
  }
};
</script>
<style>

.el-header, .el-footer {
    background-color:#0a3d62;
    color: #333;
    height:60px;
  }
  .el-header .el-col{
    height:60px;
    line-height:60px;
   }
   .el-header .el-col p{
      text-align:right;
   }
   .headH2,.headP{
    margin-top:0;
    color:white;
   }
  .el-aside {
    background-color: #0a3d62;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-menu{
    background-color:white !important;
  }
  .el-main {
    min-height:500px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>