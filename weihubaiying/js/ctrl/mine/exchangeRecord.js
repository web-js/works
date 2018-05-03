var member = GetQueryString('member')||getExtraDataByKey('member')||JSON.parse(localStorage.getItem(app.userlocalKey)).id;
function is_weixin() {
 	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {//如果在微信浏览器端
		document.getElementById('header').style.display="none";
		document.getElementById('content').style.marginTop=0;
	} else {
	 	return false;
	}
}
is_weixin();

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var mainVM = new Vue({
	el:"#mainVM",
	data:{
		memberId:'',
		data:'',
		lw:[]
	},
	methods:function(){
		
	},
	mounted:function(){
		exchangeR()
	}
});

function exchangeR(){
	getPostData('pm.member.withdrawallog',{
		'method':'pm.member.withdrawallog',
		'sign':'',
		'memberId':member
	},function(data,isSuccess){
//		console.log(data);
		if(isSuccess){
			mainVM.data = data.data;
			var list = data.data.lw;
			mui.each(list,function(index,val){
				val.createTime = new Date(val.createTime).toLocaleString();
			});
			mainVM.lw = list;
			console.log(mainVM.lw)
		}
	})
};
/*function getLocalTime(nS) {     
    return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
}*/
Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "." + ((this.getMonth() + 1)<10?'0'+(this.getMonth() + 1):(this.getMonth() + 1)) + "." + (this.getDate()<10?'0'+this.getDate():this.getDate());
};
mui('body').on('tap','.mui-action-back',function(){
	mui.back();
	if(isAndroid){
		jsObj.fanhui(null);
	}else if(isiOS){
		window.webkit.messageHandlers.fanhui.postMessage(null);
	}
});