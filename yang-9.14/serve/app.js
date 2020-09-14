const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const favicon = require('serve-favicon')
const myRouter = require('./router/user')

const app = express()
// 定义icon图标
app.use(favicon(__dirname + '/public/favicon.ico'));
// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(myRouter)
// 定义静态文件目录
app.use(express.static(__dirname+'/public'))

app.listen(3000)
console.log('服务启动成功');
