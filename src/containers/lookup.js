import { connect } from 'react-redux';
import Lookup from '../components/lookup/lookup.jsx'
const mapStateToProps=state=>{
    return {
        cache:state.cache,
        historylist:state.historylist
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
    //改变懒加载
      ccache:(value)=>dispatch({
        type:"C_CACHE",
        cache:value
      }),
      //增加查询的历史记录
      ahistory:(value)=>dispatch({
        type:"A_HISTORY",
        songname:value
      })
    };
  }
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Lookup);
  