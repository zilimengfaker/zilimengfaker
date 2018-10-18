(function(){
	function getCurrentScript(base) {
        if (document.currentScript) {  
            return document.currentScript.src; //FF,Chrome  
        };  
        var stack;
        try {
            a.b.c(); //强制报错,以便捕获e.stack
        } catch (e) { //safari的错误对象只有line,sourceId,sourceURL
            stack = e.stack;
            if (!stack && window.opera) {
                //opera 9没有e.stack,但有e.Backtrace,但不能直接取得,需要对e对象转字符串进行抽取
                stack = (String(e).match(/of linked script \S+/g) || []).join(" ");
            }
        }
        if (stack) {
            stack = stack.split(/[@ ]/g).pop(); //取得最后一行,最后一个空格或@之后的部分
            stack = stack[0] === "(" ? stack.slice(1, -1) : stack.replace(/\s/, ""); //去掉换行符
            return stack.replace(/(:\d+)?:\d+$/i, ""); //去掉行号与或许存在的出错字符起始位置
        }
        var nodes = (base ? document : head).getElementsByTagName("script"); //只在head标签中寻找
        for (var i = nodes.length, node; node = nodes[--i]; ) {
            if ((base || node.className === moduleClass) && node.readyState === "interactive") {
                return node.className = node.src;
            }
        }
    }
	var _Zving = window.Zving;
    var jspath = getCurrentScript(true);
	var scripts = document.getElementsByTagName('script'),
		script = scripts[scripts.length - 1];
    if(!jspath){
		jspath = script.hasAttribute ? script.src : script.getAttribute('src', 4); //ie下通过getAttribute('src', 4)才能获取全路径
	}
    var contextPath=script.getAttribute('contextpath');
	script=null;

	var z = {
		version: '0.7',
		JSLIBPATH: jspath.substr(0, jspath.lastIndexOf('/') + 1),
		Config: {
			namespace: 'window',
			context: 'backend',
			debug: 'no',
			skin: 'default'
		}
	};
	if(z.JSLIBPATH.indexOf(location.protocol + '//' + location.host + '/')==0){
		z.JSLIBPATH=z.JSLIBPATH.replace(location.protocol + '//' + location.host,'');
	}
	if (_Zving && _Zving.version === z.version && _Zving.JSLIBPATH === z.JSLIBPATH) {
		return; //防止重复加载
	} else {
		window.Zving = z;
	}
	//提供设置上下文的途径
	
	//再外部没配置应用路径时才使用默认路径
	if(!(z.CONTEXTPATH=contextPath)){
		z.CONTEXTPATH = z.JSLIBPATH.replace(/[^\/]+\/?$/, '');
		if(z.CONTEXTPATH.indexOf('/preview/') != -1){
			z.CONTEXTPATH=z.CONTEXTPATH.substr(0,z.CONTEXTPATH.indexOf('preview/'));
		}
	}

	z.importJS = z.importJs = function(url) {
		if (!/^\/|^\w+\:\/\//.test(url)) {
			url = z.JSLIBPATH + url;
		}
		document.write('<script type="text/javascript" src="' + url + '"><\/script>');
	};
	/**
	 异步加载CSS文件
	 url:css文件路径，相对于引用js框架的页面，如果要从js框架根目录开始引用需自行加上z.JSLIBPATH
	 **/
	//往指定的同源页面窗口加载样式文件（求url为相对于win中页面的地址）
	z.loadCSS = z.loadCss = function(url,win) {
			win=win&&z.isWindow(win)?win:window;
			var document=win.document;
			
			var head = document.getElementsByTagName('head')[0] || document.documentElement;
			if (document.createStyleSheet) {//注意：IE11的不再支持document.createStyleSheet
				document.createStyleSheet(url);
			} else {
				var e = document.createElement('link');
				e.rel = 'stylesheet';
				e.type = 'text/css';
				e.href = url;
				head.appendChild(e);
			}
	};
	z.importCSS = z.importCss = function(url,win) {
		win=win&&z.isWindow(win)?win:window;
		var document=win.document;
		
		if (!/^\/|^\w+\:\/\//.test(url)) {
			url = z.JSLIBPATH + url;
		}
		if (!document.body || document.readyState == 'loading') {
			document.write('<link rel="stylesheet" type="text/css" href="' + url + '" />');
		} else {
			z.loadCSS(url);
		}

	};

	if (/:\/\/(develop)/.test(location.href)) {
		z.importCss('_source/css/msgpop.css');
		z.importCss('_source/css/tip.css');
		z.importCss('_source/css/dialog.css');
		z.importCss('_source/css/calendar.css');
		var jsFiles='';
		jsFiles='jquery.min.js core/core.js core/function.js core/class.js core/helper.js core/string.js core/array.js core/dateTime.js core/util.js core/date.js core/JSON.js core/customEvent.js core/observable.js core/dataCollection.js core/prototype.js core/dom.js core/event.js core/eventManager.js core/url.js core/node.js core/$Node.js core/drag.js core/page.js core/cookie.js core/dataGSetter.js core/form.js core/lang.js lang/zh-cn.js components/server2.0.js components/componentManager.js components/UICompBase.js components/layer.js components/tip.js components/msgPop.js components/verify.js components/dialog2.0.js components/datePicker.js components/uploader.js';
		jsFiles +=' frontend/rating.js frontend/member.js frontend/comment.js frontend/messageBoard.js retouch.js';
		jsFiles=jsFiles.replace(/\\/g,'/').split(/ +/);
		for (i = 0; i < jsFiles.length; i++) {
			z.importJs('_source/' + jsFiles[i]);
		}
	}else{
		z.importCss('zcms_components.css');
		z.importJs('zcms_common.js');
		z.importJs('zcms_frontend.js');
	}
})();

