import {NavLink} from "react-router-dom"

let Item = props => {
    return (
        <li>
            <NavLink to={props.path}>
                <div className={"iconfont "+props.icon}></div>
                <p>{props.text}</p>
            </NavLink>
        </li>
    )
}

export class Footer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            navList : [
                {text:"首页",path:"/home",icon:"icon-home"},
                {text:"分类",path:"/goods",icon:"icon-liebiaomoshi"},
                {text:"购物车",path:"/shopCar",icon:"icon-cart"},
                {text:"我",path:"/myShow",icon:"icon-mine"}
            ]
        }
    }

    render(){
        let domList = this.state.navList.map((nav,i)=>{
        	//...展开直接传值
            return <Item key={i} {...nav} />
        })

        return (
            <footer>
                <ul>
                    {domList}
                </ul>
            </footer>
        )
    }
}