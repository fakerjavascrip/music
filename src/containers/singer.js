import { connect } from 'react-redux';
import Singer from '../components/singer/singer.jsx'
const mapStateToProps=state=>{
    return {
        cache:state.cache
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      //改变播放器
      //改变歌名，歌手名，歌曲链接，图片链接
      ccache:(value)=>dispatch({
        type:"C_CACHE",
        cache:value
      })
    };
  }
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Singer);
  