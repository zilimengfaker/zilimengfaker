$(function() {
	/*if(!IsPC()){
		window.location.replace("http://dl.ccf.org.cn:8585");
	}*/
})
/**
 * 判断是否是pc设备
 */
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    if(window.screen.width>=768){
         flag = true;
    }
    return flag;
}


//数据为空提示标签
function getNullHtml() {
	return "<div style='height:300px;text-align: center;color:#CDC9C9 '><h2>资源正在建设中...</h2></div>";
}
//详情跳转
function toDetailHtml(type,id){
	if(type=="audio_video"){
		window.open(getPath()+"/audioVideo/detail.html?id="+id);
	}else if(type=="xhtx_thesis"){
		window.open(getPath()+"/institude/institudeDetail?id="+id);
	}else if(type=="qkwz"){
		window.open(getPath()+"/journal/queryArticleById?id="+id);
	}else if(type=="books_period"){
		window.open(getPath()+"/books/detail.html?id="+id);
	}else if(type=="hywj"){
		window.open(getPath()+"/meeting/toMeetingCorpusDetails?id="+id);
	}else if(type=="jg"){
		window.open(getPath()+"/lecture/lectureDetail?id="+id);
	}else if(type=="atlas"){
		window.open(getPath()+"/atlas/atlasDetails?id="+id);
	}else if(type=="meeting"){
		window.open(getPath()+"/meeting/loadMeetingDetailById?id="+id);
	}else if(type=="atlas"){
		window.open(getPath()+"/atlas/atlasDetails?id=="+id);
	}
}
function toMeetingDetail(meeting_series,year){
	var wd = window.open();
	$.ajax({
		type:"post",
		url:getPath()+"/meeting/queryMeetingId",
		data:{
			meeting_series:meeting_series,
			year:year
		},
		dataType:"json",
		success:function(data){
			 wd.location.href = getPath()+"/meeting/loadMeetingDetailById?id="+data;
		}
	});
	
}

function toSearchList(title,classen){
	if(classen==null || classen==""){
		classen=-1;
	}
	return getPath()+"/toSearchList.html?classen="+classen+"&searchText="+encodeURI(encodeURI(title));
}

//价格免费 true为免费
function isFree(price){
	if(price=="0"||price=="0.0"||price==0||price==0.0){
		return true;
	}else{
		return false ;
	}
}

//跳转到技术动态
function tojournal(title,year,issue){
	title = encodeURI(title);
	//window.open(getPath()+"/journal/queryJournalDetails?title="+title+"&year="+year+"&issue="+issue+"");
	return getPath()+"/journal/queryJournalDetails?title="+title+"&year="+year+"&issue="+issue;
}
function tojournal2(title,year,issue){
	window.open(getPath()+"/journal/queryJournalDetails?title="+title+"&year="+year+"&issue="+issue+"");
}
//跳转至学会通讯
function toXhtx(date_year,issue){
	window.open(getPath()+"/cccf/list?date_year="+date_year+"&issue="+issue);
}

//详情跳转
function detailHtml(type,id){
	if(type=="audio_video"){
		return getPath()+"/audioVideo/detail.html?id="+id;
	}else if(type=="xhtx_thesis"){
		return getPath()+"/institude/institudeDetail?id="+id;
	}else if(type=="qkwz"){
		return getPath()+"/journal/queryArticleById?id="+id;
	}else if(type=="books_period"){
		return getPath()+"/books/detail.html?id="+id;
	}else if(type=="hywj"){
		return getPath()+"/meeting/toMeetingCorpusDetails?id="+id;
	}else if(type=="jg"){
		return getPath()+"/lecture/lectureDetail?id="+id;
	}else if(type=="journal"){
		return getPath()+"/journal/queryJournalDetails?id="+id;
	}else if(type=="atlas"){
		return getPath()+"/atlas/atlasDetails?id="+id;
	}else if(type=="meeting"){
		return getPath()+"/meeting/loadMeetingDetailById?id="+id;
	}
}
/**
 * pdf阅读
 * id:资源id
 * NumCur:跳转页数（可为空）
 * state 状态 false为试看
 */
