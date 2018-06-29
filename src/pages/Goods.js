import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GoodsList } from "../components/GoodsList";
import {NavLink,Link} from "react-router-dom"
import axios from 'axios'
let LeftNav=props=>{ //左边导航栏
	let aList=props.list.map((item,i)=>{
		return (
			<a className={i==0? "active":""} key={i} href="javascript:;" onClick={props.fun}>
				{item}
			</a>
		)
	});
	return aList;
}
//商品列表
let Products=props=>{
	let aList=props.list.map((item,i)=>{
		return (
			<Link key={i} to={item.goodsID?item.href+""+item.goodsID:item.href}>
				<img src={"./img/"+item.img_src}/>
				<div className="right_box">
					<p>{item.h5}</p>
					<span>{item.p}</span>
				</div>
			</Link>
		)
	});
	return aList;
}
export class Goods extends React.Component{
    constructor(props){
        super(props);

        this.state = {
        	category:[],	//类别
            phone_list : [],  //手机
            digital_products:[], //数码
            car_products:[],	//汽车用品
			computer_products:[], //电脑周边
			home_products:[],	//家用电器
			exercise_products:[], //运动产品
			more_products:[],  	//更多
			show_list:[]
        }
        this.a_click=this.a_click.bind(this);
    }
	a_click(){
	}
    componentDidMount(){
//  	console.log($("#leftNav").get(0).nodeName);
    	//设置左边导航栏的高度
//  	console.log(document.documentElement.clientHeight);
    	var node =document.getElementById("leftNav");
    	node.style.height=document.documentElement.clientHeight+"px";
    	axios.get('./data/phone_show.json')
			.then(response => {
//					console.log(response.data);
				let newList = response.data.product.map(item=>{
					let goodsID=item.goodsID?item.goodsID:null;
					return {
						href:item.href,
						img_src:item.img_src,
						h5:item.p,
						p:item.span,
						goodsID:goodsID
					}
				});
                //将封装好的数据赋给当前组件状态 从而使<GoodsList>组件接收到的值发生更新
                this.setState({
                    phone_list : newList,
                    show_list:newList
                });
                this.show_list=newList;
			})
			.catch(error => {
				console.log(error);
				alert('网络错误，不能访问');
			});
    	axios.get('./data/01index.json')
			.then(response => {
//					console.log(response.data);
				let newList = response.data.main;
				let list=[];
				for(let sub in newList){
					list.push(newList[sub].title);
				}
                //将封装好的数据赋给当前组件状态 从而使<GoodsList>组件接收到的值发生更新
                this.setState({
                	category:list,
                    digital_products : newList[".floorbox2"].ul,
                    car_products : newList[".floorbox3"].ul,
                    computer_products : newList[".floorbox4"].ul,
                    home_products : newList[".floorbox5"].ul,
                    exercise_products : newList[".floorbox6"].ul,
                    more_products : newList[".floorbox7"].ul
                })
//	                console.log(this.state.digital_products);
			})
			.catch(error => {
				console.log(error);
				alert('网络错误，不能访问');
			});
    }
    shouldComponentUpdate(newProps,newState){
    	if(newState.show_list==this.state.show_list&&this.state.category.length!=0){
    		console.log("阻止视图更新");
    		return false;
    	}
    	console.log("视图更新");
//  	console.log(newState);
    	return true;
    }
	componentDidUpdate(){
		document.title="商品分类";
		let _this=this;
		$("#leftNav a").on("click",function(){
			$(this).parent().find("a").removeClass("active");
			$(this).addClass("active");
			let index=$(this).index();
			switch(index){
				case 0:
					_this.setState({
						show_list:_this.state.phone_list
					});
					break;
				case 1:
					_this.setState({
						show_list:_this.state.digital_products
					});
					break;
				case 2:
					_this.setState({
						show_list:_this.state.car_products
					});
					break;
				case 3:
					_this.setState({
						show_list:_this.state.computer_products
					});
					break;
				case 4:
					_this.setState({
						show_list:_this.state.home_products
					});
					break;
				case 5:
					_this.setState({
						show_list:_this.state.exercise_products
					});
					break;
				case 6:
					_this.setState({
						show_list:_this.state.more_products
					});
					break;
				default:
					alert("程序运行出错");
			}
		})
	}
    render(){
        return (
            <div>
            	{/*Header没有分配路由因此没有history对象，需要进行传递*/}
                <Header text="商品分类" hasBack={this.props.history} toHome={true}/>
                <div className="category">
                    <div id="leftNav" className="category_leftnav">
                    	<LeftNav list={this.state.category} fun={this.a_click}/>
                    </div>
                    <div className="category_main">
                    	<Products list={this.state.show_list}/>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}