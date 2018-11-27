import React from 'react';
import './popup.css';
import $ from 'jquery'
import Lyric from 'lyric-parser'
import Cache from '../../containers/cache.js';
class popup extends React.Component {
    componentDidMount(){
    }
    constructor(props,context) {
        super(props,context);
        this.state = {
            vkey :"",
            read:"",
        }
    }
    back = ()=>{
        this.props.changeshow(false);
    }
    getsong = (songmid,singer,songname,albummid)=>{
        //歌词的对象
        let lyricstr;
        let lyric,asong,i;
        //一个可变参数,获取图片
        let imgurl  = "https://y.gtimg.cn/music/photo_new/T002R300x300M000"+albummid+".jpg?max_age=2592000";
        //两个可变参数,获取歌曲的播放
        let read = "http://dl.stream.qqmusic.qq.com/C400"+songmid+".m4a?vkey="+this.state.vkey+"&guid=504753841&uin=0&fromtag=66";
        //更新 歌曲名字，歌手名字，歌曲链接，图片链接
        let url = "http://123.207.138.78:8888/getlyric?songmid="+songmid+"&jsonpCallback=?";
        $.getJSON(url,(res)=>{
                //请求截流的释放
                this.props.ccanrun(true);
                if(res.code<0){
                    res.lyric=[]
                }
                lyricstr = decodeURIComponent(escape(window.atob(res.lyric)));
                lyric = new Lyric(lyricstr)
                this.props.changesong(true);
                this.props.addplayer(songname,singer,read,imgurl,lyric,songmid);
                asong={
                    //图片链接
                    imgurl:imgurl,
                    //歌曲播放链接
                    read:read,
                    //歌曲名字
                    songname:songname,
                    //歌手的名字
                    singer:singer,
                    //歌曲的id
                    songmid:songmid,
                    //是否喜欢
                    like:false,
                    //歌词 
                    lyric:lyric
                }
                this.props.alterwhich(songmid);
                for(i=0;i<this.props.songlist.length;i++){
                    if(this.props.songlist[i].songmid==songmid){
                        break;
                    }
                }
                if(i==this.props.songlist.length){
                    this.props.addsong(asong);
                }
        })
    }
    getread = (songmid,singer,songname,albummid)=>{
        if(this.props.canrun){
            this.props.ccanrun(false);
            let url = "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=5381&inCharset=utf8&outCharset=utf-8&notice=0&cid=205361747&platform=yqq&hostUin=0&loginUin=0&needNewCode=0&uin=0&songmid="+songmid+"&filename=C400"+songmid+".m4a&format=jsonp&guid=504753841&callback=?";
            $.getJSON(url,(res)=>{
                if(res){
                    this.setState({
                        vkey:res.data.items[0].vkey,
                    })
                }
                this.getsong(songmid,singer,songname,albummid)
            })
        }
    }
    render() {
        let createlists=null;
        let popuplist = this.props.popuplist;
        if(this.props.popuplist){
            console.log(this.props.popuplist);
            //创建第一个弹窗的数据
            if(this.props.mark==1){
                createlists = popuplist.map((item,index)=>{
                    return(
                        <li onClick = {this.getread.bind(this,item.songmid,item.singer,item.songname,item.albummid)} key={ index } className = "popup_center_list">
                            <h2>{item.songname}</h2>
                            <p>{item.singer[0].name}{item.singer.length==2?' | '+item.singer[1].name:' '}</p>
                        </li>
                    )
                })
            }
            else if(this.props.mark==2){
                createlists = popuplist.map((item,index)=>{
                    return(
                        // songmid,singer,songname,albummid
                        <li onClick = {this.getread.bind(this,item.musicData.songmid,item.musicData.singer,item.musicData.songname,item.musicData.albummid)} key={ index } className = "popup_center_list">
                            <h2>{item.musicData.songname}</h2>
                            <p>{item.musicData.singer[0].name}{item.musicData.singer.length==2?' | '+item.musicData.singer[1].name:' '}{item.musicData.singer.length==3?' | '+item.musicData.singer[2].name:' '}</p>
                        </li>
                    )
                })
            }
            else if(this.props.mark==3){
                createlists = popuplist.map((item,index)=>{
                    return(
                        <li onClick = {this.getread.bind(this,item.data.songmid,item.data.singer,item.data.songname,item.data.albummid)} key={ index } className = "popup_second_list">
                            <div className = "popup_list_num">{index+1}</div>
                            <div className = "popup_list_words">
                                <h2>{item.data.songname}</h2>
                                <p>{item.data.singer[0].name}{item.data.singer.length==2?' | '+item.data.singer[1].name:' '}{item.data.singer.length==3?' | '+item.data.singer[2].name:' '} - {item.data.albumname}</p>
                            </div>
                        </li>
                    )
                }) 
            }
        }
        return (
            <div className="popup_box">
                            <div  className = "popup_center_back">
                                <p>{this.props.title}</p>
                                <div onClick = {this.back} className="popup_center_back_img">
                                    <img  src = {require('../img/back.png')} />
                                </div>
                                {/* 整体的一张图片的变量为img */}
                                <img className ="popup_center_bottom_img" src= {this.props.img} />
                            </div>
                            <div className = "popup_center_mark">
                                <img src= {this.props.img} />
                            </div>
                            <Cache />
                            <ul className = "popup_center_bottom">
                                { createlists }
                            </ul>
            </div>
        );
    }
}
export default popup;