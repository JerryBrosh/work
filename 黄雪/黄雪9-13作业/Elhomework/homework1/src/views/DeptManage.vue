<template>
  <div>
      <!-- 面包屑 -->
      <div>
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">部门管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 操作 -->
    <div class='dept'>
        <el-card>
          <el-button type="warning" @click="dialogFormVisible = true">添加部门</el-button>
        </el-card>
        

        <!-- 添加弹出框 -->
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
            <el-button type="warning" @click="addDept">确 定</el-button>
        </div>
        </el-dialog>
        <!-- 修改弹出框 -->
         <el-dialog title="修改部门" :visible.sync="dialogFormEditVisible">
        <el-form :model="editform">
            <el-form-item label="部门名称" >
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门描述" >
            <el-input v-model="form.descript" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" >
              <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="warning" @click="addDept">确 定</el-button>
        </div>
        </el-dialog>
    </div>
      <!-- 列表 -->
       <el-table
        :data="deptData"
        style="width: 100%"
        height="500">
        <el-table-column
        fixed
        prop="DeptNo"
        label="部门"
        width="150">
        </el-table-column>
        <el-table-column
        prop="DeptName"
        label="部门名称"
        width="120">
        </el-table-column>
        <el-table-column
        prop="DeptDescript"
        label="部门描述"
        width="120">
        </el-table-column>
        <el-table-column
        prop="Status"
        :formatter="StatusHandler"
        label="部门状态"
        width="300">
        </el-table-column>
        <el-table-column
        prop="CreateDate"
        :formatter="DateHandler"
        label="创建时间"
        width="120">
        </el-table-column>
         <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click='edit(scope.row)'></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click='del(scope.row.DeptNo)'></el-button>
        </template>
         </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
    name: 'DeptManage',
    data(){
        return{
          deptData: [],
          dialogFormVisible: false,
          dialogFormEditVisible:false,
          form:{
            name:'',
            descript:''
          }
        }
    },
    created:function(){
        this.getDeptList()
    }, 
    methods: {
      DateHandler:function(row){
        return new Date(row.CreateDate).toLocaleDateString()
      },
      StatusHandler:function(row){
        return row.Status===1?'有效':'无效'
      },
      addDept:function () {
          //1.传递数据到服务器进行添加
          //2.接收服务器响应
          //3.添加对话框取消
          this.$axios.post('/api/addDept',{deptName:this.form.name,deptDescript:this.form.descript})
          .then((response)=>{
            var result = response.data;
            if(result.code===200){
                this.$alert(result.message)
                if(result.message==='添加成功'){
                    this.getDeptList()
                }
                this.dialogFormVisible = false
            }else{
                this.$alert(result.message)
            }
          })
          .catch(()=>{
              this.$alert('请求出错')
          })
      },
      getDeptList:function(){
          //发送到后端请求数据
        this.$axios.post('api/deptList').then((Response)=>{
            var result=Response.data;
            if(result.code===200){
                this.deptData=result.data;
            }else{
                this.$confirm(result.message, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                })
            }
        })
      },
      del:function(deptNo){
          console.log(deptNo);
          //发起一个请求到服务器，进行删除事件
          this.$axios.get('/api/delDept',{
              params: {
                deptNob:deptNo  
              }
          }).then((response)=>{
              var result=response.data
                if(result.message==='删除成功'){
                   this.getDeptList()   
                }else{
                  this.$alert(result.message)
              }
          }).catch(()=>{
              this.$alert('请求出错，请检查')
          })
      },
      edit:function(){

      }
    }
}
</script>

<style scope>
  .dept .el-card{
      text-align: left;
      margin-top: 20px;
  }
</style>