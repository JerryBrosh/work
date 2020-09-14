<template>
  <div class="home">
    <el-container>
      <el-header height="">
        <el-row>
          <el-col :span="6">
            <h3>简简单单小系统</h3>
          </el-col>
          <el-col :span="12"></el-col>
          <el-col :span="6">
            <p>admin</p>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <Aside />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer height="">
        <p>这是简简单单的小作业</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
export default {
  name: "Home",
  components: {
    Aside
  }
};
</script>
<style lang="scss">
.el-header {
  background-color: skyblue;
  color: #333;
  line-height: 60px;
  .el-col {
    height: 60px;
    p {
      text-align: right;
    }
  }
}
.el-main {
  max-height: 900px;
}
.el-aside {
  color: #333;
}
.el-footer {
  background-color: skyblue;
  height: 30px;
}
.el-footer p {
  line-height: 30px;
  text-align: center;
}
</style>
