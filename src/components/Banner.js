import Swiper from "swiper";

require("swiper/dist/css/swiper.min.css");
export class Banner extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        //此处为了规避swiper loop循环bug(该bug表现为 当第一次初始化时 如果结构中没有一张轮播图,则循环过程会出现问题)
        // 对接收的数据做判断 如果数据没有值 则不进行swiper初始化
        if(this.props.list.length != 0){
            let option = {
            	loop:true,
            	speed:300,
            	autoplay: {
				    delay: 3000,
				    stopOnLastSlide: false,
				    disableOnInteraction: true,
				    }
            };
            if(this.props.hasPag){
                option.pagination = {
                    el: '.swiper-pagination'
                }
            }
            if(this.props.hasBtn){
                
                option.navigation = {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }
            }
            //如果父级在调用的时候有传入自定义的class名 则优先使用该class名进行初始化
            let sname = this.props.cName ? `.${this.props.cName}` : ".banner";
            this.swiper = new Swiper(sname,option);
        }
        // let swiper = new Swiper(".banner",{
        //     pagination: {
        //         el: '.swiper-pagination',
        //       }
        // });
    }
    
    componentDidUpdate(){
        // console.log(`组件更新`);
        // this.swiper.update();
        
        //只有当拿到的数据不为空时  才去初始化swiper
        if(this.props.list.length != 0){
            let option = {
            	loop:true,
            	speed:300,
            	autoplay: {
				    delay: 3000,
				    stopOnLastSlide: false,
				    disableOnInteraction: true,
				    }
            };
    
            if(this.props.hasPag){
                option.pagination = {
                    el: '.swiper-pagination'
                }
            }
    
            if(this.props.hasBtn){
                
                option.navigation = {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }
            }
    
            //如果父级在调用的时候有传入自定义的class名 则优先使用该class名进行初始化
            let sname = this.props.cName ? `.${this.props.cName}` : ".banner";
    
            this.swiper = new Swiper(sname,option);
        }

    }
    

    render(){
        let sl = this.props.list.map((ban,i)=>{
            return (
                <div className="swiper-slide" key={i}>
                	<a href={ban.a_src}>
                    	<img src={ban.imgSrc} />
                    </a>
                </div>
            )
        }) 

        //如果hasBtn的值为true  则让banner的html结构上存在按钮
        let pb = this.props.hasBtn ? <div className="swiper-button-prev"></div> : null;
        
        let nb = this.props.hasBtn ? <div className="swiper-button-next"></div> : null;
        
        //如果hasBtn的值为true  则让banner的html结构上存在分页器
        let pag = this.props.hasPag ? <div className="swiper-pagination"></div> : null;
        
        return (
            <div className={"banner swiper-container "+this.props.cName}>
                <div className="swiper-wrapper">
                    {sl}
                </div>
                {pag}
                {pb}
                {nb}
            </div>
        )
    }
}