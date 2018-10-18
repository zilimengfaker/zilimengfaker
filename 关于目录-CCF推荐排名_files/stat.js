var _zcms_d,_zcms_s,_zcms_c,_zcms_l,_zcms_t,_zcms_s;
var _zcms_st=new Date().getTime();
var _zcms_stat = function(param){
	var p = {};
	if(param){
		var arr = param.split("&");
		for(var i=0;i<arr.length;i++){
			if(arr[i]){
				var arr2 = arr[i].split("=");
				if(arr2[0]){
					p[arr2[0]] = arr2[1];
				}
			}
		}
	}
	_zcms_d = p["Dest"];
	_zcms_s = p["SiteID"];
	_zcms_c = p["CatalogInnerCode"];
	_zcms_l = p["LeafID"];
	_zcms_t = p["Type"];
	p["sr"] = screen.width+"x"+screen.height;
	p["cd"] = screen.colorDepth;
	p["fv"] = _zcms_stat.fv();
	p["ce"] = _zcms_stat.ce();	
	p["je"] = _zcms_stat.je();
	p["la"] = navigator.language?navigator.language:navigator.browserLanguage;
	p["la"] = p["la"]?p["la"]:navigator.systemLanguage;
	p["cs"] = document.charset;
	var memberID=_zcms_stat.cookieGet("ZVING_MEMBER_LOGIN_ID");
	if(memberID){
		p["MemberID"] = memberID;
	}
	p["vq"] = _zcms_stat.vq();	
	p["Referer"] = _zcms_stat.eu(document.referrer);
	p["Title"] = _zcms_stat.eu(document.title);
	p["URL"] = _zcms_stat.eu(location.href);
	p["Source"]=_zcms_source();
	p["Host"] = location.host;
	var dest = _zcms_d;
	p["Dest"] = false;
	dest = dest+"?"+_zcms_stat.mq(p);
	var s = document.createElement("script");
	s.src = dest;
	(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(s);
};

_zcms_stat.eu =  function(str){
	return encodeURI(str).replace(/=/g,"%3D").replace(/\+/g,"%2B").replace(/\?/g,"%3F").replace(/\&/g,"%26").replace(/\#/g,"%23");
}

_zcms_stat.mq = function(map){
	var sb = [];
	for(var prop in map){
		if(map[prop]){
			sb.push(prop+"="+map[prop]);
		}
	}	
	return sb.join("&");
}

_zcms_stat.trim = function(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}

_zcms_stat.cookieGet=function(name){
	var cs = document.cookie.split("; ");
	for (i = 0; i < cs.length; i++) {
		var arr = cs[i].split("=");
		var n = _zcms_stat.trim(arr[0]);
		var v = arr[1] ? _zcms_stat.trim(arr[1]) : "";
		if (n === name) {
			return decodeURIComponent(v);
		}
	}
	return null;
}

_zcms_stat.je = function(){
	var je="";
	var n=navigator;
	je = n.javaEnabled()?1:0;
	return je;
} 

_zcms_stat.fv = function(){
	var f="",n=navigator;	
	if(n.plugins && n.plugins.length){
		for(var ii=0;ii<n.plugins.length;ii++){
			if(n.plugins[ii].name.indexOf('Shockwave Flash')!=-1){
				f=n.plugins[ii].description.split('Shockwave Flash ')[1];
				break;
			}
		}
	}else if(window.ActiveXObject){
		for(var ii=10;ii>=2;ii--){
			try{
				var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');");
				if(fl){
					f=ii + '.0'; break;
				}
			}catch(e){} 
		} 
	}
	return f;
}

_zcms_stat.ce = function(){
	var c_en = (navigator.cookieEnabled)? 1 : 0;
	return c_en;
}

_zcms_stat.vq = function(){
  var cs = document.cookie.split("; ");
  var name = _zcms_s+"_vq";
  var vq = 1;
  for(i=0; i<cs.length; i++){
	  var arr = cs[i].split("=");
	  var n = _zcms_stat.trim(arr[0]);
	  var v = arr[1]?_zcms_stat.trim(arr[1]):"";
	  if(n==name){
	  	vq = parseInt(v)+1;
	  	break;
	  }
	}
	var expires = new Date(new Date().getTime()+365*10*24*60*60*1000).toGMTString();
	var cv = name+"="+vq+";expires="+expires+";path=/;";
	document.cookie = cv;
	return vq;
}

function _zcms_bu(){
	if(_zcms_d){ 
		var p = {};
		p["Event"] = "Unload";
		p["LeafID"] = _zcms_l;
		p["SiteID"] = _zcms_s;
		p["CatalogInnerCode"] = _zcms_c;
		if(_zcms_t){
	  	//p["Trace"] = pos.join(";");//will implement in 2.0
			p["Type"] = _zcms_t;
		}
		p["StickTime"] = _zcms_nt;
		var dest = _zcms_d+"?"+_zcms_stat.mq(p);
		var s = document.createElement("script");
		s.src = dest;
		(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(s);
	}
}

var _zcms_lt = new Date().getTime();
var _zcms_lt_ka = new Date().getTime();
var _zcms_nt = 0;
function _zcms_ka(){
	var t = new Date().getTime();
	if(t-_zcms_lt_ka>60000){
		_zcms_lt_ka = t;
		var p = {};
		p["Event"] = "KeepAlive";
		p["SiteID"] = _zcms_s;
		var dest = _zcms_d+"?"+_zcms_stat.mq(p);
		var s = document.createElement("script");
		s.src = dest;
		(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(s);
	}
	if(t-_zcms_lt>60000){
		_zcms_nt += 10000;
	}else{
		_zcms_nt += t-_zcms_lt;
	}
	_zcms_lt = t;
}
function _zcms_source(){
	var hash=location.hash;
	var subIndex=hash.indexOf("#_z_s=");
	if(subIndex==-1){
		return "";
	}else{
		var source=hash.substring(subIndex+6);
		location.hash=hash.substring(0,subIndex);
		if((location.hash=="#"||location.hash=="")&&history.replaceState){
			history.replaceState(null,'',location.pathname+location.search);
		}
		return source;
	}
}

var pos = [];
function _zcms_cr(evt){
	var x = evt.clientX, y=evt.clientY;
	var src = evt.srcElement;
	if(!src){
		var node = evt.target;
    while(node&&node.nodeType!=1)node=node.parentNode;
    src =  node;
	}
	var win;
	if(src.ownerDocument.defaultView){
		win = src.ownerDocument.defaultView;
	}else{
		win = src.ownerDocument.parentWindow;
	}
	x += Math.max(win.document.body.scrollLeft, win.document.documentElement.scrollLeft);
	y += Math.max(win.document.body.scrollTop, win.document.documentElement.scrollTop);
	pos.push([x,y]);
}

if(window.attachEvent){
	window.attachEvent("onbeforeunload",_zcms_bu);
	document.attachEvent("onclick",_zcms_ka);
	document.attachEvent("onkeydown",_zcms_ka);
	document.attachEvent("onmousemove",_zcms_ka);
	window.attachEvent("onscroll",_zcms_ka);
}else if(window.addEventListener){
	window.addEventListener('beforeunload',_zcms_bu,false);
	document.addEventListener("click",_zcms_ka,false);
	document.addEventListener("click",_zcms_cr,false);
	document.addEventListener("keydown",_zcms_ka,false);
	document.addEventListener("mousemove",_zcms_ka,false);
	window.addEventListener("scroll",_zcms_ka,false);
}