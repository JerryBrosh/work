function MYajax(method,url,param,callback) {
    var xhr;
    if(XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }
    if(method.toLowerCase()=='get') {
        url = url+'?'+param
    }
    xhr.open(method,url,true)
    xhr.onreadystatechange=function() {
        if(xhr.readyState==4&&xhr.status==200) {
            callback(xhr.responseText)
        }
    }
    if(method.toLowerCase()=='post'){
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(param)
    }else{
      xhr.send()
    }
    
}

//面向对象封装ajax
function ajax(obj) {
    // 1. 创建 xhr 对象
    if (window.XMLHttpRequest) {
      // 非IE5 IE6
      var xhr = new XMLHttpRequest();
      }else {
      // IE5 IE6
      var xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }    // 2.链接服务器
      xhr.open(obj.method, obj.url, obj.async);
      if(obj.method.toLowerCase()=='get'){
        obj.url = obj.url+'?'+obj.data
      }
      xhr.send(null);
      if(obj.method.toLowerCase()=='post'){
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(obj.data);
      }
      xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // 请求完成
        console.log(xhr.responseText);
      }
    };
  }