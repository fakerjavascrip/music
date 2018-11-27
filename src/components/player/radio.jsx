import './radio.css'
import React from 'react'
import $ from 'jquery'
import './swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';
class radio extends React.Component{
    componentDidMount(){
        //轮播图swiper的函数定义
        let swiper1= new Swiper('.radio_center', {
		    direction: 'horizontal', // 水平切换选项
            //缓存图片
            preloadImages: false,
            observer:true,
            observeParents:true,
            resistanceRatio : 0,
            pagination: {
                el: '.swiper-pagination',
                clickable :true,
              },
        });
        //轮播图swiper的函数定义
        let swiper2=new Swiper('.radio_limit', {
            direction: 'vertical',
            //缓存图片
            preloadImages: false,
            observer:true,
            observeParents:true,
            resistanceRatio : 0,
            freeMode : true,
            freeModeMomentum : true,
            slidesPerView : "auto",
            freeModeMomentumBounce : false,
            resistanceRatio : 0,
        });      
    }
    constructor(props){
        super(props);
        this.state = {
            show:false,
            schedule:false,
            ball:0,
            pure:[{title:"此歌曲为没有填词的纯音乐，请您欣赏"}]
        }
    }
    changeshow = (event)=>{
        event.stopPropagation();
        this.props.changeradio(false);
    }
    play=()=>{
        this.props.changeplay();
    }
    changerate = (event)=>{
        let left;
        let width = this.refs.getleft.offsetWidth;
            if(event.type=='touchmove'){
                left =event.touches[0].clientX-this.refs.getleft.offsetLeft; 
            }
            else if(event.type=='click'){
                //进度条小球的translate的改变
                left = event.pageX-this.refs.getleft.offsetLeft;
            }
            if(left>=0&&left<width){
                //改变percent的数值，进度条的百分比
                if(event.type=='touchmove'){
                    console.log("你好");
                    this.props.changepercent(left/width*100)   
                }
                else if(event.type=='click'){
                    this.props.clickpercent(left/width*100)   
                }
            }
            else{
                if(left<=0){
                    this.props.changepercent(0);
                }
                else if(left>=this.refs.getleft.offsetWidth){
                    this.props.changepercent(100);
                }
            }
    }
    //修改播放的方式
    changeplay = ()=>{
        let way = this.props.way+1;
        if(way==4){
            way=1;
        }
        //1单曲播放,2顺序播放,3随机播放,
        this.props.changeway(way);
    }
    //保证一直播放,value为更新方式
    alterplaying = (value)=>{
        this.props.keepplay();
        this.props.switch(value);
    }
    alterplaying
    render(){
        console.log(this.props.percent)
        let lyric = this.props.song.lyric.lines;
        let pure = this.state.pure;
        let createlist = null;
        if(this.props.song.lyric){
            if(this.props.song.lyric.lines.length==0){
                createlist =pure.map((item,index)=>{
                    return(
                        <p key={index}>{item.title}</p>
                    )
                })
            }
            else{
                createlist =lyric.map((item,index)=>{
                    return(
                        <p className ={[index==this.props.current?'radio_select':'radio_fall','swiper-slide'].join(" ")} key = {index}>{item.txt}</p>
                    )
                }) 
            }
        }
        return(
            <div className ={this.props.show?'radio_box_show':'radio_box_hide'}>
                <div className = "radio_context">
                    <img src = {this.props.song.imgurl}/>
                </div>
                <div className = "radio_top">
                    <div onClick = { this.changeshow } className ="radio_back">
                        <img src = {require('../img/back.png')}/>
                    </div>
                    <h1 className = "radio_title">{this.props.song.songname}</h1>
                    <h2 className = "radio_name">{this.props.song.singer[0].name}{this.props.song.singer.length>1?'|'+this.props.song.singer[1].name:''}{this.props.song.singer.length>2?'|'+this.props.song.singer[2].name:''}</h2>
                </div>
                <div className = "radio_center">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" id="radio_swiper">
                            <div className = "radio_picture">
                                <img src = {this.props.song.imgurl} />
                            </div>
                            <div className="radio_simple">{this.props.aword}</div>
                        </div>

                        {/* 歌词的滚动条展示 */}
                        <div className="swiper-slide">
                            <div className ="radio_limit">
                                <div style = {{transform:"translate3d(0px,"+this.props.apex+"rem,0rem)",transitionDuration:"500ms"}} className = {['swiper-wrapper','radio_lyric'].join(" ")} >
                                    {createlist}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-pagination banner-pagination" ></div>
                </div>
                <div className = "radio_bottom">
                    {/* 滑动换歌词页 */}
                    <div className = "radio_slide"></div>
                    
                    {/* 进度的页面 */}

                    <div ref ="getleft" className = "radio_completed">
                        <div onClick = {this.changerate.bind(this)} className = "radio_progress_bar">
                        {/* 进度条 */}
                            <div style={{width:this.props.percent+"%"}} ref="schedule" className = "radio_schedule"></div>
                            <div   onTouchMove = {this.changerate.bind(this)} onTouchEnd={this.props.altersong} className = "radio_ball">
                            </div>
                        </div>
                        <div className = "radio_time_left">{this.props.nowtime}</div>
                        <div className = "radio_time_right">{this.props.maxtime}</div>
                    </div>
                    <div className = "radio_radio_now">
                        {/* 用三栏布局 */}
                        <div className = "radio_begin">
                            {/* 点击改变暂停和开始 */}
                            <div onClick = {this.play} className ={this.props.play?'radio_begin_play':'radio_hide'}>
                                <img src ={require('../img/playing.png')} />
                            </div>
                            <div onClick = {this.play} className ={this.props.play?'radio_hide':'radio_begin_pause'}>
                            <img src ={require('../img/playno.png')} />
                            </div>
                        </div>
                        {/* 其中再用两栏布局 */}
                        <div className = "radio_last">
                            <div onClick = {this.changeplay} className = "radio_last_left">
                                {/* 单曲循环 */}
                                <img className ={this.props.way==1?'radio_way_show':'radio_way_hide'} src = {require('../img/onecycle.png')} />
                                {/* 随机播放 */}
                                <img className ={this.props.way==2?'radio_way_show':'radio_way_hide'} src = {require('../img/random.png')} />
                                {/* 顺序循环 */}
                                <img className ={this.props.way==3?'radio_way_show':'radio_way_hide'} src = {require('../img/listcycle.png')} />
                            </div>
                            <div  onClick = {this.alterplaying.bind(this,1)} className = "radio_last_right">
                                <img src = {require('../img/last.png')} />
                            </div>
                        </div>
                        <div className = "radio_next">
                            <div onClick = {this.alterplaying.bind(this,2)} className = "radio_next_left">
                                <img src = {require('../img/next.png')} />
                            </div>
                            <div onClick = {this.props.alterlike.bind(this,this.props.song.songmid)} className ="radio_next_right">
                                <img className ={this.props.song.like?'radio_like_hide':''} src = {require('../img/like.png')} />
                                <img className ={this.props.song.like?'':'radio_like_hide'} src = {require('../img/liking.png')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default radio