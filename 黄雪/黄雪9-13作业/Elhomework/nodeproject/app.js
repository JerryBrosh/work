//引用模块
const myexpress = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = myexpress();
//配置

// bodyparser 的配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//定义接口
app.post("/userLogin",function(request,response){
    //1.接收用户的传递参数
var username=request.body.UserName;
var pwd=request.body.Pwd;
//去数据库进行验证，返回相应的结果给要用户
//创建数据库连接
var connet=mysql.createConnection({
    host:"localhost",
    user:'root',
    pwd:'',
    database:'manage'
})
//3.打开连接
connet.connect();
connet.query('SELECT * FROM staff WHERE StaffName=? AND Pwd=?',[username,pwd],function(err,data){
    if(err){
        console.log(err);
        response.send({code:500,message:'数据库出错'})
    }else{
        if(data.length>0){
            response.send({code:200,message:"登录成功",staffInfo:data[0]})
        }else{
            response.send({code:200,message:"用户名或密码错误"})            }
    }
})
connet.end();
});
//部门列表
app.post("/deptList",function(request,response){
    //1.接收用户的传递参数
var username=request.body.UserName;
var pwd=request.body.Pwd;
//去数据库进行验证，返回相应的结果给要用户
//创建数据库连接
var connet=mysql.createConnection({
    host:"localhost",
    user:'root',
    pwd:'',
    database:'manage'
})
//3.打开连接
connet.connect();
connet.query('SELECT * FROM department',[],function(err,data){
    if(err){
        console.log(err);
        response.send({code:500,message:'数据库出错'})
    }else{
        response.send({code:200,data:data})
        // if(data.length>0){
        //     response.send({code:200,message:"登录成功",staffInfo:data[0]})
        // }else{
        //     response.send({code:200,message:"用户名或密码错误"})            }
    }
})
connet.end();
});
//添加部门列表
app.post("/addDept",function(request,response){
    //1.接收用户的传递参数
var deptName=request.body.deptName;
var descipt=request.body.deptDescript;
//去数据库添加部门
//创建数据库连接
var connet=mysql.createConnection({
    host:"localhost",
    user:'root',
    pwd:'',
    database:'manage'
})
//3.打开连接
connet.connect();
connet.query('insert into department(DeptName,DeptDescript) values(?,?)',[deptName,descipt],function(err,data){
    if(err){
        console.log(err);
        response.send({code:500,message:'数据库出错'})
    }else{
        //添加，删除，修改都是对行数的影响 
        if(data.affectedRows>0){
            response.send({code:200,message:"添加成功"})
        }else{
            response.send({code:200,message:"添加失败"})            }
    }
})
connet.end();
});
app.get('/delDept',function(request,response){
    //1.接收用户的传递参数
    var deptNo=request.query.deptNob;
    console.log(deptNo);
    //去数据库添加部门
    //创建数据库连接
    var connet=mysql.createConnection({
        host:"localhost",
        user:'root',
        pwd:'',
        database:'manage'
    })
    //3.打开连接
    connet.connect();
    connet.query('update department set status=0 where DeptNo=?',[deptNo],function(err,data){
        if(err){
            console.log(err);
            response.send({code:500,message:'数据库出错'})
        }else{
            //添加，删除，修改都是对行数的影响 
            if(data.affectedRows>0){
                response.send({code:200,message:"删除成功"})
            }else{
                response.send({code:200,message:"删除失败"})            }
        }
    })
    connet.end();

})
app.use(myexpress.static(__dirname+"/public"));
app.listen(8888);
console.log("服务启动")