function showPDF(id,NumCur){
	if(NumCur==null || NumCur==""){
		NumCur=1;
	}
	if(!/^[0-9]*$/.test(NumCur)){
    	NumCur=1;
    }
	addCookie("NumCur"+id,NumCur,30,"/"); 
	var url=getPath()+"/reading.html?id="+id;
	window.open(url,id+'showPDF');
}

//购买
function goBuyHtml(ids){
	var username=$("#username").val();
	if(username==null || username==""||username=="null"){
		layer.confirm('请登录后使用！'
			,{title:'系统提醒：',btn: ['登录','取消'] //按钮
			}, function(){
			     login();
			});
		return;
	}else{
		window.open(getPath()+"/buy/payment.html?ids="+ids);
	}
}
//获取访问项目名
function getPath(){
    var contextPath=$("#contextPath").val();
    return contextPath;
}

function getLayerAlertLogin(){
	return '<a class="layer_alert_login" style="font-size: 15px;color: #1e3489;font-weight: 700;padding: 0px 2px;" href="javascript:login()">登录</a>';
}


//登录
function login(){
	var loginUrl=window.location.protocol+"//sso.ccf.org.cn/sso/login.do";
	var url=window.location.toString();
	url=encodeURI(url);
	url=url.replace("?","%3F");
	url=url.replace(/&/g,"%26");
	window.location=loginUrl+'?service='+url;
}
//退出
function logOut(){
	var logoutUrl =window.location.protocol+"//sso.ccf.org.cn/sso/logout.do";
	var url=window.location.toString();
	url=encodeURI(url);
	if(url.indexOf("/user/")!=-1
		|| url.indexOf("/buy/")!=-1){
		var host=window.location.protocol+"//"+window.location.host;
		url=host+"/index.html"
	}
	url=url.replace("?","%3F");
	url=url.replace(/&/g,"%26");
    window.location=logoutUrl+'?service='+url;
}
//注册
function register(){
	window.open(window.location.protocol+"//web.ccf.org.cn/CCF/reg.action?flag=0");
}


/**个人收藏
 * kType：收藏库类型（多库‘,’分割）
 * 		学会通讯：xhtx_thesis,xhtx
 * 		期刊：qkwz,journal
 * 		会议文集：hywj
 * 		图书：books_period
 * 		讲稿：jg
 * 		音视频：audio_video
 * 		//专题：special
 * flag:区别相同type下的不同收藏样式的标志位
 * */
function addOREditMyCollection(pid,kType,flag) {
	var username=$("#username").val();
	if(username==null || username==""||username=="null"){
		layer.alert("请"+getLayerAlertLogin()+"后使用！", {
			  title:'系统提醒：'
			});
		return;
	}
	$.ajax({
		type : "post",
		url : getPath()+"/user/addOREditMyCollection",
		data : {
			pid : String(pid),
			kType : kType,
		},
		dataType : "json",
		success : function(res) {
			if(kType == 'qkwz' || kType == 'hywj'){
				if(flag == 'list'){
					if(res!=0){
						$("#MyColl"+pid+"list").html('<i class="icon icon_collect_blue_cur"></i><span>已收藏</span>');
						layer.msg('收藏成功！', {offset: ['50%']});
					}else{
						$("#MyColl"+pid+"list").html('<i class="icon icon_collect_blue"></i><span>收藏</span>');
						layer.msg('取消收藏！', {offset: ['50%']});
					}
				}else if(flag=='table'){
					if(res!=0){
						$("#MyColl"+pid+"table").html('<i class="icon icon_collect_cur"></i>已收藏');
						layer.msg('收藏成功！', {offset: ['50%']});
					}else{
						$("#MyColl"+pid+"table").html('<i class="icon icon_collect"></i>收藏');
						layer.msg('取消收藏！', {offset: ['50%']});
					}
				}else{
					if(res!=0){
						$("#MyColl"+pid).html('<i class="icon icon_collect_red_cur"></i>已收藏');
						//$("#MyColl"+pid+" i").removeClass("icon_collect_red").addClass("icon_collect_red_cur");
						layer.msg('收藏成功！', {offset: ['50%']});
					}else{
						$("#MyColl"+pid).html('<i class="icon icon_collect_red"></i>收藏');
						//$("#MyColl"+pid+" i").removeClass("icon_collect_red_cur").addClass("icon_collect_red");
						layer.msg('取消收藏！', {offset: ['50%']});
					}
				}
			}else{
				if(res!=0){
					$("#MyColl"+pid).html('<i class="icon icon_collect_red_cur"></i>已收藏');
					//$("#MyColl"+pid+" i").removeClass("icon_collect_red").addClass("icon_collect_red_cur");
					layer.msg('收藏成功！', {offset: ['50%']});
				}else{
					$("#MyColl"+pid).html('<i class="icon icon_collect_red"></i>收藏');
					//$("#MyColl"+pid+" i").removeClass("icon_collect_red_cur").addClass("icon_collect_red");
					layer.msg('取消收藏！', {offset: ['50%']});
				}
			}
		},
		error : function(data) {
			//alert("请求失败");
		}
	});
}

