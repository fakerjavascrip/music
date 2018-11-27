import React from 'react';
import './hot.css';
import $ from 'jquery'
class hot extends React.Component {
    componentDidMount(){
    }
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    search = (item)=>{
        this.props.changeword(item.k.slice(0,item.k.length-1));
    }
  render() {
      let hotlist = this.props.list;
      let createhotlist = null;
      if(this.props.list&&this.props.flag==1){
          createhotlist = hotlist.map((item,index)=>{
            return(
                <li onClick = {this.search.bind(this,item)} key = {index} className = "hot_seniority">{item.k}</li>
            )
          })
      }
    return (
        <div className="hot_box">
            <div className = "hot_mark">热门搜索</div>
            <ul className = "hot_title">
                {createhotlist}
            </ul>
        </div>
    );
  }
}
export default hot;