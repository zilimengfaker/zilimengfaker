/*!  Zving JS library mergedfile  
* compress at 2016-03-04 
*/ 
/******************** frontend\rating.js ********************/ 
﻿(function() {
	var z=window.Zving,
		getDom=z.getDom;

	//星级评定

	var Rating=function(elem, val) {
		var el=getDom(elem);
		if(!el){
			return;
		}
		var self = this;
		this.hiddenInput = getDom("cmt_ContentScore");
		this.viewRating = getDom(el).getElementsByTagName('LI')[0];
		this.links = getDom(el).getElementsByTagName('A');
		this.starWidth = this.links[0].offsetWidth;
		for (var i = 0, len = this.links.length; i < len; i++) {
			this.links[i].value = i + 1;
			this.links[i].onclick = function() {
				self.setRate(this.value);
			};
			this.links[i].onmouseover = function() {
				for (var a = 0; a < this.value; a++) {
					self.links[a].className = self.links[a].className.replace(/ hcolor/g, "");
					self.links[a].className += " hcolor";
				}
				for (var a = this.value; a < 5; a++) {
					self.links[a].className = self.links[a].className.replace(/ hcolor/g, "");
				}
			};
			this.links[i].onmouseout = function() {
				for (var a = 0; a < this.value; a++) {
					self.links[a].className = self.links[a].className.replace(/ hcolor/g, "");
				}
			};
		}
		if (val == undefined) {
			this.setRate(this.hiddenInput.value);
		} else {
			this.setRate(val);
		}
	}
	Rating.prototype = {
		setRate: function(val) {
			this.hiddenInput.value = val;
			this.viewRating.style.width = val * this.starWidth + 0 + 'px';
			if (this.hiddenInput.value != 0) {
				for (var a = 0; a < this.hiddenInput.value; a++) {
					this.links[a].className = this.links[a].className.replace(/ select/g, "");
					this.links[a].className += " select";
				}
				for (var a = this.hiddenInput.value; a < 5; a++) {
					this.links[a].className = this.links[a].className.replace(/ select/g, "");
				}
			}
		},
		getRate: function() {
			return this.hiddenInput.value;
		}
	};
	
	z.Rating=Rating;
})(); 
/******************** frontend\member.js ********************/ 
(function () {
	var z = window.Zving,
	loadJs = z.loadJs,
	Server = z.Server,
	Cookie=z.Cookie,
	getDom = z.getDom;
	if (!window.localsForMessageBoard && !window.localsForComment && !window.localsForMebmer) {
		return;
	}
	
	window.localsForMebmer = window.localsForMebmer || {};
	window.localsForComment = window.localsForComment || {};
	window.localsForMessageBoard = window.localsForMessageBoard || {};
	var locals; 
	locals= $.extend(window.localsForMebmer, window.localsForComment, window.localsForMessageBoard);

	var jsonpLogin = function (userName, password, authCode) {
		var dc;
		if(typeof userName == 'object'){
			dc=userName;
		}else{
			dc={
				UserName:userName,
				Password:password,
				AuthCode:authCode||''
			}
		}
		if(!dc.UserName||!dc.Password){
			Dialog.alert(Lang.get("Member.ErrorMsg.5"));
			return;
		}
		dc.action='login';
		dc.SiteID=dc.SiteID||locals.SiteID;
		Server.sendRequest('member/ajaxlogin',dc,function(data){
			if (typeof data == 'object') {
				if (data.status!=1) {
					//登录失败时刷新验证码，抛出验证码改变事件通知各相关页面处理
					Member.isNeedVerifyCode=true;
					Member.getNewAuthCode();
					Member.trigger('loginerror',data);
				} else {
					Cookie.set("ZVING_MEMBER_LOGIN_ID", data.UserID,null,"/");
					Member.isLogined=dc.UserName||true;
					Member.trigger('logined',dc.UserName);//已登录事件中传递用户名信息，供回调使用
				}
			}
		});
	};
	var jsonpLogout=function(){
		var url = locals.FrontAppContext + 'member/ajaxlogout?'+new Date().getTime();
		Server.sendRequest('member/ajaxlogout',{},function(){
			Cookie.remove("ZVING_MEMBER_LOGIN_ID");
			Member.isLogined=false;
			Member.trigger('logout');
		});
	};
	
	var showLoginPanel = function () {
		if ($('#loginPanel').filter(':visible').length) {
			return;
		}
		//初始化
		$('#loginForm2').get(0).reset();
		//刷新验证码
		$("#loginAuthCodeImg").css("backgroundImage", 'url(' + CONTEXTPATH + 'authCode.zhtml?Height=21&Width=50&' + new Date().getTime() + ')')
		var position = $('#span_login').offset();
		if (position) {
			position.left -= 250;
			position.top = 31;
		} else {
			position = {
				left : $window.width() / 2 - 175,
				top : 30
			}
		}
		$('#loginPanel').css({
			top : position.top + 'px',
			left : position.left + 'px'
		}).show();
		$(document).off('click.toggleloginpanel').on('click.toggleloginpanel', function (evt) {
			if (!$('#loginPanel,#span_login').find(evt.target).length) {
				$('#loginPanel').hide();
			}
		});
	};
	
	var addFavorites = function (id, favtype) {
		Server.sendRequest('member/logined',{}, function (result) {
			if (result.IsLogin) {
				if (!id || !favtype) {
					Dialog.alert(Lang.get("Verify.HasError"));
					return;
				}
				Server.sendRequest('memberFavorites/add',{ID:id,FavType:favtype}, function (data) {
					Dialog.alert(data.message);
				});
			} else {
				//登录
				Dialog.alert(Lang.get("Member.MustLogin"));
				//showLoginPanel();
			}
		});
	};

	var Event={};
	var Member ={
			jsonpLogin:jsonpLogin,
			jsonpLogout:jsonpLogout,
			showLoginPanel:showLoginPanel,
			
			//用户注册
			register:function () {
				var url = locals.FrontAppContext + 'member/register?SiteID=' + locals.SiteID;
				var w = window.open(url, "_blank", "");
				if (!w) {
					Dialog.alert(locals.Contentcore_WindowBlocked);
					return;
				}
			},
			addEventListener:function(type,fn){
				var listeners=Event[type]=Event[type]||[];
				listeners.push(fn);
				return this;
			},
			removeEventListener:function(type,fn){
				var listeners=Event[type];
				if(listeners&& listeners.length){
					var index=listeners.indexOf(fn);
					if(index>-1){
						listeners.splice(index,1);
					}
				}
				return this;
			},
			trigger:function(type,data){
				var listeners=Event[type]||[];
				for(var i=0;i<listeners.length;i++){
					listeners[i](data);
				}
				return this;
			},
			isLogined:false,
			addFavorites : addFavorites
	};
	
	Member.Event=Event;
	var authCodeImg=new Image();
	authCodeImg.onload=function(){
		Member.trigger('authcodechange',authCodeImg.src);
	};
	Member.getNewAuthCode=function(){
		authCodeImg.src=locals.FrontAppContext+'authCode.zhtml?Height=21&Width=50&'+new Date().getTime();
	};
	//判断是否需要验证码，且结果处理后抛出相关事件通知相关模块处理
	Member.needVerifyCode=function (username){
		Server.sendRequest('member/needVerifyCode',{UserName:username}, function (result) {
			if(result){
				//需要验证码时，刷新验证码
				Member.isNeedVerifyCode=true;
				Member.getNewAuthCode();
				Member.trigger('needverify');
				
			}else{
				//不需要时，各功能组件隐藏验证码
				Member.isNeedVerifyCode=false;
				Member.trigger('notneedverify');
			}
		});
	};
	Member.isNeedVerifyCode=false;//内部保留当前输入用户是否需要验证码的状态。默认不需要验证码。
	z.Member = Member;
	
	//页面初始化后看是否已登录,页面默认处于未登录状态
	$(window).load(function() {
		locals= $.extend(window.localsForMebmer, window.localsForComment, window.localsForMessageBoard);
		
		//如果指定了登录后的跳转页面，则登录后直接跳转
		if(locals.SiteLink&&window.needRedirect){		
			Member.addEventListener('logined',function(jsonpData){		
				window.location=locals.SiteLink;
			});		
		}
		//
		Server.sendRequest('member/logined',{}, function(result){
			if(typeof result != 'undefined' && result.IsLogin){
				Member.isLogined=result.UserName;
				Member.trigger('logined',result.UserName);
			}
	     });		
	});
})();
 
