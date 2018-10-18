window.jQuery.bootstrapFlag = true;

/* ! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(h,j,e){var a="placeholder" in j.createElement("input");var f="placeholder" in j.createElement("textarea");var k=e.fn;var d=e.valHooks;var b=e.propHooks;var m;var l;if(a&&f){l=k.placeholder=function(){return this};l.input=l.textarea=true}else{l=k.placeholder=function(){var n=this;n.filter((a?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":c,"blur.placeholder":g}).data("placeholder-enabled",true).trigger("blur.placeholder");return n};l.input=a;l.textarea=f;m={get:function(o){var n=e(o);var p=n.data("placeholder-password");if(p){return p[0].value}return n.data("placeholder-enabled")&&n.hasClass("placeholder")?"":o.value},set:function(o,q){var n=e(o);var p=n.data("placeholder-password");if(p){return p[0].value=q}if(!n.data("placeholder-enabled")){return o.value=q}if(q==""){o.value=q;if(o!=j.activeElement){g.call(o)}}else{if(n.hasClass("placeholder")){c.call(o,true,q)||(o.value=q)}else{o.value=q}}return n}};if(!a){d.input=m;b.value=m}if(!f){d.textarea=m;b.value=m}e(function(){e(j).delegate("form","submit.placeholder",function(){var n=e(".placeholder",this).each(c);setTimeout(function(){n.each(g)},10)})});e(h).bind("beforeunload.placeholder",function(){e(".placeholder").each(function(){this.value=""})})}function i(o){var n={};var p=/^jQuery\d+$/;e.each(o.attributes,function(r,q){if(q.specified&&!p.test(q.name)){n[q.name]=q.value}});return n}function c(o,p){var n=this;var q=e(n);if(n.value==q.attr("placeholder")&&q.hasClass("placeholder")){if(q.data("placeholder-password")){q=q.hide().next().show().attr("id",q.removeAttr("id").data("placeholder-id"));if(o===true){return q[0].value=p}q.focus()}else{n.value="";q.removeClass("placeholder");n==j.activeElement&&n.select()}}}function g(){var r;var n=this;var q=e(n);var p=this.id;if(n.value==""){if(n.type=="password"){if(!q.data("placeholder-textinput")){try{r=q.clone().attr({type:"text"})}catch(o){r=e("<input>").attr(e.extend(i(this),{type:"text"}))}r.removeAttr("name").data({"placeholder-password":q,"placeholder-id":p}).bind("focus.placeholder",c);q.data({"placeholder-textinput":r,"placeholder-id":p}).before(r)}q=q.removeAttr("id").hide().prev().attr("id",p).show()}q.addClass("placeholder");q[0].value=q.attr("placeholder")}else{q.removeClass("placeholder")}}}(this,document,jQuery));
/*
 * ! screenfull v1.0.4 - 2013-05-26
 * https://github.com/sindresorhus/screenfull.js (c) Sindre Sorhus; MIT License
 */
(function(a,b){"use strict";var c="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,d=function(){for(var a,c,d=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"]],e=0,f=d.length,g={};f>e;e++)if(a=d[e],a&&a[1]in b){for(e=0,c=a.length;c>e;e++)g[d[0][e]]=a[e];return g}return!1}(),e={request:function(a){var e=d.requestFullscreen;a=a||b.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?a[e]():a[e](c&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){b[d.exitFullscreen]()},toggle:function(a){this.isFullscreen?this.exit():this.request(a)},onchange:function(){},onerror:function(){},raw:d};return d?(Object.defineProperties(e,{isFullscreen:{get:function(){return!!b[d.fullscreenElement]}},element:{enumerable:!0,get:function(){return b[d.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!b[d.fullscreenEnabled]}}}),b.addEventListener(d.fullscreenchange,function(a){e.onchange.call(e,a)}),b.addEventListener(d.fullscreenerror,function(a){e.onerror.call(e,a)}),a.screenfull=e,void 0):a.screenfull=!1})(window,document);

