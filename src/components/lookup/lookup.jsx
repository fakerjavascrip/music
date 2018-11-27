import React from 'react';
//写成组件模式而不是路由模式
import Hot from '../hot/hot.jsx';
import Search from '../../containers/search.js';
import Findout from '../../containers/findout.js'
import { BrowserRouter,HashRouter } from 'react-router-dom';
import { Router, Route, Redirect } from 'react-router';
import './lookup.css'
import $ from 'jquery'
//查找音乐的入口
class lookup  extends React.Component {
    componentDidMount(){
        this.gethot();
    }
    constructor(props){
        super(props);
        //是一个对象
        this.state = {
            //判断当前处于哪个位置，1热门页面，2search页面，3已经搜索到的页面
            mark:1,
            //三个列表存与一个对象初始化
            seeklist:false,
            word:false,
            //是否允许数据渲染的flag
            flag:false
        }
    }
    back = ()=>{
            this.props.history.push('/main/recommend');
    }
    change = ()=>{
        if(this.refs.lookup.value==""){
            this.setState({
                mark:1,
                word:this.refs.lookup.value,
            })
            this.gethot();
        }
        else if(this.refs.lookup.value!=""){
            this.setState({
                mark:2,
                flag:2,
                word:this.refs.lookup.value,
            })
        }
    }
    //点击hot的歌曲到达直接查询的效果
    changelookup=(value)=>{
        this.refs.lookup.value =value;
        this.getfindout();
    }
    //获取查询到的信息
    getfindout=()=>{
        if(this.refs.lookup.value!=""){
            this.setState({
                mark:3
            })
            this.props.ccache(true);
            const url = "https://c.y.qq.com/soso/fcgi-bin/client_search_cp?g_tk=697786022&inCharset=utf-8&outCharset=utf-8&notice=0&w="+this.refs.lookup.value+"&p=1&n=20&perpage=20&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&uin=0&platform=h5&uid=0&needNewCode=1&remoteplace=txt.mqq.all&jsonpCallback=?";
            $.getJSON(url,(res)=>{
                this.props.ccache(false);
                if(res.data){
                    this.setState({
                        seeklist:res.data.song.list,
                        flag:3
                    })
                }
            })
        }
        let i;
        for(i=0;i<this.props.historylist.length;i++){
            if(this.props.historylist ==this.refs.lookup.value){
                break;
            }
        }
        if(i==this.props.historylist.length){
            this.props.ahistory(this.refs.lookup.value);
        }

    }
    //获取热点信息的列表
    gethot=()=>{
        let url;
            url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=697786022&inCharset=utf-8&outCharset=utf-8&notice=0&uin=0&format=json&platform=h5&needNewCode=1&jsonpCallback=?";
            $.getJSON(url,(res)=>{
                if(res){
                    this.setState({
                        seeklist:res.data.hotkey.slice(0,9),
                        flag:1,
                    })
                }
            })
    }
    render(){
        return (
            <div className="lookup_box">
                <div className = "lookup_top">
                    <div onClick = {this.back} className = "lookup_back">
                        <img src={require('../img/left.png')} />
                    </div>
                    <input onChange = {this.change} ref = "lookup"  placeholder="搜索音乐，MV，歌单，歌手" className = "lookup_input" type="text" />
                    <div onClick = {this.getfindout} className = "lookup_find">搜索</div>
                </div>
                {/* 如果mark为一则hot显示 */}
                <div className ={this.state.mark==1?'lookup_show':'back_lookup'}>
                    <Hot list = {this.state.seeklist} flag = {this.state.flag} changeword={(value)=>{this.changelookup(value)}} />
                </div>
                {/* 如果mark为2search显示 */}
                <div  className ={this.state.mark==2?'lookup_show':'back_lookup'}>
                    <Search word = { this.state.word } flag = {this.state.flag} list = {this.state.seeklist} changeword={(value)=>{this.changelookup(value)}} />
                </div>
                {/* 如果mark为3则findout显示 */ }
                <div  className ={this.state.mark==3?'':'back_lookup'}>
                    <Findout  word = { this.state.word } flag = {this.state.flag} list = {this.state.seeklist} changeword={(value)=>{this.changelookup(value)}} />
                </div>
            </div>
        );
    }
}
export default lookup