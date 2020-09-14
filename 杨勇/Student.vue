<template>
  <div>
    <header>
      <el-breadcrumb class="nav" separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/student'}">学生列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/class'}">学生班级表</el-breadcrumb-item>
        <el-breadcrumb-item>教室表</el-breadcrumb-item>
        <el-breadcrumb-item>教师表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="btn" type="primary" @click="dialogFormadd = true">添加</el-button>
      <el-form class="sousuo" :model="searchform" label-width="80px">
          <el-form-item label="">
              <el-input class="sreach" v-model="searchform.ids" placeholder="根据学号搜索"></el-input>
              <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
      </el-form>
    </header>
    <el-table
    :data="tableData"
    stripe
    style="width: 100% height: 100%;"
    @selection-change="handleSelectionChange">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="ids"
      label="学号"
      width="180">
    </el-table-column>
     <el-table-column
      prop="stuName"
      label="姓名"
      width="180">
    </el-table-column>
      <el-table-column
      prop="sex"
      label="性别"
      width="180">
    </el-table-column>
     <el-table-column
      prop="tel"
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
         <el-button type="primary" @click="del(scope.row.ids)">删除</el-button>
      <el-button type="primary" @click="edit(scope.row)">修改</el-button>
      </template>
    </el-table-column>
    </el-table>
  <!-- 修改的对话框 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="学号" :label-width="formLabelWidth">
      <el-input v-model="form.ids" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.stuName" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.tel" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别" :label-width="formLabelWidth">
      <el-select v-model="form.sex">
        <el-option label="男" value="form.sex"></el-option>
        <el-option label="女" value="form.sex"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="地址" :label-width="formLabelWidth">
      <el-input v-model="form.address" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </div>
    </el-dialog>
<!-- 添加对话框 -->
    <el-dialog title="添加信息" :visible.sync="dialogFormadd">
  <el-form :model="addform">
    <el-form-item label="学号" :label-width="formLabelWidth">
      <el-input v-model="addform.ids" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="addform.stuName" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="addform.tel" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别" :label-width="formLabelWidth">
      <el-select v-model="addform.sex">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="地址" :label-width="formLabelWidth">
      <el-input v-model="addform.address" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormadd = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </div>
    </el-dialog>
 </div>
</template>

<script>
    export default {
        name:"Student",
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                dialogFormadd:false,
                searchform:{
                    ids:''
                },
                addform:{
                    ids: '',
                    stuName: '',
                    tel: '',
                    sex: '',
                    address: '',
                },
                form: {
                    ids: '',
                    stuName: '',
                    tel: '',
                    sex: '',
                    address: '',
                    type: [],
                    resource: '',
                    desc: ''
                    },
                formLabelWidth: '120px'
                }
        },
        created() {
            this.getstudent()
        },
  methods: {
    open() {
                this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
                dangerouslyUseHTMLString: true
                });
            },
    //删除
    del(row) {
                console.log(row);
                this.$http.get('/api/del',{params:{id:row}}).then(res=>{
                    if(res.data.msg=='删除成功'){
                        this.$alert(res.data.msg)
                        this.getstudent()
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
    edit(row) {
                this.dialogFormVisible=true
                this.form.ids = row.ids
                this.form.stuName = row.stuName
                this.form.tel = row.tel
                this.form.sex = row.sex
                this.form.address = row.address
            },
    //请求数据
    getstudent() {
                   this.$http.get('/api/students').then(res=>{
                    let data = res.data.data
                    this.tableData = data
                    }).catch(err=>{
                        console.log(err);
                    })
            },
    handleSelectionChange(val) {
                this.multipleSelection = val;
            },
    save() {
                this.$http.get('/api/edit',{params:{id:this.form.ids,tel:this.form.tel,addr:this.form.address}}).then(res=>{
                    let data = res.data
                    if(data.msg=='修改成功'){
                       this.getstudent() 
                       this.dialogFormVisible=false
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
    add() {
          this.dialogFormadd=false
          this.$http
        .get("/api/add",{ params: 
        {   id: this.addform.ids,
            name: this.addform.stuName,
            addr: this.addform.address,
            tel: this.addform.tel,
            sex: this.addform.sex
          }
        })
        .then(res => {
          let data = res.data;
          if (data.msg == "增加成功") {
            this.getstudent();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
//搜索
    search() {
      this.$http
        .get("/api/search", { params: { id: this.searchform.ids } })
        .then(res => {
          let data = res.data;
          // let arr = []
          if (data.code == 500) {
            this.$alert(data.msg);
          } else if (data.code == 200) {
            if (data.msg == "查到该数据") {
              //如果搜索框的内容没有的话点击搜索返回的是一个数组就可以直接赋值给显示的数据----判断条件为数据长度是否有值
              if (data.data.length) {
                this.tableData = data.data;
              } else {
                // arr.push(data.data)
                // this.tableData=arr
                this.tableData = data.data;
              }
            } else {
              this.tableData = [];
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 40px;
  .nav {
    display: inline-block;
  }
  .btn {
    display: inline-block;
    margin-left: 400px;
  }
  .sousuo {
    display: inline-block;
    margin-left: 220px;
  }
}
.sreach {
  display: inline-block;
  width: 150px;
}
</style>
