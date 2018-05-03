var id = getExtraDataByKey('id')||GetQueryString('id');

var telReg=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
var mobileReg=/^1(3|4|5|7|8)\d{9}$/;
var idcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
//var backcardReg = /\d{15}|\d{19}/;
var subtime = localStorage.getItem('yzsj');
var currentTime =  new Date().getTime() - subtime;

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
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 

if(isAndroid){
	document.getElementById('header').style.display="none";
	document.getElementById('content').style.marginTop='0';
}

var mainVM = new Vue({
	el:'#mainVM',
	data:{
		memberId:'',
		code:'',
		true_name:'',
		idcard:'',
		bankcard:'',
		bank_name:'',
		mobile:''
	},
	methods:{
		submitForm:function(){
			if(this.true_name == ''){
				console.log(1);
				mui.toast('请输入您的姓名');
			}else if(this.idcard==''){
				mui.toast('请输入身份证号');
			}
			else if(!(idcardReg.test(this.idcard))){
				mui.toast('身份证号不存在');
			}
			else if(this.bankcard == ''){
				mui.toast('请输入银行卡号');
			}
//			else if(!(backcardReg.test(this.bankcard))){
//				mui.toast('银行卡号不存在');
//			}
			else if(this.mobile==''){
				mui.toast('请输入手机号');
			}else if(!(mobileReg.test(this.mobile))){
				mui.toast('手机格式不正确');
			}else{
				getPostData('pm.login.realName',{
					'method':"pm.member.realName",
					'memberId':id,
					'realname':this.true_name,
					'idcard':this.idcard,
					'bankcard':this.bankcard,
					'mobile':this.mobile
				},function(data,isSuccess){
					console.log(data)
					if(isSuccess){
						if(data.data){
							if(data.data.bankcardverify.status==0){
								mui.toast("实名认证成功");
								setTimeout(function(){
									mui.back();
									var ua = navigator.userAgent.toLowerCase();
									if (ua.match(/MicroMessenger/i) != "micromessenger") {
										window.webkit.messageHandlers.fanhui.postMessage(null);
									}
								});
							}else{
								console.log(data);
								mui.toast(data.data.bankcardverify.info);
							}
						}else{
							console.log(data);
							mui.toast(data.description);
						}
					}
					var submitTime= new Date().getTime();
					cunchu(submitTime);
				});
				localStorage.setItem('bankcard',this.bankcard);
			}
		}
	}
});
function cunchu(time){
	localStorage.setItem('yzsj',time);
}

mui('body').on('tap','.back',function(){
	alert('1');
	mui.back();
	if (isiOS) {
		window.webkit.messageHandlers.fanhui.postMessage(null);
	}
});