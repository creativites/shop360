import { Header } from "../components/Header";
import { Banner } from "../components/Banner";
import { GoodsList } from "../components/GoodsList";
import axios from 'axios'
let Lis=props=>{
	let arr=props.list.map((item,i)=>{
		if(i==0){
			return "";
		}
		return (
			<li key={i} className={props.active[props.sub]==(i-1)?"active":""}>
				<a href={item.href}>{item.text}</a>
			</li>
		)
	})
	return arr;
}
let Kinds=props=>{
	let active=props.list.active;
	let arr=props.list.cate.map((item,i)=>{
		return (
			<div key={i} className={(i+1)==props.list.cate.length?"kind_item item_bor0":"kind_item"}>
				<span>{item[0]}</span>
				<ul>
					{/*传入多个值*/}
					<Lis list={item} active={active} sub={i}/>
					{/*<li ><a href="#">深海蓝</a></li>
					<li className="active"><a href="#">钛泽银</a></li>
					<li><a href="#">极夜黑</a></li>*/}
				</ul>
			</div>
		)
	});
	return arr;
//	return (
//		<div>
//			<div className="kind_item">
//				<span>颜色</span>
//				<ul className="">
//					<li ><a href="#">深海蓝</a></li>
//					<li className="active"><a href="#">钛泽银</a></li>
//					<li><a href="#">极夜黑</a></li>
//				</ul>
//			</div>
//			<div className="kind_item">
//				<span>型号</span>
//				<ul>
//					<li className="active"><a href="#">碎屏险套装</a></li>
//					<li><a href="#">裸机版</a></li>
//					<li><a href="#">音乐套装</a></li>
//				</ul>
//			</div>
//			<div className="kind_item">
//				<span>版本</span>
//				<ul>
//					<li><a href="#">4+64G</a></li>
//					<li className="active"><a href="#">6+128G</a></li>
//					<li><a href="#">6+64G</a></li> 
//				</ul>
//			</div>
//		</div>
//	)
}
export class Detail extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            goods:{}
        }
    }

    componentDidMount(){
    	document.title="商品详情";
        //拿到需要展示的商品ID
        let goodsID = this.props.match.params.goodsID;
//		console.log(goodsID);
		axios.get('./data/product_list.json')
			.then(response => {
				let goods=response.data[goodsID]?response.data[goodsID]:{};
//				console.log(goods);
				this.setState({
					goods:goods
				})
			})
			.catch(error => {
				console.log(error);
				alert('网络错误，不能访问');
			});
    }

    render(){
//  	let str=this.state.goods[".main_wrap .sInfo_a"]?this.state.goods[".main_wrap .sInfo_a"].strong:"";
//  	console.log(str);
		if(this.state.goods[".main_wrap .sInfo_a"]){
			let data=this.state.goods;
			//设置商品类别选择行内样式
			let kinds_show=data.item_cate.cate.length==0?{display:"none"}:{display:"block"};
			return (
			    <div>
			        <Header text="商品详情" toHome={true} hasBack={this.props.history} />
			        <div className="detail_main">
			        	<div className="product_img">
			        		<img src={"./img/"+data.s_box}/>
			        	</div>
			        	{/*商品信息*/}
			        	<div className="product_info">
			        		<div className="info_title">
			        			{data[".main_wrap .sInfo_a"].strong}
			        		</div>
			        		<div className="itemAdWords">
			        			<span>
			        				{data[".main_wrap .sInfo_a"].p.text+" "}
			        				<a href={data[".main_wrap .sInfo_a"].p.href}>
			        					{data[".main_wrap .sInfo_a"].p.a_text}
			        				</a>
			        			</span>
			        		</div>
			        		<div className="info_price">{data.s_price}</div>
			        	</div>
			        	{/*赠品*/}
			        	<div className="gift" style={data.gift.text=="无"?{display:"none"}:{display:"block"}}>
							<i>赠品</i>
							<span className="span_a">
								<a href={data.gift.href}>{data.gift.text}</a>
							</span>
							<span className="span_b">{data.gift.num}</span>
						</div>
			        	{/*商品类别选择*/}
			        	<div className="product_select">
			        		<div className="kinds" style={kinds_show}>
			        			<Kinds list={data.item_cate}/>
			        		</div>
			        		{/*数量选择*/}
			        		<div className="product_number">
			        			<p>数量</p>
								<div className="pro_num">
									<a href="javascript:;">-</a>
										<span>1</span>
									<a href="javascript:;">+</a>
								</div>
			        		</div>
			        	</div>
			        	{/*商品介绍*/}
			        	<div className="product_desc">
			        		<div className="desc_title">
			        			<a className="active" href="javascript:;">商品详情</a>
			        			<a href="javascript:;">规格参数</a>
			        			<a className="bor0" href="javascript:;">常见问题</a>
			        		</div>
			        		{/*详情图片*/}
			        		<div className="img_box">
			        			<img src={"./img/"+data.product_img}/>
			        		</div>
			        	</div>
				        <div className="product_addcart">
				        	<a href="javascript:;" className="content_a">
				        		<i className="iconfont icon-31pinglun"></i>
				        	</a>
				        	<a href="javascript:;" className="cart">
				        		<i className="iconfont icon-chaoshi"></i>
				        	</a>
				        	<a href="javascript:;" className="addcart">
				        		{data.s_price} 加入购物车
				        	</a>
				        </div>
			        </div>
			    </div>
			)
		}else{
			return (
				<div>
					<Header text="商品详情" toHome={true} hasBack={this.props.history} />
				</div>
			)
		}
    }
}