import { Header } from "../components/Header";
import axios from 'axios'
import {Link} from "react-router-dom";
export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bannerList: [],
            goodsList: {}
        }
    }

    componentDidMount() {
    	document.title="用户登录";
    	console.log(1);
		var oLogin = this.refs.login_btn;
		var oForm = document.getElementsByClassName('login_main');
//		var aInputs = oForm.getElementsByTagName("input");
		var aInputs = $(oForm).find("input").get();
		//检测输入的数据
		function inputChack(name,password){
			if(name.length<2||name.length>12){
				return '用户名应该由2~12个字符组成，不能包含空格';
			}
			if(password.length<6||password.length>12||/\W/g.test(password)){
				return '密码应该由6~12数字、字母、下划线组成，不能包含空格';
			}
			return 'success';
		}
		oLogin.onclick = function(){
			//删除字符中的空格
			var name =aInputs[0].value.replace(/\s/g,'');
			aInputs[0].value=name;
			var password =aInputs[1].value.replace(/\s/g,'');
			aInputs[1].value=password;
			var result=inputChack(name,password);
			if(result!='success'){
				alert(result);
				return;
			}
			$setAjax("post","/php/LoginAndRegist.php",
				'active=login&name='+name+'&password='+password,
				function(data){
					if(data=='true'){
						setCookie('user',name,numofDate(1));
						setCookie('pwd',password,numofDate(1));
						location.href='index.html';
					}else{
						alert(data);
					}
				}
			);
		}
    }
	componentDidUpdate(){
		//代码调试，自动加载到底部
//		document.documentElement.scrollTop= document.documentElement.scrollHeight;
//		console.log(document.documentElement.scrollHeight);
//		window.scrollTo(0,0);
	}
    render() {
        return (
            <div>
                <Header text="用户登录" hasBack={this.props.history}/>
                <div className="login_main">
                	<div className="input">
                		<span>用户名:</span>
                		<input id="username" type="text" placeholder="请输入您的用户名"/>
                	</div>
                	<div className="input mar20" >
                		<span>密码:</span>
                		<input id="pwd" type="password" placeholder="请输入密码"/>
                	</div>
                	<div ref="login_btn" id="login_btn" className="login_btn">登录</div>
                	<Link className="login_btn" to="/">快速注册</Link>
                </div>
            </div>
        )
    }
}