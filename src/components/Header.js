import {Link} from "react-router-dom"
export class Header extends React.Component{
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }
    goBack(){
        this.props.hasBack.goBack();
    }

    render(){
        let backBtn = null;
        if(this.props.hasBack){
            backBtn = <a href="javascript:;" onClick={this.goBack} className="back-btn iconfont icon-fenxiang"></a>;
        }
		let toHome=null;
		if(this.props.toHome){
            toHome = <Link className="toHome iconfont icon-home" to="/home" ></Link>;
        }
        return (
            <header>
                {backBtn}
                <h2>{this.props.text}</h2>
                {toHome}
            </header>
        )
    }
}