/**个人主页 浏览记录
* 	kType：浏览库类型（多库‘,’分割）
* 		音视频：audio_video
* 		学会通讯：xhtx
* 		期刊：journal
* 		图书：books_period
* 		会议文集：hywj
* 		讲稿：jg
* */
function addOREditMyHomepage(pid,kType) { 
	var username=$("#username").val();
	if(username==null || username==""|| username=="null"){
		return;
	}
	$.ajax({
		type : "post",
		url : getPath()+"/user/addOREditMyHomepage",
		data : {
			pid : String(pid),
			kType : kType,
		},
		dataType : "json",
		success : function(res) {
		},
		error : function(data) {
			//alert("请求失败");
		}
	});
}

/**
 * 累加点击次数 
 * @param type  所属库
 * @param id    数据id
 * @param field 需要增加字段（例如：click_count）
 */
function increaseCount(type,id,field) { 
	$.ajax({
		type : "post",
		url : getPath()+"/increase/increaseCount",
		data : {
			type : type,
			id : id,
			field :field,
		},
		dataType : "json",
		success : function(res) {
		},
		error : function(data) {
			//alert("请求失败");
		}
	});
}

/**
 * 收藏，已收藏的不处理
 */
function addMyCollection(pid,kType,type) {
	var ifCollect=false ;
	$.ajax({
		type : "post",
		url : getPath()+"/user/addMyCollection",
		data : {
			pid : String(pid),
			kType : kType,
		},
		dataType : "json",
		async:false,
		success : function(res) {
			if(res!=0){
				if(type="qikan"){
					$("#MyColl"+pid+type).html('<i class="icon icon_collect_blue_cur"></i><span>已收藏</span>');
				}
				if(type="lanmu"){
					$("#MyColl"+pid+type).html('<i class="icon icon_collect_cur"></i><span>已收藏</span>');
				}
				if(type="list"){
					$("#MyColl"+pid+type).html('<i class="icon icon_collect_blue_cur"></i><span>已收藏</span>');
				}
				if(type="table"){
					$("#MyColl"+pid+type).html('<i class="icon icon_collect_cur"></i>已收藏');
				}
				
				ifCollect=true ;
			}
			
			
		},
		error : function(data) {
			//alert("请求失败");
		}
	});
	console.info(ifCollect)
	return ifCollect;
}

/**
 * 对象为null返回true ,不为空返回false
 */
function isNull(obj){
	//if(obj==null || obj == undefined || obj =="null" || obj=="" || String(obj)=="null"){
	if(String(obj) == "undefined" || obj =="null" || obj=="" || obj==null){
		return true ;
	}else{
		return false ;
	}
}

