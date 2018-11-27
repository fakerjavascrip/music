import { connect } from 'react-redux';
import Search from '../components/search/search.jsx'
const mapStateToProps=state=>{
    return {
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
      dhistory:(index)=>dispatch({
        type:"D_HISTORY",
        index:index
      })
    };
  }
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search);
  