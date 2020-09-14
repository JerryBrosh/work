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