//按Enter键,执行事件  
function entersearch1(event){  
 if (event.keyCode == 13)  
    {  
	 goResourceSearch();
    }  
}  

/**
 * 下载接口
 * id：下载资源的id
 * isAccess:权限
 * isLoginFree:null无需登录，false：试看，true：查看完整版
 */
function downloadPdf(id,isAccess,isLoginFree){
	var username=$("#username").val();
	if(String(isLoginFree)!="null" && String(isLoginFree)!="undefined"){//需要登录资源
		if(username==null || username==""||username=="null"){
			layer.alert("该资源需要"+getLayerAlertLogin()+"后下载！", {
				  title:'系统提醒：'
				});
			return;
		}else if(isLoginFree==false || isLoginFree=="false"){
			layer.alert("抱歉，请成为正式会员后下载！", {
				  title:'系统提醒：'
			});
		}else{
			window.location=getPath()+"/downloadPDF?id="+id;
		}
	}else{
		if(isAccess==true || isAccess=="true"){
			window.location=getPath()+"/downloadPDF?id="+id;
		}else{
			if(username==null || username==""||username=="null"){
				layer.alert("请"+getLayerAlertLogin()+"后使用！", {
					  title:'系统提醒：'
					});
				return;
			}else{
				layer.alert("抱歉，购买之后下载！", {
					  title:'系统提醒：'
				});
			}
		}
	}
	
}


function downloadPdf2(id,isAccess){
	if(username==null || username==""||username=="null"){
		layer.alert("请"+getLayerAlertLogin()+"后使用！", {
			  title:'系统提醒：'
			});
		return;
	}
	window.location=getPath()+"/downloadPDF?id="+id;
}


function resourceNotExist(){
	layer.alert("资源暂无！", {
		  title:'系统提醒：'
		});
}

/**
 * 格式化空数据
 */
function formateStr(str){
	if(str==null || str ==undefined || str=="null"){
		return "";
	}else{
		return str ;
	}
}

/*ztree控制单击节点展开和一级节点不选中start*/
function onClick(e,treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj(treeId);
	zTree.expandNode(treeNode);
}

function onClickDrop(e,treeId, treeNode) {
	
}

function beforeClickDrop(treeId, treeNode) {  
    if (treeNode.level == 0 ) {  
        var zTree = $.fn.zTree.getZTreeObj(treeId);  
        return false;  
    }  
    return true;  
}  

function beforeClick(treeId, treeNode) {  
    if (treeNode.level == 0 ) {  
        var zTree = $.fn.zTree.getZTreeObj(treeId);  
        var isOpen=treeNode.open;
        zTree.expandAll(false);
        if(!isOpen){
        	zTree.expandNode(treeNode);  
        }
        return false;  
    }  
    return true;  
}  
/*ztree控制单击节点展开和一级节点不选中end*/

//图片链接失效用默认图片代替
function nofindAudio(){
	var img=event.srcElement;
	img.src=getPath()+"/computer/static/img/noAudio.jpg"; //img1.png
	img.onerror=null; //控制不要一直跳动
}
function nofindVideo(){
	var img=event.srcElement;
	img.src=getPath()+"/computer/static/img/noVideo.jpg"; //img1.png
	img.onerror=null; //控制不要一直跳动
}
/**
 * 添加热门搜索
 * @param searchText：检索词
 * @param type：检索库类型
 * @param searchNumber：检索结果数
 * @return
 */
function addOReditSearchHotWord(searchText,type,number) {
	var bomb_list="";
	var classen="-1";
	if(type!="all"){
		classen=type
	}
	//查询检索字段类型
	$.ajax({
		type : "post",
		url : getPath()+"/searchField.do",
		data : {
			"classen":classen
		},
		dataType : "json",
		async:false,
		success : function(data) {
			var dataRole = eval(data);
			for(var key in dataRole[0]){
				bomb_list+=dataRole[0][key]+",";
			}
		},
		error : function(data) {
			//alert("请求失败");
		}
	});
	//处理掉检索字段类型
	if(searchText.indexOf(":")>=0){
		var split=searchText.split(":");
		if(bomb_list.indexOf(split[0])>=0){
			searchText=split[1];
		}
	}
	$.ajax({
		type : "post",
		url : getPath()+"/hotWord/addOReditSearchHotWord",
		data : {
			searchText :searchText,
			type : type,
			searchNumber:number
		},
		dataType : "json",
		async:false,
		success : function(res) {
			initHotSearch(type);
		},
		error : function(data) {
			//alert("请求失败");
		}
	});
}
function decodeHotSearch(searchText){
	hotSearch(decodeURI(searchText));
}

