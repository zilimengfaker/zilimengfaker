//站点自定义javascript放到本文件
$(function(){
	// 手机端搜索显示/隐藏
	$('.soBtn').click(function(event) {
		$(this).toggleClass('open');
		if( $(this).hasClass('open') ){
			$('.head_xs .search-query').stop().slideDown();
		}else{
			$('.head_xs .search-query').stop().slideUp();
		}
	});
	
	$(".btn_xs").click(function(event) {
		$(this).toggleClass("btn_xs-click");
	})
	
	
	$(".index-nav li").click(function(e){
		$(this).find('.sub').slideToggle();
		$(this).siblings().find('.sub').slideUp();
		$(".ccfBtnDown").slideUp();
		e.stopPropagation();
	});
	
	
	$('.catalogNav_list li').click(function(){
		$(this).toggleClass('cur');
		$(this).find("ul").slideToggle();
		$(this).siblings().removeClass("cur").find("ul").slideUp();
	});
	
	$(".myCCFBtn").click(function(e){
		$(".ccfBtnDown").slideToggle();	
		$(".index-nav li").find('.sub').slideUp();
		e.stopPropagation();
	})
	//视频详细页修改
	$(".m-voide .brief").click(function(e){
		$(".brief .txt").slideToggle();
		e.stopPropagation();
	})
	
	$(document).click(function(){
		$(".ccfBtnDown").slideUp();	
		$(".index-nav li").find('.sub').slideUp();	
		$(".brief .txt").slideUp();	
	})
	
	//tab切换
	$('.tab-box .tab-con').eq(0).show();
	$('.tab-index a').hover(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$('.tab-box .tab-con').eq($('.tab-index a').index(this)).show().siblings().hide();
	})

})