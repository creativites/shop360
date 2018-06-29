import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { Banner } from "../components/Banner";
import { GoodsList } from "../components/GoodsList";
import { Footer } from "../components/Footer";
import { Bottom } from "../components/Bottom";
import axios from 'axios'
export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bannerList: [],
            goodsList: {}
        }
    }

    componentDidMount() {
    	document.title="360商城";
		axios.get('./data/01index.json')
				.then(response => {
//					console.log(response.data);
					let newData = response.data.slidebox.map(goods => {
                    //将数据结构重新封装
                    let obj = {
                    	a_src:goods.href,
                        imgSrc: "./img/"+goods.bg_url
                    }
                    	// 将封装好的数据返回给新的数组
                    	return obj;
                	})
					//将新的数据重新赋给当前组件(Home)的state.bannerList
	                // 由于state.bannerList被传递给了子级(Banner)的props 所以  一旦state.bannerList发生了更新则 子级(Banner)的props也会发生更新
	                this.setState({
	                    bannerList: newData
	                })
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
				});
		axios.get('./data/01index.json')
				.then(response => {
//					console.log(response.data);
					let newList = response.data.main;
	                //将封装好的数据赋给当前组件状态 从而使<GoodsList>组件接收到的值发生更新
	                this.setState({
	                    goodsList : newList
	                })
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
				});
    }
	componentDidUpdate(){
		//代码调试，自动加载到底部
//		document.documentElement.scrollTop= document.documentElement.scrollHeight;
//		console.log(document.documentElement.scrollHeight);
		window.scrollTo(0,0);
	}
    render() {
        return (
            <div>
                <Header text="360商城" />
                <div className="main">
                    <Search />
                    <Banner list={this.state.bannerList} hasPag={true} />
                    <GoodsList list={this.state.goodsList} />
                	<Bottom/>
                </div>
                <Footer />
            </div>
        )
    }
}