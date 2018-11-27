import { connect } from 'react-redux';
import Ranking from '../components/ranking/ranking.jsx'
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
  )(Ranking);
  