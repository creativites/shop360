<?php
	//解决乱码
	header("Content-type:text/html;charset=utf-8");
	//获取数据
	$active=$_POST['active'];
	$name=$_POST['name'];
	$password=$_POST['password'];
//	if(true){
//		echo '对不起，你太丑，不允许你使用！';
//		exit;
//	}
	//检测字符串是否包含空格
	//strpos()返回字符串在另一字符串中第一次出现的位置，如果没有找到字符串则返回 FALSE。
	if(strpos($name, ' ')){
		echo '用户名不能包含空格';
		exit;
	}
	if(strpos($password, ' ')){
		echo '密码不能包含空格';
		exit;
	}
	//检测字符串长度是否合适
	if(strlen($name)<2||strlen($name)>12){
		echo '用户名应该2~12位,中文1~4位';
		exit;
	}
	if(strlen($password)<6||strlen($password)>12){
		echo '密码应该6~12位';
		exit;
	}
	//屏蔽字符
	$arr=array("xing","shuai","邢","帅"); 
	if($active=="regist"){
		for($i=0;$i<count($arr);$i++){
			//stripos()不区分大小写
			if(stripos("|".$name, $arr[$i])){
				echo '不能包含敏感词，注意文明用语';
				exit;
			}
		}
	}
	try{
		//链接数据库
		$con = mysql_connect("localhost", "root", "123456");
		//选择数据库
		mysql_select_db("students");
		
	}catch(Exception $e){
		echo $e;
		//退出
		exit;
		
	}
	//解决查询到的数据乱码问题
	mysql_query("set names 'utf8'");
	mysql_query("set character_set_client=utf8");
	mysql_query("set character_set_results=utf8");
	if($active=="regist"){//注册
		//查询是否已有name
		$result=mysql_query("select name from user where name='$name';");
		$data_a=mysql_fetch_array($result);
		//用户名存在不允许注册
		if($data_a['name']!=''){
			echo $data_a['name'].' ,';
			echo '用户名已存在，请重新注册！';
			exit;
		}
		//拼接sql语句
		$sql="insert into user(name,password) values('$name','$password');";
		//发送sql语句
		try{
			mysql_query($sql);
		}catch(Exception $e){
			echo $e;
			exit;
		}
		echo '恭喜您注册成功，请牢记您的用户名和密码';
	}else if($active=="login"){
		//登陆
		$result_a= check_user();
		echo $result_a;
	}else if($active=="adddata"){  //初次插入商品数据
		$result_a= check_user();
		//用户名和密码验证通过后再进行插入数据
		if($result_a=='true'){
			addData();
		}else{
			echo "用户名和密码非法";
		}
	}else if($active=="adddata_two"){ //更新数据
		$result_a= check_user();
		//用户名和密码验证通过后再进行插入数据
		if($result_a=='true'){
			$data=$_POST['data'];
			$result_a=mysql_query("update user_data set data='".$data."' where user_name='" . $GLOBALS['name'] . "';");
			echo $result_a;
		}else{
			echo "用户名和密码非法"; 
		}
	}else if($active=="showcart"){  //查看购物数据
		$result_a= check_user();
		//用户名和密码验证通过后再进行插入数据
		if($result_a=='true'){
			$result=mysql_query("select data from user_data where user_name='" . $GLOBALS['name'] . "';");
			$data_a=mysql_fetch_array($result);
			echo $data_a["data"];
		}else{
			echo "false";
		}
	}
	//验证用户名和密码是否正确的方法
	function check_user(){
		$result=mysql_query("select password,name from user where name='" . $GLOBALS['name'] . "';");
		$data_a=mysql_fetch_array($result);
		//查看用户名是否存在
		if($data_a['name']==''){
			//$GLOBALS['name']方法体内只能这样访问全局变量
			return $GLOBALS['name']." ,用户名不存在，请注册后再登陆！";
		}
		if($GLOBALS['password']==$data_a['password']){
			return 'true';
		}
		return '密码错误，请重新输入密码！';
	}
	//插入商品数据
	function addData(){
		//接收商品名字和数量
		$pro_name=$_POST['pro_name'];
		$pro_num=$_POST['pro_num'];
		//查询数据库中是否已经有这个商品
		$result_a=mysql_query("select data from user_data where user_name='" . $GLOBALS['name'] . "';");
		$data_b=mysql_fetch_array($result_a);
		//如果用户没有添加过商品
		if($data_b==""){
			//插入数据
			//要插入的数据
			$user_data='{"'.$pro_name.'":{"num":'.$pro_num.',"istrue":true}}';
			$result_a=mysql_query("insert into user_data(user_name, data) values('".$GLOBALS['name']."','".$user_data."');");
//			$sites = array("pro_a01"=>array("num"=>20,"istrue"=>true),"pro_a00"=>array("num"=>20,"istrue"=>true));
//			echo json_encode($sites);
//			json_decode($obj)   //将字符串转换成数据结构
			echo "true"; 
		}else{
			echo $data_b['data'];
//			foreach($arr as $key => $link ){
//				echo $link;
//			}
		}
		
	}
?>