//var name = getExtraDataByKey('name')||GetQueryString('name');
var telReg=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
var mobileReg=/^1(3|4|5|7|8)\d{9}$/;
var passwordReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/ ; 
var wait=59;

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//function is_weixin() {
// 	var ua = navigator.userAgent.toLowerCase();
//	if (ua.match(/MicroMessenger/i) == "micromessenger") {//如果在微信浏览器端
//		document.getElementById('header').style.display="none";
//		document.getElementById('content').style.marginTop=0;
//	} else {
//	 	return false;
//	}
//}
//is_weixin();


//密码加密	
/*var encryptAES = function(str){
	var key = ',[AjiEWohgew/.?|';
	var iv = 'alwi2hvnaz.s923k';
	var mode = 'CBC';
	var pad = 'Pkcs7';
	var tstr = CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse(key), {
		iv: CryptoJS.enc.Utf8.parse(iv || key),
		mode: CryptoJS.mode[mode],
		padding: CryptoJS.pad[pad]
	});
	return tstr.toString();
}*/

function pourTime(btn){
	var btn=document.getElementById('reg-rancode');
	if (wait == 0) {  
        btn.removeAttribute("disabled");            
        btn.innerHTML="重新发送";
        wait = 59;  
    } else {  
        btn.setAttribute("disabled", true);  
        btn.innerHTML="("+wait + "s)重新发送";  
        wait--;  
        setTimeout(function() {  
            pourTime(btn);
        },1000)  
    }  
}

document.getElementById('reg-rancode').onclick=function(){
	if(document.getElementById('name').value==''){
		mui.toast('请输入手机号');
	}else if(!(mobileReg.test(document.getElementById('name').value))) {
		mui.toast('请输入正确的手机号码');
	} else{
		var _self = this;
		getPostData("pm.login.code", {
			'method' : "pm.login.code",
			'name':document.getElementById('name').value
		}, function(data, isSuccess) {
			console.log(data);
				if(isSuccess) {
					if(data.code=='000'){
						mui.toast('验证码已发送，请注意查收');
						pourTime();
					}else{
						mui.toast(data.description);
					}
				}
		});
	}
}

document.getElementById('submitForm').onclick=function(){
	if(document.getElementById('name').value==''){
		mui.toast('请输入手机号');
	}else if(!(mobileReg.test(document.getElementById('name').value))){
		mui.toast('手机格式不正确');
	}else if(document.getElementById('shenfenVM').value==''){
		mui.toast('请输入验证码');
		console.log(document.getElementById('shenfenVM').value);
	}else if(document.getElementById('password').value==''){
		mui.toast('请输入密码');
	}else{
		getPostData("pm.login.updatepsw",{
			'method' : "pm.login.updatepsw",
			'name':document.getElementById('name').value,
			'code':document.getElementById('shenfenVM').value,
//					'password':encryptAES(this.password),
			'password':document.getElementById('password').value,
		},function(data, isSuccess){
			console.log(data)
			
			mui.toast(data.description);
        	if(data.code=='000'){
        		if(isiOS){
					window.webkit.messageHandlers.tijiao.postMessage(null);
				}
				setTimeout(function(){
					createWin('login', 'login.html', null);
				},1000)
        	}
		});
	}
}
