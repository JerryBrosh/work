

var user = []


var curentpage = 1;     //当前页
var persize = 3;       //一页的显示数据
var total;   //总页数

$(function() {
    getUser()
    fenye();
    del();
    add();
    fanye()
    xiugai();
    xiugaiS();
})
//请求数据
function getUser() {
    var xhr;
    if(XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }
    //向服务器发送数据并且传送当前页和每页显示的条数作为参数传给后台,后台拿到参数并返回相应的数据
    xhr.open('get','/user?cur='+curentpage+'&tpage='+persize,true)
    xhr.onreadystatechange=function() {
        if(xhr.readyState==4&&xhr.status==200) {
          var  stu = JSON.parse(xhr.responseText)
            if(stu.code==200) {
                user = stu.data;
                showTabel();
            }else {
                alert(stu.message);
            }
        }
    }
    xhr.send()
}
//显示
function showTabel() {
    $('#fenye button').removeClass('btn-primary');
    $('#fenye button').eq(curentpage-1).addClass('btn-primary');
    $('#tb').html('');
    for(var i=0;i<user.length;i++) {
        $('#tb').append(`
            <tr>
                <td><input type="checkbox"></td>
                <td>${user[i].ids}</td>
                <td>${user[i].classid}</td>
                <td>${user[i].stuName}</td>
                <td>${user[i].address}</td>
                <td>
                <button class="btnDel" data-index="${user[i].ids}">删除</button>
                <button class="xiugai" data-index="${user[i].ids}">修改</button>
                </td>
            </tr>
        `)
    }
}
//删除
function del() {
    $('#tb').on('click','.btnDel',function() {
        var id = $(this).attr('data-index')
        var xhr;
        if(XMLHttpRequest){
            xhr=new XMLHttpRequest
        }else{
            xhr = new ActiveXObject('Microsoft.XMLHttp')
        }
        xhr.open('get','/student/del?id='+id)
        xhr.onreadystatechange=()=>{
            if(xhr.readyState==4&&xhr.status==200){
                let info = JSON.parse(xhr.responseText);
                if(info.code==200&&info.msg=='删除成功'){
                    getUser()
                }else{
                    alert(info.msg)
                }
            }
        }
        xhr.send()
    })
}

//模态框出现
$('#add').click(function() {
    $('#modelAdd').modal('show');
})
//清空
function clear() {
    $('#infoId').val('');
    $('#infoIdCard').val('');
    $('#pwd').val('');
    $('#money').val('');
}
//添加
function add() {
    $('#addStudent').click(function() {
        var id = Number($('#infoId').val()),
            clsId = Number($('#infoIdCard').val()),
            name = $('#pwd').val(),
            addr =$('#money').val();
            var xhr;
            if(XMLHttpRequest) {
                xhr = new XMLHttpRequest()
            }else{
                xhr = new ActiveXObject('Microsoft.XMLHttp')
            }
            //向服务器发送数据并且传送当前获取的值传送到后台并插入到数据库
            xhr.open('get','/add?ids='+id+'&id='+clsId+'&name='+name+'&addr='+addr,true)
            xhr.onreadystatechange=function() {
                if(xhr.readyState==4&&xhr.status==200) {
                    stu = JSON.parse(xhr.responseText)
                    if(stu.code==200) {
                        getUser()
                        fenye();
                        clear();
                        $('#modelAdd').modal('hide');
                    }else {
                        alert(stu.message);
                    }
                }
            }
            xhr.send()  
    })
}
//生成分页
function fenye() {
    //发送ajax请求服务器传回总页数,此时生成分页跟显示数据是分开的，在之前用假数据是生成分页和显示数据是同步的
    var xhr;
    if(XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }
    xhr.open('get','/total',true)
    xhr.onreadystatechange=function() {
        if(xhr.readyState==4&&xhr.status==200) {
          var  stu = JSON.parse(xhr.responseText)
           
                var count = stu.num
               total = Math.ceil(count/persize);
               $('#fenye').html('');
               for(var i=1; i<=total; i++) {
                   if(i==curentpage) {
                       $('#fenye').append(`
                       <button class="btn btn-primary page">${i}</button>
                   `)
                   }else {
                       $('#fenye').append(`
                       <button class="btn page">${i}</button>
                   `)
                   }
               }
        }
    }
    xhr.send()

}

//点击分页
function fanye() {
    $('#fenye').on('click','.page',function() {
        curentpage = Number($(this).text());
        console.log('hahah');
        getUser()
    })
}
//修改
function xiugai() {
    $('#tb').on('click','.xiugai',function() {
        var  id = $(this).attr('data-index')
        for(var i=0; i<user.length; i++) {
            if(id==user[i].ids) {
                $('#idInfo').val(user[i].ids);
                $('#idCardInfo').val(user[i].classid);
                $('#pwdInfo').val(user[i].stuName);
                $('#moneyInfo').val(user[i].address);
                $('#modelInfo').modal('show');
                that = id
                break;
            }
        }
    })
}
function xiugaiS() {
    $('#xiugaiStudent').click(function() {
    //    user[that].id = $('#idInfo').val();
    //    user[that].cardId =  $('#idCardInfo').val();
    //    user[that].pwd = $('#pwdInfo').val();
    //    user[that].money =$('#moneyInfo').val();
    //    $('#modelInfo').modal('hide');
    //    showTabel();
    var xhr;
    if(XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }
    //班级
    let clsid = $('#idCardInfo').val()
    //地址
    let addr = $('#moneyInfo').val()
    xhr.open('get','/edit?id='+that+'&clsid='+clsid+'&addr='+addr,true)
    xhr.onreadystatechange=function() {
        if(xhr.readyState==4&&xhr.status==200) {
            stu = JSON.parse(xhr.responseText)
            if(stu.code==200) {
              getUser()
            $('#modelInfo').modal('hide');
            showTabel();
            }else {
                alert(stu.message);
            }
        }
    }
    xhr.send()
    //    for(var i=0; i<user.length; i++) {
    //        if(that==user[i].id) {
    //         user[that].id = $('#idInfo').val();
    //         user[that].cardId =  $('#idCardInfo').val();
    //         user[that].pwd = $('#pwdInfo').val();
    //         user[that].money =$('#moneyInfo').val();
    //         $('#modelInfo').modal('hide');
    //         showTabel();
    //         break;
    //        }
    //    }
    })
}

