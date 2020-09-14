const router = require('express').Router()
const db = require('./mysql')

//拦截登录
router.post('/login',(req,res)=>{
    let user = req.body.user
    let mima = req.body.pwd
    let sql = 'SELECT * FROM t_user WHERE username=? AND pwd=?';
    db.query(sql,[user,mima],(err,data)=>{
        if(err) {
            res.send({code:500,msg:'数据库错误'})
        }else {
            if(data.length>0) {
                // res.send('<script>alert("登录成功");location.href="1.html"</script>')
                res.send({code:200,msg:'登陆成功',userInfo:data[0]})
            }else {
                res.send({code:200,msg:'用户名或密码错误'})
            }
        }
    })
})
//获取学生列表数据
router.get('/students',(req,res)=>{
    let sql = 'select * from students'
    db.query(sql,[],(err,data)=>{
        if(err){
            res.send({code:500,message:'数据库出错，请联系管理员'})
        }else {
            res.send({code:200,data:data})
        }
    })
})

//删除
router.get('/del',(req,res)=>{
    let id = req.query.id
    console.log(id);
    let sql = 'delete from students where ids=?';
    db.query(sql,[id],(err,data)=>{
        if(err){
            res.send({code:500,msg:'数据库出错'})
        }else{
           if(data.affectedRows>0) {
               res.send({code:200,msg:'删除成功'})
           }else{
               res.send({code:200,msg:'删除失败'})
           }
        }
    })
})
//查询
router.get('/search',(req,res)=>{
    let id = Number(req.query.id)
    
    console.log(id);
    //前端传来的id值没的时候就是相当于查询所有的数据 返回给前端的数据就不能是单个值
    if(id==0){
      let sql = 'select * from students'
      db.query(sql,[],(err,data)=>{
        if(err){
            res.send({code:500,msg:'数据库出错，请联系管理员'})
            console.log(err);
        }else{
            if(data.length>0){
                res.send({code:200,msg:'查到该数据',data:data})
            }else{
                res.send({code:200,msg:'没有该数据'})
            }
        }
    })
    }else{
        let sql = 'select * from students where ids=?'
        db.query(sql,[id],(err,data)=>{
            if(err){
                res.send({code:500,msg:'数据库出错，请联系管理员'})
                console.log(err);
            }else{
                if(data.length>0){
                    res.send({code:200,msg:'查到该数据',data:data})
                }else{
                    res.send({code:200,msg:'没有该数据'})
                }
            }
        })
    }
  
})

//添加
router.get('/add',(req,res)=>{
    let id = req.query.id
    let name = req.query.name
   let addr = req.query.addr
   let tel = req.query.tel
   let sex = req.query.sex
   let sql = 'insert into students(ids,classid,stuName,sex,address,tel) values(?,1,?,?,?,?)'
   db.query(sql,[id,name,sex,addr,tel],(err,data)=>{
       if(err){
           console.log(err);
           res.send({code:500,msg:'数据库操作有误，请联系管理员'})
       }else{
           if(data.affectedRows>0){
            res.send({code:200,msg:'增加成功'})
           }else{
               res.send({code:200,msg:'增加失败'})
           }
           

       }
   })
})
// 修改
router.get('/edit',(req,res)=>{
    let id = req.query.id
    let tel = req.query.tel
    let addr = req.query.addr
    console.log(id);
    // console.log();
    let sql = `update students set tel=${tel},address='${addr}' where ids=${Number(id)}`
    // let sql = 'updata students set classid=?,address=? where=?'
    db.query(sql,(err,data)=>{
        if(err){
            console.log(err);
            res.send({code:500,msg:'数据库出错，请联系管理员'})
        }
        else{
           if(data.affectedRows>0){
               res.send({code:200,msg:'修改成功'})
           }else{
               res.send({code:200,msg:'更新失败'})
           }
        }
    })

})
module.exports=router