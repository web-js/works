var id = getExtraDataByKey('id')||GetQueryString('id');;

function is_weixin(){
 	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {//如果在微信浏览器端
		document.getElementById('back').style.display="none";
		document.getElementById('center').style.marginTop=0;
		document.getElementById('feedHead').style.display="block";
		document.getElementById('feedBox').style.marginTop="0.5rem";
	} else {
	 	return false;
	}
}
is_weixin();
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 

var feedbackVM = new Vue({
	el:'#feedbackVM',
	data:{
		content:'',
		id:''
	},
	methods:{
		feedback:function(){
			
			if(this.content == ''){
				mui.toast('内容不得为空！');
			}else{
				getPostData('pm.proposal.add',{
			   		'memberId':id,
			   		'content':this.content,
			   		'method':'pm.proposal.add'
			   	},function(data,isSuccess){
			   		mui.toast('反馈提交成功！');
			   		setTimeout(function(){
			   			feedbackVM.content = '';
			   			mui.back();
			   		},1000);
			   		if(isAndroid){
						jsObj.fanhui(null);
					}else if(isiOS){
						window.webkit.messageHandlers.fanhui.postMessage(null);
					}
			   	})
			}
		}
	},
	created:function(){},
	mounted:function(){}
});
