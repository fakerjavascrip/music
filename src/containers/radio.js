import { connect } from 'react-redux';
import Radio from '../components/player/radio.jsx'
const mapStateToProps=state=>{
    return {
        //是否让播放器显示
        // show:state.show
        //判断播放还是暂停
        play:state.play,
        //当前播放的歌曲
        song:state.song,
        way:state.way,
        like:state.like,
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      //修改播放的方式
      changeway:(way)=>dispatch({
        type:'C_WAY',
        way:way
      }),
      //切换歌曲，下一首和上一首
      switch:(value)=>dispatch({
        type:'SWITCH',
        value:value
      }),
      alterlike:(songmid)=>dispatch({
        type:'C_LIKE',
        songmid:songmid
      })
    };
  }
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Radio);
  