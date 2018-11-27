import { connect } from 'react-redux';
import Cache from '../components/cache/cache.jsx'
const mapStateToProps=state=>{
    return {
        cache:state.cache
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
      })
    };
  }
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cache);
  