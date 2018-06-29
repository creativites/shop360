export class Search extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            text : "请输入搜索内容"
        }
    }

    render(){
        return (
            <div className="search-box">
                <div className="input-box">
                    <input type="text" placeholder={this.state.text} />
                </div>
            </div>
        )
    }
}