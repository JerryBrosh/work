/**
 * Created by VULCAN on 2020/8/25.
 */
const myexpress=require('express');
// const favicon=require('serve-favicon');
const logger=require('morgan');
const bodyParser=require('body-parser');
const db=require('./router/sqlHelp');

// const userRouter=require('./router/userRouter');
// const productRouter=require("./router/producRouter");
const app=myexpress();

app.use(logger('dev'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(myexpress.static(__dirname+"/public"));
/*定义接口*/
app.post("/userLogin",((req, res) => {
    var username=req.body.UserName;
    var pwd = req.body.pwd

    sql="select * from staff where StaffName=? and Phone=?";
    db.query(sql,[username,pwd],function(err,data){
        if(err){
            res.send({code:500,message:"数据库出错，请联系管理员"});
        }else{
            if(data.length>0){
                // req.session.user=user;
                // req.session.headImage=data[0].HeadImage;
                // req.session.info=data[0];
                res.send({code:200,message:"登录成功",data:data});
            }else{
                res.send({code:201,message:"用户名或密码错误"});
            }
        }

    })
}))
/*部门管理*/
app.post("/deptList",((req, res) => {

    sql="select * from department ";
    db.query(sql,[],function(err,data){
        if(err){
            res.send({code:500,message:"数据库出错，请联系管理员"});
        }
        else{
                res.send({code:200,data:data});
        }

    })
}))
/*添加部门*/
app.post("/addDept",((req, res) => {
    var deptname=req.body.deptName;
    var descipt =req.body.deptDescipt;
    sql="insert into department(DeptName,DeptDescript) value(?,?)";
    db.query(sql,[deptname,descipt],function(err,data){
        if(err){
            res.send({code:500,message:"数据库出错，请联系管理员"});
        }
        else{
            if(data.affectedRows>0){
                res.send({code:200,message:"添加成功"});
            }else {
                res.send({code:200,message:"添加失败"});
            }

        }

    })
}))
// app.use(userRouter);
//
// app.use(productRouter);

// app.use(myexpress.static(__dirname+"/public"));
// app.use(favicon(__dirname+'/public/favicon.ico'));



app.listen(5555);
console.log("服务启动");