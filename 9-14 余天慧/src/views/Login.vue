<template>
  <div>
    <el-card class="box-card">
      <h1>内江师范幼儿学院</h1>
      <h4>登录</h4>
      <el-form :label-position="labelPosition" label-width="80px" :model="user">
        <el-form-item label="用户名">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('user')">登录</el-button>
          </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>
<script>
  export default{
    name:"",
    data:function() {
      return {
       labelPosition: 'right',
       user: {
         userName: '',
         pwd: ''
       }
       }
    },
    methods: {
      submitForm(user) {
        if(this.user.userName.length == 0) {
          this.$message({
            showClose: true,
            message: '请输入用户名',
            type: 'warning'
          });
        }else if(this.user.pwd.length == 0) {
          this.$message({
            showClose: true,
            message: '请输入密码',
            type: 'warning'
          });
        }else{
          this.$axios.post("/api/userLogin",{ userName:this.user.userName,pwd:this.user.pwd })
          .then((data)=> {
            if (data.data.message="登陆成功"){
              this.$alert(data.data.message);
              this.$router.push('home')
            } else{
              this.$alert(data.data.message);
            }
           })
          .catch((err)=> {
            console.log(err);
            this.$message.error("请求出错，请联系管理员")
          })
        }
      }
    }
  }
</script>
<style>
  .box-card{
    width:480px;
    margin:auto;
  }
  h1{
    color:#74b9ff;
  }
</style>