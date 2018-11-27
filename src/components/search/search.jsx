import React from 'react';
import './search.css';
import $ from 'jquery'
class search extends React.Component {
    componentDidMount(){
    }
    constructor(props) {
        super(props);
        this.state = {
            searchlist:false,
            //search列表的数据,用localstore
            value:false
        }
    }
    search = (item)=>{
        this.props.changeword(item);
    }
  render() {
      let historylist = this.props.historylist;
      let creatlist = null;
      if( this.props.historylist&&this.props.flag==2){
        creatlist = historylist.map((item,index)=>{
            return (
                    <div  key={index} className = "search_list">
                        <div onClick = {this.search.bind(this,item)}>{item}</div>
                        <img className = "search_list_left" src = {require('../img/search.png')}/>
                        <img onClick = {this.props.dhistory.bind(this,index)} className = "search_list_right" src = {require('../img/delete.png')}/>
                    </div>
            )
        })
    }
    return (
        <div className="search_box">
            <div className = "search_top">
                搜索 " {this.props.word} "
            </div>
            <div className = "search_center">
                {creatlist}
            </div>
        </div>
    );
  }
}
export default search;