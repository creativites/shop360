import {Link} from "react-router-dom";
//商品项目列表
let GoodsItem=props=>{
	let aList=props.items.map((item,i)=>{
		return (
			<a key={i} href={item.href}>
				<img src={"./img/"+item.img_src}/>
				<h5>{item.h5}</h5>
				<p>{item.p}</p>
			</a>
		)
	})
	return aList;
}
//商品列表组件
let Goods = (props)=>{
//	console.log(1);
//	console.log(props.goods);
    return (
        <li>
			<h3>
				<em>——</em> {props.goods.title} <em>——</em>
			</h3>
			<div className="topimg" >
				<Link className="top_a" to={props.goods.bottomimg.href}>
					<img src={"./img/"+props.goods.bottomimg.img_src} />
				</Link>
			</div>
			<div className="goods-item">
				<GoodsItem items={props.goods.ul} />
			</div>
        </li>
    )
}
export class GoodsList extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
    	
//      let domList = this.props.list.map((god,i)=>{
//          //将由Home组件(父组件)传递过来的数据循环迭代 注入到Goods 组件中
//          return <Goods key={i} goods={god} />
//      })
		let domList=[];
		for(var subkey in this.props.list){
			domList.push(<Goods key={subkey} goods={this.props.list[subkey]} />);
		}
        return (
            <ul className="goods-list">
                {domList}
            </ul>
        )
    }
}