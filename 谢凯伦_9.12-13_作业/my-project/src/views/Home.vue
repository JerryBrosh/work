<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6">
            <h3>北海敬老院管理平台</h3>
          </el-col>
          <el-col :span="12"><p></p></el-col>
          <el-col :span="6">
            <p>xie</p>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <LeftMenu/>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>
      <p>2020.北海敬老院管理平台</p>
    </el-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import LeftMenu from "./../components/LeftMenu";
export default {
  name: "Home",
  components: {
    LeftMenu
  }
};
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  height: 60px;
  line-height: 60px;
}
.el-menu{
  background-color: #1570A6;
}
.el-header .el-col {
  height: 60px;
  line-height: 60px;
}
el-header .el-col p{
  text-align: right;
}

.el-footer{
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  min-height: 800px;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
}

body > .el-container {
  margin-bottom: 40px;
}
</style>