/******************** frontend\comment.js ********************/ 
﻿﻿jQuery(function ($) {
	var z=window.Zving,
		loadJs=z.loadJs,
		Server=z.Server,
		getDom=z.getDom,
		Member=z.Member;
	if (!window.localsForComment) {
		return;
	}
	var cmt_isNeedLogin=false;
	var MaxLength=200;
	//----start module全局变量,初始化后只读----//
	var config = {
		suffix : '_reply',
		elIds : {
			commentContainer:'comment2',
			checkStar:'checkstar',
			checkMood:'checkMood',
			
			textarea : 'cmt_content',
			counter : 'cmt_content_count',
			checkbox : 'cmt_CmntCheckbox',
			submitBtn : 'cmtSubmit',
			loginContainer : 'cmt_Login',
			username : 'cmt_uname',
			password : 'cmt_pass',
			authCode : 'cmt_AuthCode',
			authImg : 'cmt_authCodeImg',
			loginBtn : 'cmt_frmbutton',
			commentCount : 'cmt_commtotal',
			personCount : 'cmt_commusertotal',
			registerBtn : 'cmt_reg',
			parent : 'cmt_ParentID',
			score : 'cmt_ContentScore',
			logout:'cmt_logout',
			
			replyBox:'replyBox',
			replyBoxContainer:'commentLoginBox_reply',
			userNameLabel:'userNameLabel',
			loginedPanel:'cmt_Logined',//登录状态内容显示容器
			logoutPanel:'cmt_Login',//未登录状态内容显示容器
			authCodeContainer:'authCodeContainer',
			loginFrm:'cmt_frm'
			
		}
	};
	var elIds = config.elIds,suffix;
	suffix = config.suffix;
	//----end module全局变量(elIds,suffix),初始化后只读----//
	function appendReply(){
		var commentLoginBoxReply=getDom('commentLoginBox_reply'),
		commentLoginBox=getDom('commentLoginBox');
		if(commentLoginBoxReply){//如果页面中有用于回复的评论块，则进行替换操作
			var ids=[];
			for(var key in elIds){
				if(elIds.hasOwnProperty(key)){
					ids.push(elIds[key]);
				}
			}
			//IE中innerHTML返回的元素的属性值可能没有在双引号中。
			//由于一些元素的id可能为另一些id的前缀，所以为了尽可能多的匹配，长的id放前面优先匹配。
			var reg=new RegExp('(\\s+id=([\'"]|))('+ids.sort(function(a,b){return b.length-a.length;}).join('|')+')(\\2)','gi');
			commentLoginBoxReply.innerHTML=commentLoginBox.innerHTML.replace(reg,function($0,$1,$2,$3,$4){
				return $1+$3+suffix+$4;
			});
		};
		
		//处理登录和注销后的局部刷新
		Member.addEventListener('logined',function(userName){
			showLogined(userName,true);
		});
		Member.addEventListener('logout',function(){
			showLoginForm(true);
		});

	}

	function showLoginForm(reply){
		var panelId=elIds.loginPanel,
			authCodeContainerId=elIds.authCodeContainer,
			frmId=elIds.loginFrm,
			panelEl,authCodeContainerEl,frmEl;
		if(reply){
			panelId+=suffix;
			authCodeContainerId+=suffix;
			frmId+=suffix;
		}
		panelEl=getDom(panelId);
		authCodeContainerEl=getDom(authCodeContainerId);
		frmEl=getDom(frmId);
		
		frmEl.reset();		
		getDom(!reply ? elIds.loginedPanel:elIds.loginedPanel+suffix).style.display='none';
		getDom(!reply ? elIds.logoutPanel:elIds.logoutPanel+suffix).style.display='block';
		
		//隐藏验证码
		getDom(!reply ? elIds.authCodeContainer:elIds.authCodeContainer+suffix).style.display='none';		
	}
	function showLogined(userName,reply){
		$('#'+ (!reply ? elIds.userNameLabel:elIds.userNameLabel+suffix)).html(userName);
		getDom(!reply ? elIds.logoutPanel:elIds.logoutPanel+suffix).style.display='none';
		getDom(!reply ? elIds.loginedPanel:elIds.loginedPanel+suffix).style.display='block';
	}
	
	function getCommentCount(){
		Server.sendRequest('comment/count', 
			{contentid:localsForComment.ContentID}, 
			function(result){
				var commentCount = getDom(elIds.commentCount);
				var personCount = getDom(elIds.personCount);
				commentCount.innerHTML = result.CommentTotal||0 ;
				personCount.innerHTML = result.PersonTotal||0;
				$(commentCount).closest("a").attr("href",localsForComment.CommentListUrl);
				$(personCount).closest("a").attr("href",localsForComment.CommentListUrl);
		});
	}

	//登录处理
	function commentLogin(event) {
		var event = event || window.event,
			target = event.target || event.srcElement,
			usernameElId=elIds.username,
			passwordElId=elIds.password,
			authCodeElId=elIds.authCode,
			siteIDElId,
			isReply = target.id !== elIds.loginBtn;
		if (isReply) {//回复容器中的登录处理
			usernameElId = elIds.username + suffix;
			passwordElId = elIds.password + suffix;
			authCodeElId = elIds.authCode + suffix;
		}
		
		var dc={
				UserName:getDom(usernameElId).value,
				Password:getDom(passwordElId).value
			};
		if (Member.isNeedVerifyCode) {
			dc.AuthCode=getDom(authCodeElId).value;
			dc.IsVerifyCode=true;
		}
		Member.jsonpLogin(dc);
	}
	//退出处理
	function commentLogout() {
		Member.jsonpLogout();
	}
	
	//评论提交检查
	function formSubmit(event) {
		if (cmt_isNeedLogin && !Member.isLogined) {			
			Dialog.alert(localsForComment.Comment_CommentLoginFirst);
			return false;
		}
		var event = event || window.event,
		target = event.target || event.srcElement;
		var isReply = target.id !== elIds.submitBtn,
		contentId = elIds.textarea,
		checkboxId = elIds.checkbox,
		commtiurl = localsForComment.CommitUrl + '?ContentID=' + localsForComment.ContentID + '&ContentType=' + localsForComment.Catalog_ContentType + '&CatalogID=' + localsForComment.CatalogID + '&SiteID=' + localsForComment.SiteID,
		contentEl;
		var commentRefered=null;
		if (isReply) {
			contentId += suffix;
			checkboxId += suffix;
			commentRefered=$(target).closest('div.textCon').get(0);
		}
		contentEl = getDom(contentId);
		if (contentEl.value.trim() == "" || contentEl.value.trim() == localsForComment.Comment_CivilizedComments) {
			Dialog.alert(localsForComment.Comment_CommentContentEmpty);
			contentEl.focus();
			return false;
		} else if (contentEl.value.length > MaxLength) {
			Dialog.alert(localsForComment.Comment_ContentMore);
			return false;
		}
		var content=contentEl.value;
		commtiurl = commtiurl + "&CmntContent=" + encodeURIComponent(contentEl.value);
		commtiurl = commtiurl + "&CmntCheckbox=" + getDom(checkboxId).checked;
		if (isReply) {
			commtiurl = commtiurl + "&ParentID=" + $V(elIds.parent + suffix);
		} else {
			commtiurl = commtiurl + "&ContentScore=" + $V(elIds.score);
		}
		loadJsonp(commtiurl, function commentCommitResult(result) {
			if (!result.Status) {
				Dialog.alert(result.Message);
				return;
			}
			//提交成功（可能需要审核）
			if(typeof addComment!=='undefined'){//认为是评论列表页，忽略审核提示信息
				if(isReply){
					addCommentReply({
						addUser:getDom(checkboxId).checked ?localsForComment.Comment_Anonymous:Member.isLogined,
						content:content,
						id:result.id||0,
						message:result.Message
					},commentRefered);
				}else{
					addComment({
						score:$V(elIds.score),
						addUser:getDom(checkboxId).checked ?localsForComment.Comment_Anonymous:Member.isLogined,
						content:content,
						id:result.id||0,
						message:result.Message
					});
				}
			}else{//详细页评论弹出审核提示信息
				if(result.Message){Dialog.alert(result.Message);}
			}
			$("#"+elIds.textarea+(isReply ? suffix:"")).val("");
			$("#"+elIds.counter+(isReply ? suffix:"")).html('0');
			//隐藏评论框
			if(isReply){
				getDom(elIds.replyBox).style.display='none';
			}
		});
	}

	var showresult = function (result) {
		if (result.Status) {
			initfaceVote();
		} else {
			Dialog.alert(result.Message);
		}
	};
	var submitMoodInit = function (faceId) {
		var dc = {
			CmntCheckbox : $V("#cmt_CmntCheckbox"),
			ContentID : localsForComment.ContentID,
			CatalogID : localsForComment.CatalogID,
			ContentType : localsForComment.ContentType,
			faceId : faceId
		};
		Server.sendRequest('CommentFaceVote/add', dc, Comment.showresult);
	};
	function initfaceVote() {
		var dc = {
			SiteID : localsForComment.SiteID,
			ContentID : localsForComment.ContentID,
			CatalogID : localsForComment.CatalogID
		};
		Server.sendRequest('comment/initFaceVote', dc, Comment.showVote);
	}
	var showVote = function (data) {
		//data的数据结构:[{VoteResult:'',Percent:'',srcurl:'',VoteMood:''}...]
		var listvotehtml = "";
		if(!getDom('ul_Moods')){
			return;
		}
		var tmp = getDom("_zving_faceVote").innerHTML;
		for (var j = 0; j < data.length; j++) {
			//适配
			var dataItem = {
				VoteResult : data[j].VoteResult,
				Percent : data[j].Percent,
				srcurl : localsForComment.Prefix + data[j].srcurl,
				VoteMood : data[j].VoteMood,
				faceId : data[j].faceId,
				Visibility : parseFloat(data[j].Percent) ? 'visible' : 'hidden'
			};
			listvotehtml += z.String.tmpl(tmp, (dataItem));
		}
		getDom('ul_Moods').innerHTML = listvotehtml;
	};

	//点击评论列表中回复按钮调用的函数
	var reply = function (el) {
		var id = el.getAttribute('data');
		var cmt_ParentID_reply=getDom(elIds.parent + suffix);
		if(cmt_ParentID_reply){
			cmt_ParentID_reply.value = id;
		}
		var replyWrap = getDom('reply_' + id);
		var replyBox = getDom('replyBox');
		if (replyWrap.childNodes.length < 1) {
			replyWrap.appendChild(getDom('replyBox'));
			replyBox.style.display = 'block';
		} else {
			replyBox.style.display = replyBox.style.display == 'none' ? 'block' : 'none';
		}
	};
	//
	commsupportData = {};
	//处理对评论列表中的评论的"支持"、"反对"
	var commSupport = function (type, ID) {
		Server.sendRequest('comment/support', {ID:ID,Type:type}, function(result) {
			if(result.Message){Dialog.alert(result.Message);}
			if (result.CommSupport) {
				var eleID = result.Span;
				var ele = getDom(eleID);
				var value = ele.innerHTML;
				if (value) {
					ele.innerHTML =Number(value) + 1;
				} else {
					ele.innerHTML = 1;
				}
			}
		});
	};

	var Comment={
			reply : reply,
			//处理评论列表中的回复点击事件（展开评论编辑块）
			showVote : showVote,
			//初始化页面时显示表情投票信息
			submitMoodInit : submitMoodInit,
			//点击表情图标时触发的jsonp中的callback
			showresult : showresult,
			//表情投票后刷新结果
			commentLogout : commentLogout,
			//登出
			commSupport : commSupport //响应评论列表中的支持或反对
		};
	
	window.Comment=Comment;
	//初始化评论框
	cmt_isNeedLogin=window.localsForComment.IsNeedLogin===true||window.localsForComment.IsNeedLogin==='true';
	//判断是否显示评论框（没有评论框或过期时，不显示）
	var commentContainer=getDom(elIds.commentContainer),
		checkStar,checkMood;
	if(!commentContainer){
		return;
	}
	//是否过期
	var cBeginTime = localsForComment.CommentStartTime || '',
	cEndTime = localsForComment.CommentEndTime || '',
	now = new Date().getTime();
	cBeginTime = cBeginTime.length ? DateTime.parseDate(cBeginTime).getTime() : Number.MIN_VALUE;
	cEndTime = cEndTime.length ? DateTime.parseDate(cEndTime).getTime() : Number.MAX_VALUE;
	if (cBeginTime > now || now > cEndTime) {
		return;
	}
	commentContainer.style.display = "block";
	if(checkStar=getDom(elIds.checkStar)){
		checkStar.style.display = "block";
	}
	if(checkMood=getDom("checkMood")){
		checkMood.style.display = "block";
	}
	getCommentCount();
	new z.Rating('rating1');
	//如果需要回复框，就生成一个
	var commentLoginBoxReply=getDom(elIds.replyBoxContainer);
	var textareaIds = [elIds.textarea];
	var submitBtns = [elIds.submitBtn];
	if(commentLoginBoxReply){		
		getDom(elIds.replyBox).style.display='none';
		appendReply();
		getDom(elIds.replyBoxContainer).style.display='block';
		textareaIds.push(elIds.textarea+suffix);
		submitBtns.push(elIds.submitBtn+suffix);
	}
	//评论框中交互处理		
	//登录，注册事件处理
	var loginBtns=[elIds.loginBtn,elIds.loginBtn+suffix];
	loginBtns.forEach(function(id){
		var el=getDom(id);
		if(!el){return};
		$(el).on('click',commentLogin);
	});
	var registerBtns=[elIds.registerBtn,elIds.registerBtn+suffix];
	registerBtns.forEach(function(id){
		var el=getDom(id);
		if(!el){return};
		$(el).on('click',Member.register);
	});
	//文本域事件处理
	var textareaIds = [elIds.textarea,elIds.textarea+suffix];
	textareaIds.forEach(function (id) {
		var el = getDom(id);
		if (el) {
			$(el).on('keyup', function () {
				var len = el.value.length;
				var counterEl = getDom(el.id === elIds.textarea ? elIds.counter : elIds.counter + suffix);
				counterEl.innerHTML = len;
			});
			$(el).on('click', function () {
				if (el.innerHTML == localsForComment.Comment_CivilizedComments) {
					el.innerHTML = "";
				}
			});
		}

	});
	//评论提交按钮事件处理
	submitBtns.forEach(function (id) {
		var el = getDom(id);
		if (el&&el.binded!==true) {
			$(el).on('click', formSubmit);
			el.binded=true;
		}
	});
	//处理登录和注销后的局部刷新
	Member.addEventListener('logined',showLogined);
	Member.addEventListener('logout',showLoginForm);
	//验证码改变时，修改评论框中的验证码
	Member.addEventListener('authcodechange',function(imgUrl){
		$('#'+elIds.authImg+',#'+elIds.authImg+suffix).css('background','url('+imgUrl+') no-repeat center center');
	});
	Member.addEventListener('loginerror',function(){
		$('#'+elIds.authCodeContainer+',#'+elIds.authCodeContainer+suffix).show();
	});
	$('#'+elIds.authImg+',#'+elIds.authImg+suffix).click(function(){
		Member.getNewAuthCode();
	});
	Member.addEventListener('needverify',function(userName){
		$('#'+elIds.authCodeContainer+',#'+elIds.authCodeContainer+suffix).show();
	}).addEventListener('notneedverify',function(userName){
		$('#'+elIds.authCodeContainer+',#'+elIds.authCodeContainer+suffix).hide();
	});
	$('#'+elIds.username+',#'+elIds.username+suffix).change(function(){
		Member.needVerifyCode(this.value);
	});
	initfaceVote();
});
 
