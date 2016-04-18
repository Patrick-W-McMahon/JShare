;(function($,window,document,undefined){
	var pluginName="JShare";
	var self;
	var pageUrl = window.location.href;
	var defaults={
		windowWidth:600,
		windowHeight:450,
		message:document.title,
	};
	var urlPaths={
			facebook:"http://www.facebook.com/sharer/sharer.php?sdk=joey&amp;u={pageUrl}&amp;display=popup&amp;ref=plugin&amp;src=share_button",
			twitter:"https://twitter.com/intent/tweet?original_referer={pageUrl}&amp;ref_src=twsrc%5Etfw&amp;text={msg}&amp;tw_p=tweetbutton&amp;url={pageUrl}",
	};
	var valArr={
		pageUrl:pageUrl,
		msg:document.title,
	}
	
	$.fn[pluginName]=function(options){
		return this.each(function(){
			if(!$.data(this,'plugin_'+pluginName)){
				$.data(this,'plugin_'+pluginName,new Plugin(this,options));
			}
		});
	}
	
	//Plugin constructor
	function Plugin(element,options){
		self = this;
		this.element = element;
		this.options = $.extend({},defaults,options);
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
		return this;
	}
	
	Plugin.prototype.init=function(){
		$(this.element).find('[data-share]').each(function(index, node){
			var shareType = $(this).attr("data-share");
			console.log(shareType);
			$(this).attr("href","javascript:void(0);");
			$(this).click(function(){
				switch(shareType){
					case "facebook":
					case "twitter":
						valArr.msg=self.options.message;
						var url = stringBuilder(urlPaths[shareType],valArr);
						PopupCenterDual(url,(shareType.slice(0,1).toUpperCase() + shareType.slice(1)),self.options.windowWidth,self.options.windowHeight);
					break;
					case "email":
						$(this).attr("href","mailto:?subject="+document.title+"&body="+escape(window.location.href));
					break;
				}
			});
		});
	}
	
	function stringBuilder(url,valArr){
		var str = url;
		for(n in valArr){
			console.log(n);
			while(str.indexOf("{"+n+"}")!=-1){
				str = str.replace("{"+n+"}",valArr[n]);
			}
		}
		return str;
	}
	
	function PopupCenterDual(url, title, w, h) {
		// Fixes dual-screen position Most browsers Firefox
		var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
		width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
		var left = ((width / 2) - (w / 2)) + dualScreenLeft;
		var top = ((height / 2) - (h / 2)) + dualScreenTop;
		var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
		// Puts focus on the newWindow
		if (window.focus) {
			newWindow.focus();
		}
	}
	
})(jQuery,window,document);
