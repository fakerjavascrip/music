import { connect } from 'react-redux';
import Player from '../components/player/player.jsx'
const mapStateToProps=state=>{
    return {
        //是否让播放器显示
        // show:state.show
        //判断播放还是暂停
        play:state.play,
        //判断是否跳转歌曲进行初始化
        song:state.song,
        songing:state.songing,
        way:state.way,
        songlist:state.songlist,
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      //修改是否播放
      changeplay:(value)=>dispatch({
          type:"C_PLAY",
          play:value,
      }),
      changesong:(value)=>dispatch({
        type:"C_SONG",
        songing:value,
      }),
      nextsong:()=>dispatch({
        type:'SWITCH',
        value:2
      }),
      clearsong:()=>dispatch({
        type:'CLEAR',
      })
    };
  }
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Player);
  