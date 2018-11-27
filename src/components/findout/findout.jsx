import React from 'react';
import './findout.css';
import $ from 'jquery';
import Lyric from 'lyric-parser'
import Cache from '../../containers/cache.js'
class lookup  extends React.Component {
    componentDidMount(){
    }
    constructor(props,context) {
        super(props,context);
        this.state = {
            vkey :"",
            read:"",
        }
    }
    player=()=>{
        
    }
    //获取歌曲播放的数据
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

    //以上为获取歌曲播放的数据
    render(){
        let songslist = this.props.list; 
        let createlist = null;
        if(this.props.list&&this.props.flag==3){
            console.log(this.props.list);
            createlist = songslist.map((item,index)=>{
                return(
                    <div onClick = {this.getread.bind(this,item.songmid,item.singer,item.songname,item.albummid)} key={index} className = "findout_list">
                        <div className = "findout_list_mark">
                            <img src = {require('../img/music.png')} />
                        </div>
                        <div className = "findout_list_words">
                            <div className = "findout_words_song">{item.songname}</div>
                            <div className = "findout_words_singer">{item.singer[0].name}{item.singer.length==2?' | '+item.singer[1].name:" "}{item.singer.length==3?' | '+item.singer[2].name:" "}</div>
                        </div>
                    </div>
                )
            })   
        }
        return(
            <div className = "findout_box">
                <div className = {this.props.cache?'cache_show':'cache_hide'}>
                    <Cache/>
                </div>
                <div className = "findout_center">
                    {createlist}
                </div>
            </div>
        )
    }
}
export default lookup;