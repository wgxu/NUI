/**
 * @author: xuwg
 * @datetime: 2016/9/12
 * @description [框架js文件]
 */

var frame = {
	//页面事件
	pageEvent: function(){
        this.SelectedNavCache = {
            isSelected: false,
            first: null,
            second: null,
            thrid: null
        };
		//点击顶部菜单
		$(".SysTop").on("click",".SysNavList a",function(){
			var data = $(this).data(), //读取绑定到dom的数据
				index = $(this).index(),
				LeftBarTempl = doT.template($("#LeftBarTempl").html()),
				LeftBarMinTempl = doT.template($("#LeftBarMinTempl").html());

			$(this).addClass("active").siblings().removeClass("active");
			$(".SysSecNav").html(''); //清空二级菜单
			$(".SysLeftBarMinList").html(''); //清空缩放二级菜单
			if(index == frame.SelectedNavCache.first) {
				data.children["navSelected"] = frame.SelectedNavCache;
			}
			$(".SysSecNav").append(LeftBarTempl(data.children));
			$(".SysLeftBarMinList").append(LeftBarMinTempl(data.children));
			var name = $(this).find("p").html();
			$("#LeftBarName").text(name);
		});

		//点击二级菜单
		$(".SysLeftBar").on("click",".SysBarNavList",function(){
			var len = $(this).next().children().length;
			if(len == 0) {
				var index = $(this).parent().index();
				$(".SysLeftBarMinList").children().eq(index).addClass("SysNavActive").siblings().removeClass("SysNavActive");
				$(".SysBarNavList").removeClass("SysNavActive");
				$(".SysBarHomePage").removeClass("SysNavActive");
				$(".SysLeftBarMinHome").removeClass("SysNavActive");
				$(".SysThirdNav li").removeClass("NavActive");
				$(this).addClass("SysNavActive");
				var navData = {};
				navData["name"] = $(this).find("p").html();
                navData["url"] = $(this).find("p").attr("data-url");
				navData["id"] = $(this).attr("data-id");
				tabObject.addTabNav(navData);

				//缓存选择菜单索引
				frame.SelectedNavCache.isSelected = true;
				$(".SysNavList a").each(function(i){
					if($(this).hasClass("active")) {
						frame.SelectedNavCache.first = i;
					}
				});
				var index = $(this).parent().index();
				frame.SelectedNavCache.second = index;
				frame.SelectedNavCache.thrid = null;
				return;
			}
            var flagOpen = false;
            if($(this).next().is(":visible")) {
                flagOpen = true;
            }
            $(".SysThirdNav:visible").slideUp("slow");
            if(!flagOpen) {
                $(this).next(".SysThirdNav").slideToggle("slow");
            }
		});

		//点击三级菜单
		$(".SysLeftBar").on("click",".SysThirdNav li",function(){
			$(".SysThirdNav li").removeClass("NavActive");
			$(".SysBarNavList").removeClass("SysNavActive");
			$(".SysBarHomePage").removeClass("SysNavActive");
			$(".SysLeftBarMinHome").removeClass("SysNavActive");
			var index = $(this).parent().parent().parent().index();
			$(".SysLeftBarMinList").children().eq(index).addClass("SysNavActive").siblings().removeClass("SysNavActive");
			$(this).addClass("NavActive");
			$(this).parent().parent().prev().addClass("SysNavActive");
			var navData = {};
			navData["name"] = $(this).find("p").text();
            navData["url"] = $(this).attr("data-url") ? $(this).attr("data-url") : '';
			navData["id"] = $(this).attr("data-id");
			tabObject.addTabNav(navData);

			//缓存选择菜单索引
			frame.SelectedNavCache.isSelected = true;
			$(".SysNavList a").each(function(i){
				if($(this).hasClass("active")) {
					frame.SelectedNavCache.first = i;
				}
			});

			var index2 = $(this).parent().parent().parent().index();
			frame.SelectedNavCache.second = index2;

			var index3 = $(this).index();
			frame.SelectedNavCache.thrid = index3;

		});

		//点击首页
		$(".SysBarHomePage").click(function(){
			$(".SysThirdNav li").removeClass("NavActive");
			$(".SysBarNavList").removeClass("SysNavActive");
			$(".SysPagesList a").removeClass("SysPageActive");
			$(".SysLeftBarMinItem").removeClass("SysNavActive");

			$(this).addClass("SysNavActive");
			$(".SysDefPage").addClass("SysPageActive");
			$(".SysLeftBarMinHome").addClass("SysNavActive");
			$(".SysFrameList iframe").eq(0).removeClass("SysHide").siblings().addClass("SysHide");

		});

		//点击收缩按钮
		$(".SysBarName img").on("click",function(){
			if(!$(".SysLeftBar").is(":animated")) {
				$(".SysLeftBar").animate({
					width: "60"
				},function(){
					$(".SysLeftBar").addClass("SysHide");
					$(".SysLeftBarMin").removeClass("SysHide");
				});
				$(".SysRightCont").animate({
					left: '60'
				});
			}

		});

		//点击伸展按钮
		$(".SysLeftBarMinBar img").on("click",function(){
			if(!$(".SysLeftBar").is(":animated")) {
				$(".SysLeftBar").removeClass("SysHide");
				$(".SysLeftBarMin").addClass("SysHide");
				$(".SysLeftBar").animate({
					width: "180"
				});
				$(".SysRightCont").animate({
					left: '180'
				});
			}
		});

	},
	//渲染模板
	renderTempl: function(data){
		var index = 0, //默认显示第一个菜单
			TopTempl = doT.template($("#TopNavTempl").html()),
			LeftBarTempl = doT.template($("#LeftBarTempl").html()),
			LeftBarMinTempl = doT.template($("#LeftBarMinTempl").html());
		data["active"] = index;



		// 渲染顶部菜单 
		$(".SysNavList").append(TopTempl(data));
		// 渲染二级菜单
		$(".SysSecNav").append(LeftBarTempl(data[index].children));
		//渲染二级最小菜单
		$(".SysLeftBarMinList").append(LeftBarMinTempl(data[index].children));

		//把实例绑定到dom中
		for(var i = 0; i < data.length; i++) {
			$(".SysNavList a").eq(i).data(data[i]);
		}
	}
};
var defaultData = {},  //设置页面默认显示数据
	tabObject;         //tab插件实例
$(function(){
	// 渲染菜单
	utilHB.ajax(unRealUrl.navData,function (res) {
		//给首页赋值
		$('#LeftBarName').text(res[0].name);
		frame.renderTempl(res);
		frame.pageEvent();
		getDefaultData(res[0]);
		//实例化tab插件
		var opts = {},
			arr = [];
		defaultData['del'] = false;  //设置默认tab选项不可删除
		arr.push(defaultData);
		opts['data'] = arr;
		$("#frameWrap").tabIframe(opts);
		tabObject = $("#frameWrap").data();
	},{},'get');
});

/**
 * 递归获取默认数据obj
 * @param res
 */
function getDefaultData(res) {
	if(res.children && res.children.length) {
		getDefaultData(res.children[0]);
	}else {
		defaultData['name'] = res.name;
		defaultData['id'] = res.id;
		defaultData['url'] = res.resource.resourceUrl ? res.resource.resourceUrl : '';
	}
}