const mysql = require('mysql')

function DBoper(sql,param,callback) {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nodejs'
    })
    con.connect()
    con.query(sql,param,callback)
    con.end()
}

module.exports={
    query:DBoper
}