//加载热门搜索信息
function initHotSearch(type) {
	$.ajax({
		type:"post",
		url:getPath()+"/hotWord/findSearchHotWord",
		dataType:"json",
		data:{
			type: type,
			pageNum:1,
			pageSize:5,
		},
		success : function(res){
			var content = "热搜词：";
			if(res!=null && res.length>0){
				for(var i=0;i<res.length;i++){
					var name =res[i].search_text;
					content += '<span><a href="javascript:void(0)" onclick="decodeHotSearch(\'' + encodeURI(name) + '\')">' + name + '</a></span>';
				}
			}
			$("#hotSearch").html(content);
		},
		error: function(){
			//alert("加载热门搜索时出错！");
		}
	});
}

function escapeQueryChars(s){
	var sb = "";
	for (var i = 0; i < s.length; i++) {
	  var c = s[i];
	  // These characters are part of the query syntax and must be escaped
	  if (c == '\\' || c == '+' || c == '-' || c == '!'  || c == '(' || c == ')' || c == ':'
	    || c == '^' || c == '[' || c == ']' || c == '\"' || c == '{' || c == '}' || c == '~'
	    || c == '*' || c == '?' || c == '|' || c == '&'  || c == ';' || c == '/'
	    || c.match(/^\s*$/)) {
	    sb+='\\';
	  }
	  sb+=c;
	}
	return sb;
}

function addCookie(name,value,days,path){   /**添加设置cookie**/  
    var name = escape(name);  
    var value = escape(value);  
    var expires = new Date();  
    expires.setTime(expires.getTime() + days * 3600000 * 24);  
    //path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用  
    path = path == "" ? "" : ";path=" + path;  
    //GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC  
    //参数days只能是数字型  
    var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();  
    document.cookie = name + "=" + value + _expires + path;  
}  
function getCookieValue(name){  /**获取cookie的值，根据cookie的键获取值**/  
    //用处理字符串的方式查找到key对应value  
    var name = escape(name);  
    //读cookie属性，这将返回文档的所有cookie  
    var allcookies = document.cookie;         
    //查找名为name的cookie的开始位置  
    name += "=";  
    var pos = allcookies.indexOf(name);      
    //如果找到了具有该名字的cookie，那么提取并使用它的值  
    if (pos != -1){                                     //如果pos值为-1则说明搜索"version="失败  
        var start = pos + name.length;                  //cookie值开始的位置  
        var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie  
        var value = allcookies.substring(start,end); //提取cookie的值  
        value =unescape(value);
        return (value);                           //对它解码        
    }else{  //搜索失败，返回空字符串  
        return "";  
    }  
}  
function deleteCookie(name,path){   /**根据cookie的键，删除cookie，其实就是设置其失效**/  
    var name = escape(name);  
    var expires = new Date(0);  
    path = path == "" ? "" : ";path=" + path;  
    document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;  
}

function replaceSpeStr(str){
	if(!isNull(str)){
		 result=str.replace(/[^a-zA-Z\d\u4e00-\u9fa5]/g,'');
		return result; 
	}else{
		return "";
	}
}

/**
 * 返回true表示包含特殊字符
 */
function isContainSpeStr(str){
	if(!isNull(str)){
		var pattern = new RegExp(/[^a-zA-Z\d\u4e00-\u9fa5]/g);
		var result=pattern.test(str);
		return result;
	}
	return true ;
}
