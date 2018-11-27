import './player.css';
import React from 'react';
import $ from 'jquery'
import Sowing from '../../containers/sowing.js'
import Radio from '../../containers/radio.js'
class player  extends React.Component {
    componentDidMount(){
    }
    constructor(props){
        super(props)
        this.state={
            playershow:true,
            Sshow:false,
            Rshow:false, 
            read:"",
            //歌曲播放百分比
            percent:0,
            //当前歌词的序号
            current:false,
            //当前歌词的时间
            // ltime:false,
            //下一句歌词的时间
            rtime:false,
            aword:false,
            apex:0,
            //move事件是否触发
            move:"",
            //最大的时间
            maxtime:"",
            //当前时间
            nowtime:""
        }
    }
    //改变播放记录列表的显示与否
    changeSshow = (e,value)=>{
        //这里有点击事件的冒泡事件，当为false时会点击changeSshow事件，当为true时会点击子组件的changeshow所以该事件不被点击触发
        //是否存在点击事件，判断事件发生是否是点击事件，或一些会触发冒泡的事件
        if(e){
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation()
        }
        this.setState({
            Sshow:value,
        }) 
    }
    //改变radio组件的显示与否
    changeRshow = (e,value)=>{
        this.setState({
            Rshow:value,
        })
    }
    //是否播放音乐
    play = (e)=>{
        if(e){
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation()
        }
        //实现音乐的播放和暂停
        if(this.refs.play.paused&&this.props.song.read){
            this.refs.play.play();
            this.props.changeplay(true);
        }
        else{
            this.refs.play.pause();
            this.props.changeplay(false)
        }
    }
    //切换歌曲保证播放状态
    keepplay = (e)=>{
        if(e){
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation()
        }
        if(this.refs.play.paused&&this.props.song.read){
            this.refs.play.play();
            this.props.changeplay(true);
        }
    }
    //click改变percent
    clickpercent = (value)=>{
        this.setState({
            //进度条的大小
            percent:value,
        })         
        if(this.props.song.lyric.lines.length==0){
            this.refs.play.currentTime = this.refs.play.duration*value/100;
        }
        //改变播放时间
        for(let i=0;i<this.props.song.lyric.lines.length;i++){
            if(i==this.props.song.lyric.lines.length-1&&this.refs.play.duration*value*10>=this.props.song.lyric.lines[i].time)
            {
                this.setState({
                    current:i,
                    apex:-1.6*(this.props.song.lyric.lines.length-14),
                    rtime:this.props.song.lyric.lines[this.props.song.lyric.lines.length-1].time,
                })
                this.refs.play.currentTime = this.refs.play.duration*value/100;
                break;
            }
            else{
                if(this.refs.play.duration*value*10<this.props.song.lyric.lines[0].time){
                    this.setState({
                        current:0,
                        rtime:this.props.song.lyric.lines[1].time,
                        aword:this.props.song.lyric.lines[0].txt,
                        apex:0
                    })
                    this.refs.play.currentTime = this.refs.play.duration*value/100;
                    break;
                }
                if( this.refs.play.duration*value*10>=this.props.song.lyric.lines[i].time&&this.refs.play.duration*value*10<=this.props.song.lyric.lines[i+1].time)
                {
                    if(i==0){
                        this.setState({
                            current:0,
                            rtime:this.props.song.lyric.lines[1].time,
                            aword:this.props.song.lyric.lines[0].txt,
                            apex:0
                        })
                        this.refs.play.currentTime = 0.0001;
                    }
                    else{
                        if(i>5&&i+7<this.props.song.lyric.lines.length){
                            this.setState({
                                apex: -1.6*(i-5),
                            })
                        }
                        else if(i+7>this.props.song.lyric.lines.length){
                            this.setState({
                                apex:-1.6*(this.props.song.lyric.lines.length-14),
                            })
                        }
                        this.setState({
                            current:i,
                            rtime:this.props.song.lyric.lines[i+1].time,
                            aword:this.props.song.lyric.lines[i].txt,
                        })
                        this.refs.play.currentTime = this.refs.play.duration*value/100;
                    }
                    break;
                }
            }
        }
        // if(this.state.percent>99.999){
        //     if(this.props.way==2||this.props.way==3){
        //         this.props.nextsong();
        //     }
        //     return;
        // }
    }
    //move改变percent
    changepercent = (value)=>{
        //改变进度条
        this.setState({
            //进度条的大小
            percent:value,
            move:true
        })   
        //改变播放时间
        for(let i=0;i<this.props.song.lyric.lines.length;i++){
                if(i==this.props.song.lyric.lines.length-1&&this.state.current<this.props.song.lyric.lines.length-1){
                    this.setState({
                        current:i,
                        aword:this.props.song.lyric.lines[i].txt,
                        rtime:this.props.song.lyric.lines[i].time,
                    })
                }
                else if(i<this.props.song.lyric.lines.length-1){
                    if(this.refs.play.duration*value*10<this.props.song.lyric.lines[0].time){
                        this.setState({
                            current:0,
                            rtime:this.props.song.lyric.lines[1].time,
                            aword:this.props.song.lyric.lines[0].txt,
                            apex:0
                        })
                        this.refs.play.currentTime = 0.0001;
                        break;
                    }
                    if( this.refs.play.duration*value*10>=this.props.song.lyric.lines[i].time&&this.refs.play.duration*value*10<=this.props.song.lyric.lines[i+1].time)
                    { 
                        if(i==0){
                            this.setState({
                                current:0,
                                rtime:this.props.song.lyric.lines[1].time,
                                aword:this.props.song.lyric.lines[0].txt,
                                apex:0
                            })
                            this.refs.play.currentTime = 0.0001;
                        }
                        else{
                            if(i>5&&i+8<this.props.song.lyric.lines.length){
                                this.setState({
                                    apex: -1.6*(i-5),
                                })
                            }
                            else if(i+8>=this.props.song.lyric.lines.length){
                                this.setState({
                                    apex: -1.6*(this.props.song.lyric.lines.length-14),
                                })
                            }
                            this.setState({
                                current:i,
                                rtime:this.props.song.lyric.lines[i+1].time,
                                aword:this.props.song.lyric.lines[i].txt,
                            })
                        }
                        break;
                    }
                }
        }
    }
    //更新音乐
    altersong = ()=>{
        if(this.state.current+8>=this.props.song.lyric.lines.length)
        {
            this.setState({
                apex: -1.6*(this.props.song.lyric.lines.length-14),
            })
        }
        this.refs.play.currentTime = this.refs.play.duration*this.state.percent/100;
        this.setState({
            move:false
        })
        // if(this.state.percent>99.999){
        //     if(this.props.way==2||this.props.way==3){
        //         this.props.nextsong();
        //     }
        //     return;
        // }
    }
    altertime=()=>{
        if(this.refs.play.currentTime==0){
            this.setState({
                current:0
            })
        }
        if(this.refs.play.duration){
            let min2;
            if(Math.floor(this.state.percent*this.refs.play.duration%6000/100)<10){
                min2 = Math.floor(this.state.percent*this.refs.play.duration/6000)+" : 0"+Math.floor(this.state.percent*this.refs.play.duration%6000/100);
            }
            else{
                min2 = Math.floor(this.state.percent*this.refs.play.duration/6000)+" : "+Math.floor(this.state.percent*this.refs.play.duration%6000/100);
            }
            this.setState({
                nowtime:min2
            })
        }
        if(this.refs.play.ended==true){
            this.refs.play.src = " ";
            this.props.nextsong();
            this.refs.play.src = this.props.song.read;
            return;
        }
        if(this.state.move==true){
        }
        else{
            //若当前歌曲需要初始化
            //current为零为进度条初始化
            //song为true为切歌初始化
            if(this.props.songing==true||this.props.song.lyric.lines.length==0){
                if(this.props.songing==true)
                {
                    this.refs.play.currentTime= 0;
                    this.setState({
                        current : 0,
                        percent : 0,
                        apex:0,
                        
                    })
                    this.props.changesong(false);
                    //初始化歌曲的总长
                    return;                                                                                                               
                }
                if(this.props.song.lyric.lines.length==0)
                {
                    this.setState({
                        percent:this.refs.play.currentTime/this.refs.play.duration*100,
                        aword:"此歌曲为没有填词的纯音乐，请您欣赏",
                    })
                }
            }
            //如果初始化后或者只是快进拖动进度条
            else{
                if(this.state.current==0){
                    let maxmin
                    if(this.refs.play.duration%60<10){
                        maxmin = Math.floor(this.refs.play.duration/60)+" : 0"+Math.floor(this.refs.play.duration%60)
                    }
                    else{
                        maxmin = Math.floor(this.refs.play.duration/60)+":"+Math.floor(this.refs.play.duration%60);
                    }
                    this.setState({
                    rtime:this.props.song.lyric.lines[1].time, 
                    current:0,
                    //音乐时间的最大值
                    maxtime : maxmin,
                    //歌曲百分比
                    percent:this.refs.play.currentTime/this.refs.play.duration*100,
                    //初始化当前歌词
                    aword:this.props.song.lyric.lines[0].txt,
                    //初始化歌词距离上端的距离
                    apex:0
                    })
                    if(this.refs.play.currentTime*1000>this.props.song.lyric.lines[1].time){
                        this.setState({
                            current:1,
                            rtime:this.props.song.lyric.lines[2].time,
                            aword:this.props.song.lyric.lines[1].txt
                        })
                    }
                }
                else if(this.refs.play.currentTime*1000>this.state.rtime){
                    
                    //判断是否到达歌词中间进行向上滑动
    
                    if(this.state.current>5&&this.state.current+8<this.props.song.lyric.lines.length){
                        this.setState({
                            apex: -1.6*(this.state.current-5),
                        })
                    }
                    else if(this.state.current<=5){
                        this.setState({
                            apex:0,
                        })
                    }
    
                    //逻辑变动，让歌词状态发生变化
                    if((this.state.current+2)<this.props.song.lyric.lines.length){
                        this.setState({
                            rtime:this.props.song.lyric.lines[this.state.current+2].time,
                            percent:this.refs.play.currentTime/this.refs.play.duration*100,
                        })
                    }
                    else{
                        this.setState({
                            percent:this.refs.play.currentTime/this.refs.play.duration*100,
                        })
                    }
                    if(this.state.current<this.props.song.lyric.lines.length-1){
                        this.setState({
                            current : this.state.current+1,
                            //歌曲百分比
                            percent:this. refs.play.currentTime/this.refs.play.duration*100,
                            //当前歌词
                            aword:this.props.song.lyric.lines[this.state.current+1].txt, 
                        })
                    }
                }
                else{
        
                    //当出现歌词空白的情况
                    if(this.props.song.lyric.lines[this.state.current].txt==" "){
                        this.setState({
                            current : this.state.current + 1,
                        })   
                    }
                    this.setState({
                        //歌曲百分比
                        percent:this.refs.play.currentTime/this.refs.play.duration*100,
                        //当前歌词
                        aword:this.props.song.lyric.lines[this.state.current].txt,
                    })
                }
            }
        }
    }
    render(){
        return(
            <div className ={this.state.playershow?'player_box_show':'player_box_hide'} >
                <div className = {this.props.songlist.length>0?'player_all_hide':''}>
                    <div className = "player_left">
                        QQ音乐听我想听的歌
                    </div>
                    <div className = "player_right">
                        {/* 音乐播放与关闭的转换 */}
                        <div className = 'player_right_radio_pause'>
                            <img src ={require('../img/playno.png')} />
                        </div>
                        <div  className = "player_right_list">
                            <img src = {require('../img/list.png')}/>
                        </div>
                    </div>
                </div>
                <div className = {this.props.songlist.length>0?'':'player_all_hide'}>
                    <div  onClick = {(e)=>this.changeRshow(e,true)} className = "player_left">
                        <div className = "player_left_img">
                            <img src={this.props.song.imgurl} />
                        </div>         
                        <div className="player_left_title">
                            <h2>{this.props.song.songname}</h2>
                            <p>{this.props.song.singer[0].name}{this.props.song.singer.length>1?'|'+this.props.song.singer[1].name:''}{this.props.song.singer.length>2?' | '+this.props.song.singer[2].name:''}</p>
                        </div>
                    </div>
                    <div className = "player_right">
                        {/* 音乐播放与关闭的转换 */}
                        <div onClick = {(e)=>this.play(e)} className = {this.props.play?'player_right_radio_play':'player_hide'}>
                            <img src ={require('../img/playing.png')} />
                        </div>
                        <div onClick = {(e)=>this.play(e)} className = {this.props.play?'player_hide':'player_right_radio_pause'}>
                            <img src = {require('../img/playno.png')} />
                        </div>

                        <div onClick = {(e)=>this.changeSshow(e,true)} className = "player_right_list">
                            <img src = {require('../img/list.png')}/>
                        </div>
                    </div>
                    {/* 即将播放和播放过的记录 */}
                    <Sowing show ={this.state.Sshow} changesowing={(value)=>{this.changeSshow(value)}} />
                    {/* 音乐播放器的界面,占全屏 */}
                    <Radio aword = {this.state.aword} nowtime = {this.state.nowtime} keepplay = {this.keepplay} altersong = {()=>{this.altersong()}} clickpercent = {(value)=>{this.clickpercent(value)}} changepercent = {(value)=>{this.changepercent(value)}} apex = {this.state.apex} current = { this.state.current} maxtime = {this.state.maxtime} percent = {this.state.percent} duration = {this.refs.play} show ={this.state.Rshow} changeradio={(value)=>{this.changeRshow(value)}} changeplay={()=>{this.play()}}  />
                    {/* 音乐播放的标签 */}
                    <audio preload = "load" onTimeUpdate = {this.altertime} loop={this.props.way==1?true:false} autoPlay="autoplay" ref = "play" src={this.props.song.read}></audio>
                </div>
            </div>
        )
    }
}
export default player