// data-shift api
+function ($) { "use strict";

 /*
	 * SHIFT CLASS DEFINITION ======================
	 */

  var Shift = function (element) {
    this.$element = $(element)
    this.$prev = this.$element.prev()
    !this.$prev.length && (this.$parent = this.$element.parent())
  }

  Shift.prototype = {
  	constructor: Shift

    , init:function(){
    	var $el = this.$element
    	, method = $el.data()['toggle'].split(':')[1]    	
    	, $target = $el.data('target')
    	$el.hasClass('in') || $el[method]($target).addClass('in')
    }
    , reset :function(){
    	this.$parent && this.$parent['prepend'](this.$element)
    	!this.$parent && this.$element['insertAfter'](this.$prev)
    	this.$element.removeClass('in')
    }
  }

 /*
	 * SHIFT PLUGIN DEFINITION =======================
	 */

  $.fn.shift = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('shift')
      if (!data) $this.data('shift', (data = new Shift(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.shift.Constructor = Shift
}(jQuery);

Date.now = Date.now || function() { return +new Date; };

+function ($) {

  $(function(){

    // toogle fullscreen
    $(document).on('click', "[data-toggle=fullscreen]", function(e){
      if (screenfull.enabled) {
        screenfull.request();
      }
    });

  	// placeholder
  	$('input[placeholder], textarea[placeholder]').placeholder();

    // popover
    $("[data-toggle=popover]").popover();
    $(document).on('click', '.popover-title .close', function(e){
    	var $target = $(e.target), $popover = $target.closest('.popover').prev();
    	$popover && $popover.popover('hide');
    });

    // ajax modal
    $(document).on('click', '[data-toggle="ajaxModal"]',
      function(e) {
        $('#ajaxModal').remove();
        e.preventDefault();
        var $this = $(this)
          , $remote = $this.data('remote') || $this.attr('href')
          , $modal = $('<div class="modal" id="ajaxModal"><div class="modal-body"></div></div>');
        $('body').append($modal);
        $modal.modal();
        $modal.load($remote);
      }
    );
    
    // dropdown menu
    $.fn.dropdown.Constructor.prototype.change = function(e){
      e.preventDefault();
      var $item = $(e.target), $select, $checked = false, $menu, $label;
      !$item.is('a') && ($item = $item.closest('a'));
      $menu = $item.closest('.dropdown-menu');
      $label = $menu.parent().find('.dropdown-label');
      $labelHolder = $label.text();
      $select = $item.find('input');
      $checked = $select.is(':checked');
      if($select.is(':disabled')) return;
      if($select.attr('type') == 'radio' && $checked) return;
      if($select.attr('type') == 'radio') $menu.find('li').removeClass('active');
      $item.parent().removeClass('active');
      !$checked && $item.parent().addClass('active');
      $select.prop("checked", !$select.prop("checked"));

      $items = $menu.find('li > a > input:checked');
      if ($items.length) {
          $text = [];
          $items.each(function () {
              var $str = $(this).parent().text();
              $str && $text.push($.trim($str));
          });

          $text = $text.length < 4 ? $text.join(', ') : $text.length + ' selected';
          $label.html($text);
      }else{
        $label.html($label.data('placeholder'));
      }      
    }
    $(document).on('click.dropdown-menu', '.dropdown-select > li > a', $.fn.dropdown.Constructor.prototype.change);

  	// tooltip
    $("[data-toggle=tooltip]").tooltip();

    // class
  	$(document).on('click', '[data-toggle^="class"]', function(e){
  		e && e.preventDefault();
  		var $this = $(e.target), $class , $target, $tmp, $classes, $targets;
  		!$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
    	$class = $this.data()['toggle'];
    	$target = $this.data('target') || $this.attr('href');
      $class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
      $target && ($targets = $target.split(','));
      $targets && $targets.length && $.each($targets, function( index, value ) {
        ($targets[index] !='#') && $($targets[index]).toggleClass($classes[index]);
      });
    	$this.toggleClass('active');
  	});

    // panel toggle
    $(document).on('click', '.panel-toggle', function(e){
      e && e.preventDefault();
      var $this = $(e.target), $class = 'collapse' , $target;
      if (!$this.is('a')) $this = $this.closest('a');
      $target = $this.closest('.panel');
        $target.find('.panel-body').toggleClass($class);
        $this.toggleClass('active');
    });
  	
  	// carousel
  	$('.carousel.auto').carousel();
  	
  	// button loading
  	$(document).on('click.button.data-api', '[data-loading-text]', function (e) {
  	    var $this = $(e.target);
  	    $this.is('i') && ($this = $this.parent());
  	    $this.button('loading');
  	});
 	
    var $window = $(window);
    // mobile
  	var mobile = function(option){
  		if(option == 'reset'){
  			$('[data-toggle^="shift"]').shift('reset');
  			return true;
  		}
  		$('[data-toggle^="shift"]').shift('init');
      return true;
  	};
  	// unmobile
  	$window.width() < 768 && mobile();
    // resize
    var $resize, $width = $window.width();
  	$window.resize(function() {
      if($width !== $window.width()){
        clearTimeout($resize);
        $resize = setTimeout(function(){
          setHeight();
          $window.width() < 768 && mobile();
          $window.width() >= 768 && mobile('reset') && fixVbox();
          $width = $window.width();
        }, 500);
      }
  	});

    // fluid layout
    var setHeight = function(){
      $('.app-fluid #nav > *').css('min-height', $(window).height());
      return true;
    }
    setHeight();
    
    // fix vbox
    var fixVbox = function(){
      $('.ie11 .vbox').each(function(){
        $(this).height($(this).parent().height());
      });
    }
    fixVbox();

    // collapse nav
    $(document).on('click', '.nav-primary a', function (e) {
      var $this = $(e.target), $active;      
      $this.is('a') || ($this = $this.closest('a'));
      if( $('.nav-vertical').length ){
        return;
      }
      
      $active = $this.parent().siblings( ".active" );
      $active && $active.find('> a').toggleClass('active') && $active.toggleClass('active').find('> ul:visible').slideUp(200);
      
      ($this.hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
      $this.toggleClass('active').parent().toggleClass('active');
      
      $this.next().is('ul') && e.preventDefault();

      setTimeout(function(){ $(document).trigger('updateNav'); }, 300);
    });

    // dropdown still
    $(document).on('click.bs.dropdown.data-api', '.dropdown .on, .dropup .on', function (e) { e.stopPropagation() });

  });
}(jQuery);

$(function() {
	// 搜索事件
	$(".search").each(function() {
		var ele = this;
		$(ele).find(".search-query").focus(function() {
			var b = $(ele).find(".search-submit");
			if (b) {
				b.addClass("enterclick");
			}
		});
		$(ele).find(".search-query").blur(function() {
			var b = $(ele).find(".search-submit");
			if (b) {
				b.removeClass("enterclick");
			}
		});
		$(ele).find(".search-submit").click(function() {
			var q = $(ele).find(".search-query");
			var s = $(ele).find(".search-synonym");
			var t = $(ele).find(".search-titleonly");
			if (q.val()) {
				var url = frontAppContext + "search/result?SiteID=" + siteID + "&Query=" + encodeURIComponent(q.val());
				if (s.attr("checked")) {
					url += "&usingSynonym=Y";
				}
				if (t.val()) {
					url += "&TitleOnly=" + t.val();
				}
				window.location.href = url;
			}
		});
	});

	// 搜索热词加链接
	$(".searchwords a").each(function() {
		var url = frontAppContext + "search/result?SiteID=" + siteID + "&Query=" + encodeURIComponent($(this).text());
		$(this).attr("href", url);
	});

	// 加了enterclick的元素会自动响应回车键
	$(document).keyup(function(e) {
		if (e.which == 13) {
			$(".enterclick:first").click();
		}
	});

	// 会员登录信息显示
	function showMemberName() {
		var name = Cookie.get("_ZMemberName");
		if (name) {
			$(".member-span-logined").removeClass("hide");
			$(".member-username").text(name);
			$(".member-username").attr("href", frontAppContext + "member/info?SiteID=" + siteID);
		} else {
			$(".member-span-login").removeClass("hide");
		}
		var url = encodeURIComponent(window.location.href);
		
		if(url.indexOf("Referer") > -1){
			url = url.substring(url.indexOf("Referer") + 10);
			url = decodeURIComponent(url);
		}
		$(".member-register").attr("href", frontAppContext + "member/register?SiteID=" + siteID +"&Referer=" + url);
		$(".member-login").attr("href", frontAppContext + "member/login?SiteID=" + siteID + "&Referer=" + url);
		$(".member-logout").attr("href", frontAppContext + "member/logout?SiteID=" + siteID + "&Referer=" + url);
		$(".member-forgetpassword").attr("href", frontAppContext + "member/forget/login?SiteID=" + siteID + "&Referer=" + url);
	}

	// 在这个电脑上记住我
	if (Cookie.get("_ZMemberStand") && !Cookie.get("_ZMemberName")) {
		Server.sendRequest("Member.RememberMe", {}, function(response) {
			showMemberName();
		});
	} else {
		// 前端应用和静态页面域名可能不同
		if (!Cookie.get("_ZMemberName")) {
			Server.sendRequest('member/logined', {}, function(result) {
				Cookie.set("_ZMemberName",result.UserName,null,"/");
 				showMemberName();
			});
		}else{
			showMemberName();
		}
	} 
	
	// 退出登录
	$(".member-logout").click(function() {
		Cookie.remove("_ZMemberName","/");
		Cookie.remove("_ZMemberStand","/");
 		var url = frontAppContext + 'member/logout?' + new Date().getTime();
		window.location.href = url;
	});

	// 站点加入收藏
	$(".site-favorites").click(function() {
		var url = $(this).attr("url");
		var title = $(this).attr("title");
		if (url == "http:///") {
			return;
		}
		try {
			window.external.addFavorite(url, title);
		} catch (e) {
			try {
				window.sidebar.addPanel(title, url, "");
			} catch (e) {
				MsgPop("加入收藏失败,请按Ctrl+D进行收藏");
			}
		}
	});

	// 电子邮箱
	$(".register-email").change(function() {
		Server.sendRequest("Member.checkEmail", {
			"Email" : $(this).val()
		}, function(response) {
			var t = $(".register-email");
			if (response.Count == 0) {
				t.removeAttr("hasVerifyError");
				t.removeAttr("verifyMessage");
			} else {
				t.attr("hasVerifyError", true);
				t.attr("verifyMessage", "电子邮箱己被其他用户使用!");
			}
			Verify.checkOne(null, t.get(0));
		});
	});

	// 验证码
	$(".verify-code-img").attr("src", frontAppContext + "authCode.zhtml?Height=21&Width=50");
	$(".verify-code-img").parent().css("padding-top", "0px").css("padding-bottom", "0px");
	$(".verify-code-img").click(function() {
		$(this).attr("src", frontAppContext + "authCode.zhtml?Height=21&Width=50&" + new Date().getTime());
	});

	$(".verify-code").keyup(function() {
		if ($(this).val().length != 5) {
			$(this).attr("hasVerifyError", true);
			$(this).attr("verifyMessage", "验证码不正确!");
			return;
		}
		Server.sendRequest("Login.verifyCodeCheck", {
			"VerifyCode" : $(this).val()
		}, function(response) {
			var vc = $(".verify-code");
			if (response.Flag) {
				vc.removeAttr("hasVerifyError");
				vc.removeAttr("verifyMessage");
			} else {
				vc.attr("hasVerifyError", true);
				vc.attr("verifyMessage", "验证码不正确!");
			}
			Verify.checkOne(null, vc.get(0));
		});
	});

	// 密码及重复密码
	$(".password-confirm").keyup(function() {
		var p = $(".password").val();
		if (p != $(this).val()) {
			$(this).attr("hasVerifyError", true);
			$(this).attr("verifyMessage", "两次输入密码不一致!");
		} else {
			$(this).removeAttr("hasVerifyError");
			$(this).removeAttr("verifyMessage");
			Verify.checkOne(null, $(this).get(0));
		}
	});

	// 会员菜单
	$(".member-menu").each(function() {
		var url = $(this).attr("href");
		var address = window.location.href;
		if (address.indexOf("?") > 0) {
			address = address.substring(0, address.indexOf("?"));
			var t = url;
			if (t.indexOf("?") > 0) {
				t = t.substring(0, t.indexOf("?"));
			}
			if (address.endsWith(t)) {
				$(this).addClass("active");
			}
		}
	});

	// 所有前端链接统一前缀和后缀
	$("a.front-link").each(function() {
		var href = $(this).attr("href");
		if (href.indexOf("?") > 0) {
			href += "&";
		} else {
			href += "?";
		}
		href += "SiteID=" + siteID;
		href = frontAppContext + href;
		$(this).attr("href", href);
	});
});

var Member = window.Member||{};

// 是否已经登录
Member.isLogined = function() {
	var name = Cookie.get("_ZMemberName");
	return name;
};

// 会员收藏夹
Member.addFavorites = function(id, favtype) {
	Server.sendRequest('member/logined', {}, function(result) {
		if (result.IsLogin) {
			if (!id || !favtype) {
				MsgPop(Lang.get("Verify.HasError"));
				return;
			}
			Server.sendRequest('memberFavorites/add', {
				ID : id,
				FavType : favtype
			}, function(data) {
				MsgPop(data.message);
			});
		} else {
			// 登录
			MsgPop(Lang.get("Member.MustLogin"));
		}
	});
};

// 添加留言
Member.addMessage = function(isNeedLogin,boardId) {
	var content = $(".message-content").val();
	if (isNeedLogin=='true' && !Member.isLogined()) {
		Dialog.alert(Lang.get("Messageboard.LoginFirst"));
		return;
	} else if (!content) {
		Dialog.alert(Lang.get("Messageboard.ContentEmpty"));
		return;
	} else if (content.length > 200) {// 最大长度200
		Dialog.alert(Lang.get("Messageboard.ContentMore"));
		return false;
	}
	var dc = {
		BoardID : boardId,
		SiteID : siteID,
		Content : content,
		Anonymous : $(".message-anonymous").prop("checked")
	};
	Server.sendRequest('message/submit', dc, function(response) {
		if (response.status) {
			MsgPop(response.message);
			setTimeout(function(){window.location.reload();},1000);	
		}else{
			Dialog.alert(response.error);
		}
	});// 成功提示改为冒泡，失败则提示失败原因
};

// 添加评论
Member.addComment = function(ele) {
	var comment = $(ele).closest(".comment");
	if (comment.length == 0) {
		Dialog.alert("评论框未处于含有.comment样式的元素内!");
		return;
	}
	var content = comment.find(".comment-content").val();
	if (variablesForComment.IsNeedLogin && !Member.isLogined()) {
		Dialog.alert(Lang.get("Messageboard.LoginFirst"));
		return;
	} else if (!content) {
		Dialog.alert(Lang.get("Messageboard.ContentEmpty"));
		return;
	} else if (content.length > 200) {// 最大长度200
		Dialog.alert(Lang.get("Messageboard.ContentMore"));
		return false;
	}
	var parentID = 0;
	var functions = comment.closest(".comment-functions");// 如果是在回复处直接显示评论框则应被含有.comment-function的元素包裹
	if (functions.length != 0) {
		parentID = functions.attr("parentID");
	}
	var dc = {
		ContentID : variablesForComment.ContentID,
		SiteID : siteID,
		CmntContent : content,
		ParentID : parentID,
		CmntCheckbox : comment.find(".comment-anonymous").prop("checked")
	};
	Server.sendRequest('comment/commit', dc, function(response) {
		if (response.Status) {
			MsgPop(response.Message);
			setTimeout(function(){window.location.href = $(".comment-listlink").attr("href");},1000);
		}else{
			Dialog.alert(response.Message);
		}
	});// 成功提示改为冒泡，失败则提示失败原因
};

// 初始化评论框
Member.initComment = function(ele) {
	// 详细页评论列表链接及参与人数
	$(ele).find(".comment-listlink").each(function() {
		var href = frontAppContext + "comment/list?ContentID=";
		href += variablesForComment.ContentID;
		href += "&CatalogID=" + variablesForComment.CatalogID;
		href += "&SiteID=" + siteID;
		$(this).attr("href", href);
	});
	$(ele).find(".comment-persontotal").each(function() {
		$(this).text(variablesForComment.PersonTotal);
	});
};

Member.commentSupport = function(type, ele) {
	var functions = $(ele).closest(".comment-functions");
	if (functions.length == 0) {
		return;
	}
	var parentID = functions.attr("parentID");
	var dc = {
		ID : parentID,
		Type : type
	};
	Server.sendRequest('comment/support', dc, function(response) {
		if (response.CommSupport) {
			var span = $(ele).find("span");
			span.text(parseInt(span.text()) + 1);
		} else {
			MsgPop(response.Message);
		}
	});
};

// 添加表情评论
Member.addFaceVote = function (faceId) {
	var dc = {
		ContentID : variablesForComment.ContentID,
		CatalogID : variablesForComment.CatalogID,
		ContentType : variablesForComment.ContentType,
		faceId : faceId
	};
	Server.sendRequest('CommentFaceVote/add', dc, function(response) {
		if (response.Status) {
			Member.initFaceVote();
		} else {
			MsgPop(response.Message);
		}
	});
};
// 初始化表情评论,FaceIDs允许设置只显示某些表情
Member.initFaceVote = function () {
	if($('.moods').length == 0){
		return;
	}
	var dc = {
		SiteID : siteID,
		ContentID : variablesForComment.ContentID,
		CatalogID : variablesForComment.CatalogID,
		// FaceIDs : "170,174,467"//多个表情以逗号分割
	};
	Server.sendRequest('comment/initFaceVote', dc, Member.showVote);
}
// 显示表情评论
Member.showVote = function (data) {
	// data的数据结构:[{VoteResult:'',Percent:'',srcurl:'',VoteMood:''}...]
	var listvotehtml = "";
	
	var tmp = $(".mood_template").html();
	var length = data.length;
	var size = parseInt(12/length);
	if(size == 0){
		size = 1;
	}
	for (var j = 0; j < length; j++) {
		// 适配
		var dataItem = {
			Size : size,
			VoteResult : data[j].VoteResult,
			Percent : data[j].Percent,
			srcurl : variablesForComment.Prefix + data[j].srcurl,
			VoteMood : data[j].VoteMood,
			faceId : data[j].faceId,
			Visibility : parseFloat(data[j].Percent) ? 'visible' : 'hidden'
		};
		listvotehtml += String.tmpl(tmp, (dataItem));
	}
	$('.moods').html(listvotehtml);
};

$(function() {
	Member.initFaceVote();
	Member.initComment(document.body);
	var anti = $(".comment-anti");
	anti.attr("href", "#");
	anti.click(function() {
		Member.commentSupport('anti', this);
		return false;
	});

	var support = $(".comment-support");
	support.attr("href", "#");
	support.click(function() {
		Member.commentSupport('support', this);
		return false;
	});

	var reply = $(".comment-reply")
	reply.attr("href", "#");
	reply.click(function() {
		var comment = $(this).parent().next(".comment-reply-div");
		if (comment.length != 0) {
			comment.toggle();
		} else {
			var div = $(".comment-reply-div");
			if (div.length == 0) {
				var html = $(".comment").prop("outerHTML");
				html = "<div class='comment-reply-div bg-light lt'>" + html + "</div>";
				$(this).parent().after(html);
				$(this).parent().next(".comment-reply-div").find(".comment-listlink").parent().hide();
			} else {
				div.detach();
				$(this).parent().after(div);
				div.show();
			}
		}
		return false;
	});
});

(function () {
	// 视频播放器宽于窗口宽度时，调整一下宽度
	if(window.jwplayer){
		var vplayer = jwplayer('video_zvideoplayer')
	    vplayer.onReady(function (e) {
			var vw=$(window).width();
			if(vw<=640){
				var w = this.getWidth(),
				h = this.getHeight();
				if(w>vw){
					this.container.parentNode.style.margin=0;
					this.container.parentNode.parentNode.style.margin=0;
					this.resize(vw-30, Math.round((vw-30)*h/w))
				}
			}
		})
	}
})();
// 全屏工具方法
var FullScreenApi={
	browserPrefix:'',
	supportsFullScreen:false,
	isFullScreen: function() { 
		switch (this.browserPrefix){
			case '':
				return document.fullScreen;
			case 'webkit':
				return document.webkitIsFullScreen;
			default:
				return document[this.browserPrefix+'FullScreen'];
		}
	},
	fullscreenchange: function() { 
		return (this.browserPrefix === '') ? 'fullscreenchange' : this.browserPrefix + 'fullscreenchange';
	},
	requestFullScreen: function(el){
		return (this.browserPrefix === '') ? el.requestFullScreen() : el[this.browserPrefix + 'RequestFullScreen']();
	},
	cancelFullScreen: function(el){
		return (this.browserPrefix === '') ? el.cancelFullScreen() : el[this.browserPrefix+ 'CancelFullScreen']();
	},
	zoomInIcon: function(imgWrapEl){
		switch (this.browserPrefix){
			case '':
				imgWrapEl.style.cursor='pointer';
			case 'webkit':
				imgWrapEl.style.cursor='-webkit-zoom-in';
			default:
				imgWrapEl.style.cursor='-moz-zoom-in';
		}        
	},
	zoomOutIcon: function(imgWrapEl){
		switch (this.browserPrefix){
			case '':
				imgWrapEl.style.cursor='pointer';
			case 'webkit':
				imgWrapEl.style.cursor='-webkit-zoom-out';
			default:
				imgWrapEl.style.cursor='-moz-zoom-out';
		}    
	},
	init: function(){
		if(typeof document.cancelFullScreen!='undefined'){
			this.supportsFullScreen=true;
		}else{
			var pfxArr = ["webkit", "moz", "ms", "o", "khtml"];
			for(var i=0, len=pfxArr.length; i<len; i++){
				this.browserPrefix = pfxArr[i];
				if (typeof document[this.browserPrefix + 'CancelFullScreen' ] != 'undefined' ) {
					this.supportsFullScreen=true;
					break;
				}
				
			}
		}
	}
}; 

// Hammer.js作为jqeury插件
function hammerify(el, options) {
    var $el = $(el);
    if(!$el.data("hammer")) {
        $el.data("hammer", new Hammer($el[0], options));
    }
}

$.fn.hammer = function(options) {
    return this.each(function() {
        hammerify(this, options);
    });
};

// extend the emit method to also trigger jQuery events
Hammer.Manager.prototype.emit = (function(originalEmit) {
    return function(type, data) {
        originalEmit.call(this, type, data);
        $(this.element).trigger({
            type: type,
            gesture: data
        });
    };
})(Hammer.Manager.prototype.emit);

(function () {
	var imageCarousel = $('#imageCarousel');
	if(!imageCarousel.length){
		return
	}
	// 对图片播放器进行触屏的支持
	$('#imageCarousel').hammer().on('swipeleft', function(){
		$(this).carousel('next');
	});
	$('#imageCarousel').hammer().on('swiperight', function(){
		$(this).carousel('prev');
	});
	// 对键盘快捷键的支持
	$(document).on('keyup',function(e){
		if(e.keyCode==39){// ->
			$('#imageCarousel').carousel('next');
		}if(e.keyCode==37){// <-
			$('#imageCarousel').carousel('prev');
		}
	})
	// 对全屏的支持
	FullScreenApi.init();
	if (FullScreenApi.supportsFullScreen) {
		$('#imageCarousel2FullScreen').on('click', function (e) {
			FullScreenApi.requestFullScreen($('#imageCarousel').get(0))
		})
	}
	// 对列表和大图模式切换
	$('#viewModeTrigger').on('click',function(e){
		if($('#imageCarousel').hasClass('slide-show-list')){
			$('#imageCarousel').removeClass('slide-show-list');
			$('#viewModeTrigger').find('span:contains(大图查看)').text('列表查看')
		}else{
			$('#imageCarousel').addClass('slide-show-list');
			$('#viewModeTrigger').find('span:contains(列表查看)').text('大图查看')
			$('#imageCarousel').carousel('pause')
		}
	})
})();