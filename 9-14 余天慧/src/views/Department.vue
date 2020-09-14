<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">部门管理</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table
          :data="depData"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            prop="DepNo"
            label="部门编号">
          </el-table-column>
          <el-table-column
            prop="DepName"
            label="部门名称">
          </el-table-column>
          <el-table-column
            prop="DepDescript"
            label="部门描述">
          </el-table-column>
          <el-table-column
            prop="Satus"
            label="部门状态">
          </el-table-column>
           <el-table-column
            prop="CreateDate"
            label="创建日期">
          </el-table-column>
          <el-table-column
            label="操作">
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
  export default{
    name:"Dept",
    data:function() {
      return {
        depData: []
      }
    },
    mounted: function() {
      this.$axios.post('/api/deptList')
        .then (response=> {
          var result = response.data
          console.log(result);
          if (result.code==200){
            this.depDate=result.data;
          }else{
            this.$alert(result.message);
          }
      })
      .catch(()=>{ })
    }
  }
</script>
<style>
.cell{
  height:50px;
  text-align:center;
}
.el-table-column{
  height:50px !important;
}
</style>