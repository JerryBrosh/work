<template>
  <el-card class="container">
    <h3>简简单单的一个小作业系统</h3>
    <p>登录</p>
    <el-form
      class="form"
      :label-position="labelPosition"
      label-width="80px"
      :model="form"
    >
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        name: "",
        pwd: ""
      }
    };
  },
  methods: {
    login() {
      if (this.form.name.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入用户名",
          type: "warning"
        });
      } else if (this.form.pwd.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入密码",
          type: "warning"
        });
      } else {
        this.$http
          .post("/api/login", { user: this.form.name, pwd: this.form.pwd })
          .then(res => {
            let data = res.data;
            if (data.msg == "登陆成功") {
              this.$alert(data.msg);
              this.$router.push("home");
            } else {
              this.$alert(data.msg);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.console.error("登录出错");
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 800px;
  margin: 50px auto;
  font-size: 20px;
  text-align: center;
  .form {
    margin-top: 8px;
  }
}
</style>
