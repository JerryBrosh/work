<template>
  <div>
    <el-card class="box-card">
        <h1>w227幼儿园</h1>
        <h4>登录</h4>
        <el-form :label-position="labelPosition" label-width="80px" :model="user">
        <el-form-item label="用户名">
          <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.pwd" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userLogin">登录</el-button>
        </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  name:"Login",
  data: function() {
    return{
      labelPosition: "right",
      user: {
        username: "",
        pwd: ""
      }
    };
  },
  methods: {
    userLogin() {
     if (this.user.username.length === 0) {
      this.$message ({
          message: "请输入用户名",
          type: "warning"
        });
     } else if (this.user.pwd.length === 0) {
        this.$message({
          message: "请输入密码",
          type: "warning"
        });
     } else {
        //发起一个请求到服务器
        this.$axios.post('/api/userLogin', { UserName:this.user.username,Pwd:this.user.pwd })
        .then((data) => {
          if(data.data.message === '登录成功'){
            this.$router.push('Home')
          }else{
            this.$confirm(data.data.message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            })
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  }
};
</script>

<style>
.box-card {
  width: 560px;
  margin:100px auto;
  text-align: center;
}
</style>
