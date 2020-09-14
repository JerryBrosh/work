<template>
  <div class="dept">
    <!--面包屑-->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">部门管理</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--操作-->
    <div>
      <el-card>
        <el-button type="primary" @click="dialogFormVisible = true">添加部门</el-button>
      </el-card>
    </div>
    <!--表格-->
      <el-table
          :data="deptData"
          height="550"
          border
          style="width: 100%">
        <el-table-column
           type="selection"
            width="50">
        </el-table-column>
        <el-table-column
            prop="DeptNo"
            label="部门编号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="DeptName"
            label="部门名称">
        </el-table-column>
        <el-table-column
            prop="DeptDescript"
            label="部门描述">
        </el-table-column>
        <el-table-column
            label="状态">
          <template slot-scope="scope">
            <span class="scope.row.Status===1? 'statusActive':'statusDel'">{{ scope.row.Status===1? '有效':'无效' }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="CreateDate"
            :formatter="DateHander"
            label="创建时间">
        </el-table-column>
        <el-table-column
            label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle ></el-button>
<!--            <el-button type="danger" icon="el-icon-delete" circle @click="del"></el-button>-->
          </template>
        </el-table-column>
      </el-table>
    <!--对话框-->
    <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="部门名称" >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" >
          <el-input v-model="form.descript" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDept">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
name: "DeptManage",
  data () {
  return {
    deptData: [],
    dialogFormVisible:false,
    form:{
      name:'',
      descript:''
    }
    }
  },
  created:function (){
    this.getDeptList()
  },
  methods: {
    DateHander: function(row) {
      return new Date(row.CreateDate).toLocaleString();
    },
    addDept: function (){
      this.$axios.post('/api/addDept',{deptName:this.form.name,deptDescipt:this.form.descript})
      .then((res)=>{
        var result = res.data;
        if(result.code===200){
          this.$alert(result.message)
          if(result.message==='添加成功'){
            this.getDeptList();
          }
          this.dialogFormVisible=false;
        }else {
          this.$alert(result.message)
        }
      }).catch(()=>{
        this.$alert('请求出错')
      })

    },
    getDeptList: function () {
      this.$axios.post('/api/deptList')
          .then((res)=>{
            var result=res.data;
            if(result.code===200){
              this.deptData=result.data;
            }else {
              this.$alert(result.message);
            }
          }).catch(()=>{

      })
    }
  }
}
</script>

<style scoped>
.dept .el-card{
  margin: 20px 0;
  text-align: left;
}
.statusActive{
  padding: 5px 10px;
  color: white;
  background-color: green;
}
.statusDel{
  padding: 5px 10px;
  color: white;
  background-color: red;
}
</style>