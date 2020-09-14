/**
 * Created by VULCAN on 2020/8/25.
 */
const mysql=require('mysql');
function DbOper(sql,param,callback){
    const conn=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        port:3306,
        database:'manage'
    });
    conn.connect();
    conn.query(sql,param,callback);
    conn.end();
}
module.exports={
    query:DbOper
};