import './sowing.css'
import React from 'react'
import $ from 'jquery'
import './swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';
class sowing extends React.Component{
    componentDidMount(){
          //轮播图swiper的函数定义
          new Swiper('.sowing_center', {
            direction: 'vertical',
                        //缓存图片
            preloadImages: false,
            observer:true,
            observeParents:true,
            resistanceRatio : 0,
            freeMode : true,
            slidesPerView : "auto",
            freeModeMomentumBounce : false,
            resistanceRatio : 0,
        });      
    }
    constructor(props){
        super(props);
        this.state = {
            show:false,
            //切换随机的三种图片
        }
    }
    changeshow =(e)=>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
        this.props.changesowing(false);
    }
    //修改播放器播放的方式
    changeplay = ()=>{
        // //1单曲播放,2随机播放,3顺序播放,
        if(this.props.way==3){
            this.props.changeway(1);
        }
        else{
            this.props.changeway(this.props.way+1);
        }
    }
    altersong = (item)=>{
        this.props.alterplayer(item.songmid);
    }
    //删除单首历史歌曲
    reducesong = (index)=>{
        if(this.props.songlist.length==1){
            this.props.changesowing(false);
        }
        this.props.deletesong(index,1);
    }
    //删除所有的历史歌曲
    reduceall = ()=>{
        this.props.deletesong(0,this.props.songlist.length);
        this.props.changesowing(false);
    }
    render(){
        let createlist =  null;
        let list = this.props.songlist;
        if(this.props.songlist){
            createlist =list.map((item,index)=>{
                return(
                    <li key= {index} id= "sowing_haha" className = "swiper-slide">
                        <span onClick = {this.altersong.bind(this,item)} className = {this.props.which==item.songmid?'sowing_list_title_light':'sowing_list_title'}>
                            {item.songname}
                        </span>
                        {/* 向右浮动 */}
                        <img onClick = {this.reducesong.bind(this,index)} src = {require('../img/delete.png')} className = "sowing_list_delete" />
                        <img onClick = {this.props.alterlike.bind(this,item.songmid)} src = {require('../img/like.png')} className={item.like?'sowing_list_like_hide':'sowing_list_like'} />
                        <img onClick = {this.props.alterlike.bind(this,item.songmid)} src = {require('../img/liking.png')}className={item.like?'sowing_list_like':'sowing_list_like_hide'}/>
                    </li>
                )
            })
        }
        return(
            <div className ={this.props.show?'sowing_box_show':'sowing_box_hide'}>
                <div className = "sowing_top">
                    <div className = "sowing_top_mark">
                        {this.props.way==1?"单曲循环":""}
                        {this.props.way==2?"随机播放":""}
                        {this.props.way==3?"顺序播放":""}({this.props.songlist.length}首)
                    </div>
                    <div onClick ={this.changeplay} className = "sowing_top_switch">
                        {/* 1单曲循环 */}
                        <img className ={this.props.way==1?'radio_way_show':'radio_way_hide'} src = {require('../img/onecycle.png')} />
                        {/* 2随机播放 */}
                        <img className ={this.props.way==2?'radio_way_show':'radio_way_hide'} src = {require('../img/random.png')} />
                        {/* 3顺序循环 */}
                        <img className ={this.props.way==3?'radio_way_show':'radio_way_hide'} src = {require('../img/listcycle.png')} />
                    </div>
                    <div onClick = {this.reduceall} className = "sowing_top_delete">
                        <img src= {require('../img/juck.png')} />
                    </div>
                </div>
                <div className = "sowing_center">
                    <ul className = "swiper-wrapper">
                        { createlist }
                    </ul>
                </div>
                <div onClick = {this.changeshow} className = "sowing_bottom">关闭</div>
            </div>
        )
    }
}
export default sowing