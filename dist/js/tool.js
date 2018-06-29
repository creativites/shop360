//判断给定字符是否是字母
function isABC(charStr){
	if(charStr >= "a" && charStr <= "z" || charStr >= "A" && charStr <= "Z"){
		return true;
	}else{
		return false;
	}
}
//随机生成一个长度为4，只包含数字和字母的验证码
function testCode(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var num = Math.floor(Math.random() * 100);
		if(num >= 0 && num <= 9){
			arr.push(num);
		}else if(num >= 65 && num <= 90){
			arr.push(String.fromCharCode(num));
		}else if(num >= 27 && num <= 52){
			arr.push(String.fromCharCode(num + 70));
		}else{
			i--;
		}
	}
	return arr.join("");
}
//找到给定节点的有相同class值的子节点的集合
function elementsByClassName(parentNode, className){
	//<1>查找parentNode下所有的子节点
	var nodes = parentNode.getElementsByTagName("*");
	var arr = [];
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].className == className){
			arr.push(nodes[i]);
		}
	}
	return arr;
}

//根据#id,.class,targetName获取元素对象
function $get(vArg,parentNode){
	var parent=parentNode?parentNode:document;
	var index=vArg.split('');
	switch(index[0]){
		case "#": //id
			return parent.getElementById(vArg.substring(1));
			break;
		case ".":
			return elementsByClassName(parent, vArg.substring(1));
			break;
		default:
			var subStr = vArg.substring(0, 5);
			if(subStr == "name="){
				return parent.getElementsByName(vArg.substring(5));
			}else{
				return parent.getElementsByTagName(vArg);
			}
			break;
	}
}

