var member = GetQueryString('member')||JSON.parse(localStorage.getItem(app.userlocalKey)).id;
//var id = getExtraDataByKey('id')||GetQueryString('id');
var personalId = getExtraDataByKey('personalId')||GetQueryString('personalId');
//console.log(personalId);
//GetQueryString('member');
var ua = navigator.userAgent.toLowerCase();
function is_weixin() {
// 	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger"){//如果在微信浏览器端
		document.getElementById('back').style.display="none";
		document.getElementById('center').style.marginLeft=0;
		document.getElementById('reviewHead').style.display="block";
		return true;
	}else{
	 	return false;
	}
}
is_weixin();

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

var reviewVM = new Vue({
	el:'#reviewVM',
	data:{
//		userInfo:JSON.parse(localStorage.getItem(app.userlocalKey)),
		id:'',
		personalId:personalId,
		feedback:''
	},
	methods:{
		  //	    获取id
        gitId:function(){
         	console.log(100);
         	this.id=getExtraDataByKey('id')||GetQueryString('id');
         },
		//审核中
		reviewing:function(){
			if(isAndroid){
				jsObj.fanhui(null);
			}else if(isiOS){
				window.webkit.messageHandlers.fanhui.postMessage(null);
			};
			if (ua.match(/MicroMessenger/i) == "micromessenger"){
				createWin(null, '../index.html', {id:member});
				setTimeout(function(){
					location.reload();
				},1000);
			}
		},
		//审核成功
		reviewOk:function(){
			localStorage.setItem("zmtOk",1);
			if(isAndroid){
				jsObj.fanhui(null);
			}else if(isiOS){
				window.webkit.messageHandlers.fanhui.postMessage(null);
			}
			if (ua.match(/MicroMessenger/i) == "micromessenger"){
				createWin(null, '../index.html', null);
				setTimeout(function(){
					location.reload()
				},1000);
			}
		},
		//审核失败
		unreview: function() {
			localStorage.removeItem("weixin");
			localStorage.removeItem("weibo");
			localStorage.removeItem("qqkongjian");
			localStorage.removeItem("baidutieba");
			localStorage.removeItem("taobao");
			localStorage.removeItem("zmtInfo");
			
//			if(isAndroid){
//				jsObj.fanhui(null);
//			}else if(isiOS){
//				window.webkit.messageHandlers.fanhui.postMessage(null);
//			}
//			if (ua.match(/MicroMessenger/i) == "micromessenger"){
//				createWin(null, '../renzheng/shenfen.html', {id:member});
//				setTimeout(function(){
//					location.reload()
//				},1000);
//			}
          
		}
	},
	mounted:function(){
	   console.log(200);
		$this.gitId();
	}
});
if(id!=null){
	getPostData('pm.media.reback',{
		"method":'pm.media.reback',
		"m_id":id
	},function(data,isSuccess){
		console.log(data);
//		reviewVM.feedback=data.data.feedback;
	});
}
