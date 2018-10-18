// JavaScript Document
 var nav = document.getElementById("word_s_ul");
 var links = nav.getElementsByTagName("li");
 var lilen = nav.getElementsByTagName("a"); //判断地址
var currenturl = document.location.href;
 var last = 0;
 for (var i=0;i<links.length;i++)
 {
    var linkurl =  lilen[i].getAttribute("href");
      if(currenturl.indexOf(linkurl)!=-1)
         {
          last = i;
         }
 }
          links[last].className = "navon";  //高亮代码样式
