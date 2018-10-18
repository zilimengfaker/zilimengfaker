// JavaScript Document
var badname = window.location.href;
var badbadname = "ab@#ov@#ep@#ap@#er.@#com";
var goodname = "w@#w@#w.l@#e@#t@#p@#u@#b.c@#om@#.cn";
if(window.location.href.indexOf(badbadname.replace("@#","")) >= 0){
    //alert("goto: http://"+goodname.replace("@#","")+"/index.php?page=journalapp");
    window.location.href = "http://"+goodname.replace("@#","")+"/index.php?page=journalapp";
}else{
    //alert(window.location.href);
}