//随机颜色
function randomColor(){
	var color = "rgb(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ")";
	return color;
}
//获得元素的生效样式属性
function getStyle(elem, attr){
	//第一个是兼容ie,第二个是通用
	return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem)[attr];
}
//删除给定节点的所有的空白文本子节点
function removeSpaceNode(parseNode){
	var nodes = parseNode.childNodes;
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
			//删除
			parseNode.removeChild(nodes[i]);
		}
	}
}
//将子节点列表中的空白文本节点过滤掉，形成并返回一个由剩下子节点组成的数组
function removeSpaceNode_arr(nodes){
	var res = [];
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
			continue;
		}else{
			res.push(nodes[i]);
		}
	}
	return res;
}
//获取事件的目标对象，传入事件对象
function getTarget(e){
	var target = e.target || window.event.srcElement;
	return target;
}
//跨浏览器添加事件监听器
function addEvent(obj, event_type, fun) {
	if (obj.addEventListener) {
		obj.addEventListener(event_type, fun, false);
	} else if (obj.attachEvent) {
		//兼容ie
		obj.attachEvent('on' + event_type, fun);
	}
}
//跨浏览器移除事件监听器
function removeEvent(obj, event_type, fun) {
	if (obj.removeEventListener) {
		obj.removeEventListener(event_type, fun, false);
	} else if (obj.detachEvent) {
		//兼容ie
		obj.detachEvent('on' + event_type, fun);
	}
}
//事件委托 intrustEvent(被委托节点,事件类型,委托节点,执行函数)
function intrustEvent(obj,event_type,node, fun){
	if (obj.addEventListener) {
		obj.addEventListener(event_type, function(ev){
			var e=ev||window.event;
			var target =e.target||e.srcElement;
			if(target.nodeName.toLowerCase()==node){
				fun.call(target);
			}
		}, false);
	} else if (obj.attachEvent) {
		//兼容ie
		obj.attachEvent('on' + event_type, function(ev){
			var e=ev||window.event;
			var target =e.target||e.srcElement;
			if(target.nodeName.toLowerCase()==node){
				fun.call(target);
			}
		});
	}
}
//元素对象的拖拽
function setDrag(node){
	var offsetX = 0;
	var offsetY = 0;
	//<1>按下
	node.onmousedown = function(ev){
		//记录相对距离
		var e = ev || window.event;
		offsetX = e.clientX - node.offsetLeft;
		offsetY = e.clientY - node.offsetTop;

		//<2>移动，保持相对距离
		document.onmousemove = function(ev){
			var e = ev || window.event;
			node.style.left = e.clientX - offsetX + "px";
			node.style.top = e.clientY - offsetY + "px";

		}

		//<3>抬起，取消拖拽
		document.onmouseup = function(){
			document.onmousemove = null;
		}
	}
}
//取消超链接默认行为
function preDefault(e){
	if(e.preventDefault){
		e.preventDefault();
	}else{
		//兼容ie
		window.event.returnValue = false;
	}
}
//传入数字，获得与当前日期相差num天的日期对象
function numofDate(num){
	var d =new Date();
	d.setDate(d.getDate()+num);
	return d;
}
//创建cookie
function setCookie(name,value,expires,path,domain,secure){
	var cookieText=encodeURIComponent(name)+'='+encodeURIComponent(value);
	if(expires instanceof Date){
		cookieText+=';expires='+expires;
	}
	if(path){
		cookieText+=';path='+path;
	}
	if(domain){
		cookieText+=';domain'+domain;
	}
	if(secure){
		cookieText+=';secure'+secure;
	}
	document.cookie=cookieText;
}
//获取cookie
function getCookie(name){
	var cookieText=decodeURIComponent(document.cookie);
	if(cookieText==''){
		return null;
	}
	var arr_a=cookieText.split('=');
	if(arr_a.length==2){
		if(arr_a[0]==name){
			return arr_a[1];
		}else{
			return null;
		}
	}
	var arr_b=cookieText.split('; ');
	//保存所有的键值对字符串
	var arr_c=[];
	var arr_d=[];
	for(var i in arr_b){
		arr_d=arr_b[i].split('=');
		alert(arr_d);
		arr_c.push(arr_d[0]);
		arr_c.push(arr_d[1]);
	}
	for(var i=0;i<arr_c.length;i++){
		if(arr_c[i]==name){
			return arr_c[(i+1)];
		}
		i++;
	}
	return null;
}
//删除cookie
function removeCookie(name){
	document.cookie = encodeURIComponent(name) + "=;expires=" + new Date(0);
}
//判断一个对象是否为空
function isNullObj(obj){
	for(var i in obj){
		return false;
	}
	return true;
}
//判断两个元素是否碰撞,返回true是碰撞了
function isBump(node1, node2){
	//获得元素的上下左右边界
	var l1 = node1.offsetLeft;
	var r1 = node1.offsetLeft + node1.offsetWidth;
	var t1 = node1.offsetTop;
	var b1 = node1.offsetTop + node1.offsetHeight;

	var l2 = node2.offsetLeft;
	var r2 = node2.offsetLeft + node2.offsetWidth;
	var t2 = node2.offsetTop;
	var b2 = node2.offsetTop + node2.offsetHeight;

	if(!(r1 < l2 || l1 > r2 || t1 > b2 || b1 < t2)){
		return true;
	}else{
		return false;
	}
}
//获得一个ajax对象
function getAjax(){
	var xhr;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xhr;
}
//设置一个ajax,ajax的封装
function $setAjax(methed,addr,data,_ok,_fail){
	var xhr;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		//兼容ie
		xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(methed=="get"){
		//true为异步加载
		if(data!=''){
			xhr.open("get",addr+"?"+data+"&"+new Date().getTime(),true);
		}else{
			xhr.open("get",addr,true);
		}
		xhr.send();
	}else{
		xhr.open("post",addr,true);
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.send(data);
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status==200&& _ok){
				_ok(xhr.responseText);
			}else if(xhr.status!=200){
				if(_fail){
					_fail(xhr.status);
				}
				document.write("Error:"+xhr.status);
			}
		}
	}
}