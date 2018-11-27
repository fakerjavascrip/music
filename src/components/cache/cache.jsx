import React from 'react'
import './cache.css'
class cache extends  React.Component{
    componentDidMount(){

    }
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render(){
        console.log(this.props.cache)
        return(
            <div className ={this.props.cache?'cache_box_show':'cache_box_hide'}>
                <div className = "cache_top">
                    <img src = {require('../img/cache.gif')} />
                </div>
                <div className = "cache_center">正在加载中</div>
            </div>
        )
    }
}
export default cache