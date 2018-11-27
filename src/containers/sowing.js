import { connect } from 'react-redux';
import Sowing from '../components/player/sowing.jsx'
const mapStateToProps=state=>{
    return {
      songlist:state.songlist,
      which:state.which,
      way:state.way,
      like:state.like
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      //改变播放器
      //改变歌名，歌手名，歌曲链接，图片链接
      alterplayer:(songmid)=>dispatch({
        type:"C_READ",
        songmid:songmid
      }),
      //切换歌曲，下一首和上一首
      switch:(value)=>dispatch({
          type:'SWITCH',
          value:value
      }),
      changesong:(value)=>dispatch({
        type:"C_SONG",
        song:value
      }),
      //增加历史播放记录
      addsong:(asong)=>dispatch({
        type:'A_SONG',
        asong:asong
      }),
      //删除历史歌曲
      deletesong:(index,len)=>dispatch({
          type:'DELETE',
          index:index,
          len:len,
      }),
      //修改播放的方式
      changeway:( value)=>dispatch({
        type:'C_WAY',
        //1为上一首，2为下一首
        way:value
        }),
        //修改是否喜欢该首歌曲
        alterlike:(songmid)=>dispatch({
            type:'C_LIKE',
            songmid:songmid
            })
    };
  }
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sowing);
  