/******************** frontend\messageBoard.js ********************/ 
﻿jQuery(function($){
	var z=window.Zving,
		loadJs=z.loadJs,
		Server=z.Server,
		getDom=z.getDom,
		Member=z.Member,
		MaxLength=200;
	if (!window.localsForMessageBoard) {
		return;
	}
	var msg_isNeedLogin=false;
	var	elIds={
			messageBoard:'msgBoard',
			contentInput : 'msg_content',
			counter : 'msg_contentCount',
			chkAnonymous: 'msg_chkAnonymous',
			submitBtn : 'msg_submit',
			loginContainer : 'msg_loginContainer',
			username : 'msg_username',
			password : 'msg_password',
			authCode : 'msg_authCode',
			authImg : 'msg_authCodeImg',
			loginBtn : 'msg_frmbutton',
			//commentCount : 'msg_commtotal',
			//personCount : 'msg_commusertotal',
			registerBtn : 'msg_reg',

			userNameLabel:'msg_userNameLabel',
			loginedPanel:'msg_logined',//登录状态内容显示容器
			logoutPanel:'msg_login',//未登录状态内容显示容器
			authCodeContainer:'msg_authCodeContainer',
			loginFrm:'msg_frm'
		};
		
	var showLoginForm=function (reply){
		var panelId=elIds.loginPanel,
			authCodeContainerId=elIds.authCodeContainer,
			frmId=elIds.loginFrm,
			panelEl,authCodeContainerEl,frmEl;

		panelEl=getDom(panelId);
		authCodeContainerEl=getDom(authCodeContainerId);
		frmEl=getDom(frmId);
		
		frmEl.reset();		
		$("#"+(elIds.loginedPanel)).hide();
		$("#"+(elIds.logoutPanel)).show();
		//隐藏验证码
		$("#"+(elIds.authCodeContainer)).hide();
	},
	showLogined=function (userName){
		$('#'+elIds.userNameLabel).html(userName);
		$("#"+(elIds.logoutPanel)).hide();
		$("#"+(elIds.loginedPanel)).show();
	},
	
	//登录处理
	msgLogin=function (event) {
		var event = event || window.event,
			target = event.target || event.srcElement,
			usernameElId=elIds.username,
			passwordElId=elIds.password,
			authCodeElId=elIds.authCode,
			siteIDElId;
		
		var dc={
				UserName:getDom(usernameElId).value,
				Password:getDom(passwordElId).value
			};
		
		if (Member.isNeedVerifyCode) {
			dc.AuthCode=getDom(authCodeElId).value;
			dc.IsVerifyCode=true;
		}
		Member.jsonpLogin(dc);
	},

	submitMessage=function (){
		var contentEl = getDom(elIds.contentInput);
		var content = contentEl.value.trim();
		if (msg_isNeedLogin && !Member.isLogined) {
			Dialog.alert(localsForMessageBoard.Messageboard_LoginFirst);
			return;
		}else if (content == "" ||  content == localsForMessageBoard.Messageboard_CivilizedMessages) {
			Dialog.alert(localsForMessageBoard.Messageboard_ContentEmpty);
			contentEl.focus();
			return false;
		} else if (content.length > MaxLength) {
			Dialog.alert(localsForMessageBoard.Messageboard_ContentMore);
			return false;
		}
		var dc = {
			BoardID: localsForMessageBoard.Request_boardId,
			SiteID: localsForMessageBoard.SiteID,
			//Title: '',
			Content: content,
			Anonymous: getDom(elIds.chkAnonymous).checked
		};
		Server.sendRequest('message/submit', dc,function(result) {
			if (result.error) {
				Dialog.alert(result.error);
				return;
			}
			//默认显示，如果不应该显示时，后端返回noDisplay:true
			if(!result.noDisplay){
				addMessage({
					content:content,
					//addTime:new Date(),
					addUser:dc.Anonymous||!Member.isLogined?localsForMessageBoard.Messageboard_Anonymous:Member.isLogined,
					message:result.message
				});
				$('#'+elIds.contentInput).val("");
				getDom(elIds.counter).innerHTML='0';
			}
		});	
	};

	if(!getDom(elIds.messageBoard)){return;};
	msg_isNeedLogin=localsForMessageBoard.IsNeedLogin == "true";
	//提交
	$('#'+elIds.submitBtn).click(submitMessage);
	//注册
	$('#'+elIds.registerBtn).click(Member.register);
	//登录
	$('#'+elIds.loginBtn).click(msgLogin);
	$('#'+elIds.contentInput).on('keyup', function () {
		var len = this.value.length
		var counterEl = getDom(elIds.counter);
		counterEl.innerHTML = len;	
	}).on('click', function () {
		if (this.innerHTML == localsForMessageBoard.Messageboard_CivilizedMessages) {
			this.innerHTML = "";
		}
	});
	//验证码改变时，修改评论框中的验证码
	Member.addEventListener('authcodechange',function(imgUrl){
		$('#'+elIds.authImg).css('background','url('+imgUrl+') no-repeat center center');
	});
	Member.addEventListener('loginerror',function(){
		$('#'+elIds.authCodeContainer).show();
	});
	$('#'+elIds.authImg).click(function(){
		Member.getNewAuthCode();
	});
	Member.addEventListener('needverify',function(userName){
		$('#'+elIds.authCodeContainer).show();
	}).addEventListener('notneedverify',function(userName){
		$('#'+elIds.authCodeContainer).hide();
	});
	$('#'+elIds.username).change(function(){
		Member.needVerifyCode(this.value);
	});
	Member.addEventListener('logined',showLogined).addEventListener('logout',showLoginForm);
}); 
/******************** retouch.js ********************/ 
(function() {
	var z = window.Zving;
	//$T, $N, $V, $S, $NV, $NS, $F简短别名都在这儿配置
	z.$G = z.getDom;
	z.$T = z.getByTag;
	z.$N = z.getByName;
	if (z.Node) {
		z.$V = z.Node.getValue;
		z.$S = z.Node.setValue;
	}
	z.$NV = z.getValues;
	z.$NS = z.setValues;
	z.$F = z.getForm;
	
	if (!z.Config.namespace || z.Config.namespace === 'window') { //当配置项namespace为window时，把Zving下的所有对象复制到window下
		var p, skipExtra = [];
		var extraObject=/^(\$|Object|Class|Array|Date|Function|String|Node|Event|JSON|Storage|Comment)$/;
		for (p in z) {
			if (typeof(z[p]) === 'undefined' || /^(id|g)$/.test(p)) {
				continue;
			}
			if (typeof(window[p]) !== 'undefined') {
				if (!extraObject.test(p)) {
					skipExtra.push('retouch.js -- ' + p + ' existed in window');
				} else if (extraObject.test(p) && typeof(z[p]) === 'object') { //如果Zving下对象和原生对象重名，则复制对象下的属性/方法
					z.mixIf(window[p], z[p]);
				}
			} else {
				try {
					window[p] = z[p];
				} catch (ex) {
					throw ex;
				}
			}
		}
		if (skipExtra.length && z.Console) {
			z.Console.silence = true; //Console的静默模式，暂存log，不直接显示在页面上
			z.Console.error(skipExtra.join('<br>'));
		}
	} else if (z.Config.namespace !== 'Zving') {
		window[z.Config.namespace] = z;
	}

	if(!window.console.dir){
		window.console.dir = function(obj) {
			if(!/object/.test(Object.prototype.toString.call(obj))){
				return console.log('console can`t dir the arg');
			}
			for(var key in obj){
				console.log(key,': ',obj[key]);
			}
		};
	}
	if (z.Config.ignoreErrors == 'true') { //忽略脚本错误
		window.onerror = function() {
			return false;
		};
	}

	/*在页面关闭时清除对dom元素的缓存，释放内存*/
	$window.on('unload', function() {
		//console.log('retouch.js#67 window unload'+(+new Date()));
		if (z.ComponentManager) {
			z.ComponentManager._unload(); //销毁所有js组件实例
		}
		if (z.AllDocumentsEvent) {
			z.AllDocumentsEvent._unload();
		}
		
		//2013-11-27 清除掉所有有通过jQuery注册事件的元素的事件监听，防止内存泄漏
		var cache=jQuery.cache;
		var el,toRemove=[];
		for(var id in jQuery.cache){
			if(cache[id].handle && (el=cache[id].handle.elem)){
				if(el.nodeName && el.nodeType==1){
					//是元素，不是Document
					toRemove.push( el );
				}
			}
			
		}
		//jQuery.cleanData(toRemove);
		toRemove=null;
		
		z.rootWin=z.rootDoc=null;
		$document.off();
		$window.off();
	});
	var skin = z.Cookie.get("zcms_skin");
	if(skin){
		var stylesheets=document.getElementsByTagName('link');
		for(var i=0,l=stylesheets.length;i<l;i++){
			var href=stylesheets[i].href;
			if(href && href.endsWith(z.CONTEXTPATH+'style/default.css')){
				//引用了style/default.css后，认为是在后台系统中这时才允许使用皮肤样式
				z.Config.skin= skin;
				z.importCSS('../style/'+skin+'/default.css');
				break;
			}
		}
	}

})();
Zving.Skin={};
Zving.Skin.Supported='zvingclassic,zvinggreen,zvingdeep,zvingpurple,zvingred';

Zving.Lang = Zving.Lang || {};
Zving.Lang.Supported = "en,zh-cn,zh-tw";
Zving.Lang.DefaultLanguage = "zh-cn";
 
