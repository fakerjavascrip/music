import React from 'react';
import './singer.css'
import $ from 'jquery'
import Popup from '../../containers/popup.js'
import Cache from '../../containers/cache.js'
class singer extends React.Component {
    constructor(props){
        super(props)
        this.state={
            singerlist:false,
            show:false,
            imgurl:"",
            popuplist:false,
            title:false,
            mark:2,
            songmid:false
        }
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
    changeshow=(item)=>{
        this.changepopup(true);
        this.setState({
            title:item.Fsinger_name,
            imgurl:"https://y.gtimg.cn/music/photo_new/T001R300x300M000"+item.Fsinger_mid+".jpg?max_age=2592000"
        })
        const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=207663450&inCharset=utf8&outCharset=utf-8&notice=0&loginUin=0&hostUin=0&format=jsonp&order=listen&begin=0&num=80&platform=yqq&songstatus=1&singermid="+item.Fsinger_mid+"&jsonpCallback=?";
        this.props.ccache(true);
        $.getJSON(url,(res)=>{
            if(res){
                this.props.ccache(false);
                this.setState({
                    popuplist:res.data.list
                })
            }
        })  
    }
    componentDidMount(){
        this.getsingerlist();
    }
    getsingerlist=()=>{
        const url = "https://szc.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf8&outCharset=utf-8&notice=0&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&loginUin=0&hostUin=0&needNewCode=0&platform=yqq&format=jsonp&jsonpCallback=?";
        this.props.ccache(true);
        $.getJSON(url,(res)=>{
            this.props.ccache(false);
            if(res.data){
                this.setState({
                    singerlist:res.data.list,
                })
            } 
        })
    }
    render() {
        let singerlist = this.state.singerlist;
        let creatlist = null;
        if( this.state.singerlist){
            creatlist = singerlist.map((item,index)=>{
                return (
                    <div onClick = {this.changeshow.bind(this,item)} key = {index} className= "singer_list">
                        <img src={"https://y.gtimg.cn/music/photo_new/T001R300x300M000"+item.Fsinger_mid+".jpg?max_age=2592000"}  />
                        <div className = "singer_list_name ">{item.Fsinger_name}</div>
                    </div>
                )
            })
        }
        return (
            <div className="singer_box">
                <div className = {this.state.show?'cache_hide':''}>
                    <Cache/>
                </div>
                <div className = {this.state.show?'singer_top_hide':'singer_top_show'}>
                    {creatlist}
                </div>
                <div className = {this.state.show?'singer_center_show':'singer_center_hide'}>
                    <Popup songmid = {this.state.songmid} img = {this.state.imgurl} title={this.state.title} popuplist = {this.state.popuplist} changeshow={(value)=>{this.changepopup(value)}} mark={this.state.mark} />
                </div>
            </div>
        );
    }
}
  export default singer;