import React from 'react';
import $ from 'jquery'
import './ranking.css'
import Cache from '../../containers/cache.js'
import Popup from '../../containers/popup.js'
class ranking  extends React.Component {
    componentDidMount(){
        this.getranklist();
    }
    constructor(props) {
        super(props);
        this.state = {
            ranklist:false,
            show:false,
            title:false,
            imgurl:"",
            popuplist:false,
            mark:3
        }
    }
    //控制弹窗的关闭和出现
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
    //获取数据,请求的过程也就相当于一个异步
    changeshow = (item)=>{
        this.changepopup(true);
        this.setState({
            title:item.topTitle,
            imgurl:item.picUrl
        })
        this.props.ccache(true);
        const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=697786022&inCharset=utf-8&outCharset=utf-8&notice=0&hostUin=0&platform=h5&needNewCode=1&order=listen&begin=0&uin=0&num=100&songstatus=1&format=json&type=top&tpl=3&page=detail&topid="+item.id+"&jsonpCallback=?";
        $.getJSON(url,(res)=>{
            if(res){
                this.props.ccache(false);
                this.setState({
                    popuplist:res.songlist
                })
            }
        })
    }
    getranklist = () =>{
        this.props.ccache(true);
        const url="https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=697786022&inCharset=utf-8&outCharset=utf-8&notice=0&uin=0&format=h5&needNewCode=1&jsonpCallback=?";
        $.getJSON(url,(res)=>{
            this.props.ccache(false);
            this.setState({
                ranklist:res.data.topList
            })
        })
    }
    render(){
        const ranklist = this.state.ranklist;
        let creatrank = null;
        if(this.state.ranklist){
            creatrank =ranklist.map((item,index)=>{
                return (
                    <div onClick = {this.changeshow.bind(this,item)} key={index} className = "ranking_list">
                        <div className="ranking_list_img">
                            <img src={item.picUrl} />
                        </div>
                        <div className="ranking_list_right">
                            <h3>{item.topTitle}</h3>
                            <p className="ranking_text_name">1 <span>{item.songList[0].songname}</span>- {item.songList[0].singername}</p>
                            <p className="ranking_text_name">2 <span >{item.songList[1].songname}</span>- {item.songList[1].singername}</p>
                            <p className="ranking_text_name">3 <span >{item.songList[2].songname}</span>- {item.songList[2].singername}</p>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className="ranking_box">
                <div  className ={this.state.show?"cache_hide":""} >
                    <Cache/>
                </div>
                <div className={this.state.show?'ranking_first_hide':'ranking_first_show'}>
                    <div className="ranking_top">
                        {creatrank}
                    </div>
                    <div className="ranking_bottom"></div>
                </div>
                <div className = {this.state.show ? 'ranking_second_show':'ranking_second_hide'}>
                    <Popup  img = {this.state.imgurl} title={this.state.title} popuplist = {this.state.popuplist} changeshow={(value)=>{this.changepopup(value)}} mark={this.state.mark} />
                </div>
            </div>
        )
    }
}
export default ranking