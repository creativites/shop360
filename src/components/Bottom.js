import {Link} from "react-router-dom"
export class Bottom extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="bottom">
                <div className="show_more">
                	<Link to="/goods">点击查看更多商品>></Link>
                </div>
                <div className="statement">
                	<div className="contents-item">
                		<i>7</i>
                		<em>7天无理由退货</em>
                		<em>（个别商品除外）</em>
                	</div>
                	<div className="contents-item">
                		<i>15</i>
                		<em>质量问题15天换货</em>
                		<em></em>
                	</div>
                	<div className="contents-item w30">
                		<i>包</i>
                		<em>满99元包邮</em>
                		<em></em>
                	</div>
                </div>
                <div className="help-number">
                	<p>
                		<em>客服热线 : </em>
                		<span>
                			<i>
	                			<a href="tel:400-6822-360">400-6822-360</a>
	                			" 周一到周日 9:00-18:00"
	                		</i>
	                		<i>
	                			<a href="tel:400-0111-366">400-0111-366</a>
	                			(手机类产品)
	                		</i>
	                		<i>
	                			周一至周日 9:00-21:00（仅收市话费）
	                		</i>
	                	</span>
                	</p>
                	<p className="copyright">
                		360商城©2013-2016 版权所有
                	</p>
                </div>
            </div>
        )
    }
}