import { connect } from 'react-redux';
import Recommend from '../components/recommend/recommend.jsx'
const mapStateToProps=state=>{
    return {
      //   singer:singer,
      //   song:song,
      //   imgurl:imgurl,
      //   read:read
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      //改变播放器
      ccache:(value)=> dispatch({
        type:'C_CACHE',
        cache:value
      })
    };
  }
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Recommend);
  