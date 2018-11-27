import { connect } from 'react-redux';
import Popup from '../components/popup/popup.jsx'
const mapStateToProps=state=>{
    return {
      song:state.song,
      songlist:state.songlist,
      which:state.which,
      songing:state.songing,
      //请求是否需要节流
      canrun:state.canrun
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      //改变播放器
      //改变歌名，歌手名，歌曲链接，图片链接
      addplayer:(songname,singer,read,imgurl,lyric,songmid)=>dispatch({
        type:"A_PLAY",
        songname:songname,
        singer:singer,
        imgurl:imgurl,
        read:read,
        lyric:lyric,
        songmid:songmid,
      }),
      changesong:(value)=>dispatch({
        type:"C_SONG",
        songing:value
      }),
      //增加历史播放记录
      addsong:(asong)=>dispatch({
        type:'A_SONG',
        asong:asong
      }),
      //修改正在播放第几首歌曲,存的是歌曲的songmid
      alterwhich:(which)=>dispatch({
        type:'WHICH',
        which:which,
      }),
      //修改是否可以发送请求，从而截流
      ccanrun:(value)=>dispatch({
        type:'C_CANRUN',
        canrun:value,
      })
    };
  }
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Popup);
  