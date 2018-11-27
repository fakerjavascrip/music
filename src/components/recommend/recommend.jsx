import React from 'react';
import $ from 'jquery';
import './recommend.css';
import ReactDOM from 'react-dom';
import Popup from '../../containers/popup.js';
import Cache from '../cache/cache.jsx';
import { BrowserRouter,HashRouter } from 'react-router-dom';
import { Router, Route, Redirect } from 'react-router';
import './swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';
class recommend extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            musiclist:false,
            show:false,
            title:false,
            imgurl:"",
            popuplist:false,
            mark:1,
            carousel:false,
            flag:false,
            songmid:false,
            filename:false
        }
    }

    componentDidMount(){
        this.getmusiclist(); 
        

    }
    slide=()=>{
        new Swiper('.swiper-container', {
		    direction: 'horizontal', // 水平切换选项
            observer: true,
            //缓存图片
            preloadImages: false,
            autoplay:{
                disableOnInteraction:false,
            },
            speed:300,
            loop:true,//循环模式
            loopAdditionalSlides : 5,
            slidesPerview:5,
		    // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                clickable :true,
              },
        });
    }
    changepopup = (value)=>{
        if(value==true){
            this.setState({
                show:value,
                popuplist:false
            })
        }
        else if(value==false){
            this.setState({
                show:value,
            })
        }
    }
    changeshow = (item) => {
        this.changepopup(true);
        this.setState({
            title:item.dissname,
            imgurl:item.imgurl
        })
        const url = "http://123.207.138.78:8888/getlistDetail?g_tk=697786022&inCharset=utf-8&outCharset=utf-8&notice=0&dic="+item.dissid+"&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0&jsonpCallback=?";
        this.props.ccache(true);
        $.getJSON(url,(res)=>{
            this.props.ccache(false);
            if(res){
                this.setState({
                    popuplist:res.cdlist[0].songlist
                })
            }
        })
    }
    getmusiclist=()=>{
        this.props.ccache(true);
        const url = "http://123.207.138.78:8888/getlist?g_tk=5381&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.6392217775500852&format=json&jsonpCallback=?";
        $.getJSON(url,(res)=>{
            this.props.ccache(false);
            if(res.data){
                this.setState({
                    musiclist:res.data.list,
                })
            }
        })
        const url2 = "https://shc.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=697786022&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&jsonpCallback=?"; 
        $.getJSON(url2,(res)=>{
            if(res.data){
                this.setState({
                    carousel:res.data.slider,
                    flag:true
                })
                this.slide();
            }
        })   
    }
  render() {
    
    //热门歌单的创建和数据
    let musiclist = this.state.musiclist;
    let createlist = null;
    //轮播图的创建和数据
    let carousel = this.state.carousel;
    let createcarousel = null;
    if( this.state.musiclist){
        createlist = musiclist.map((item,index)=>{
            return (
                <div key={index} onClick={this.changeshow.bind(this,item)}  className = "recommend_list">
                    <div className= "recomend_list_img"   >
                    <img src={item.imgurl} />
                    </div>
                    <div className  ="recomend_list_right">
                        <div className ="recomend_list_title">{item.creator
.name}</div>
                        <div className="recomend_list_words">{item.dissname}}</div>
                    </div>
                </div>
            )
        })
    }
    if(this.state.carousel&&this.state.flag==true){
        createcarousel = carousel.map((item,index)=>{
            return(
                <div key = {index} className="swiper-slide"><img style= {{width:"100%",height:"8rem"}} src={item.picUrl} /></div>
            )
        })
    }
    return (
        <div className="recommend_box">
            <div className="wxchat-banner">
                <div className="swiper-container" >
                        <div  className="swiper-wrapper">
                            {createcarousel}
                        </div>
                        <div className="swiper-pagination banner-pagination" ></div>
                </div>
            </div>
            <div className={this.state.show?'recommend_mark_hide':'recommend_mark'}>热门歌单推荐</div>
            <div className = {this.state.show?'recommend_top_hide':'recommend_top_show'}>
                {createlist}
            </div >
            <div className = {this.state.show?'recommend_center_show':'recommend_center_hide'}>
                <Popup songmid = {this.state.songmid} filename = {this.state.filename} img = {this.state.imgurl} title={this.state.title} popuplist = {this.state.popuplist} changeshow={(value)=>{this.changepopup(value)}} mark={this.state.mark} />
            </div>
        </div>
    );
  }
}
export default recommend;