import {BrowserRouter as Router , Route,Switch,Redirect} from "react-router-dom"
import { Home } from "./pages/Home";
import { Goods } from "./pages/Goods";
import { Detail } from "./pages/Detail";
import { Login } from "./pages/Login";
export class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/goods" component={Goods} />
                    <Route path="/detail/:goodsID" component={Detail} />
                    <Route path="/login" component={Login} />
                    <Redirect from="/" to="/home" exact={true} />
                </Switch>
            </Router>
        );
    }
}