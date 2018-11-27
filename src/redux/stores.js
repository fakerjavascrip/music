import { createStore, applyMiddleware, combineReducers } from 'redux';
// import createLogger from 'redux-logger';
// const loggerMiddleware = createLogger();
// import toDoApp from './modules/toDoApp';
// const createStoreWithMiddleware = applyMiddleware( loggerMiddleware)(createStore);
// const reducer = combineReducers({
//     toDoApp
//   });

//弹窗
    const reducer = (state = {},action={})=>{
        switch(action.type){
            case'C_RECOM':
            const recomstate = Object.assign({},state);
            recomstate.recomshow = !state.recomshow;
            return recomstate;
            case'C_LOOKUP':
            const lookupstate = Object.assign({},state);
            lookupstate.lookup = action.lookup;
            return lookupstate;
            //改变热门歌单的参数
            case'C_RECOMMEND':
            const recommendstate = Object.assign({},state);
            recommendstate.dissid = action.dissid;
            recommendstate.mark = 1;
            recommendstate.imgurl = action.imgurl;
            recommendstate.title = action.title;
            recommendstate.recomshow = true;
            return recommendstate;
            //添加第一次播放的歌曲
            case'A_PLAY':
            const aplaystate = Object.assign({},state);
            //点亮歌曲
            aplaystate.play = true;
            aplaystate.which = action.songmid;
            aplaystate.songing = true;
            aplaystate.song.songmid = action.songmid;
            aplaystate.song.imgurl = action.imgurl;
            aplaystate.song.songname = action.songname;
            aplaystate.song.singer = action.singer;
            aplaystate.song.lyric = action.lyric;
            aplaystate.song.like = false;
            aplaystate.song.read =  action.read;
            return aplaystate;
            //改变播放歌曲的链接
            case'C_READ':
            const readstate = Object.assign({},state);
            let lens,j;
            for(j=0;j<readstate.songlist.length;j++){
                if(readstate.songlist[j].songmid==action.songmid){
                    lens = j;
                    break;
                }
           }
            //当lens确定后的歌曲赋值,正在播放的歌曲对
            readstate.song = {...readstate.songlist[lens]};
            //初始化歌曲
            readstate.songing = true;
            readstate.which = readstate.songlist[lens].songmid;
            return readstate;
            case'C_PLAY':
            const playstate = Object.assign({},state);
            playstate.play = action.play;
            return playstate;
            //改变是否需要初始化
            case'C_SONG':
            const songstate = Object.assign({},state);
            songstate.songing = action.songing;
            return songstate;
            //添加音乐播放记录
            case'A_SONG':
            const asongstate = Object.assign({},state);
            asongstate.songlist.push(action.asong);
            return asongstate;
            //修改正在播放列表的第几首歌曲
            case'WHICH':
            const whichstate = Object.assign({},state);
            whichstate.which=action.which;
            return whichstate;
            //删除历史中的歌曲
            case'DELETE':
            let seat,rans;
            const deletestate = Object.assign({},state);
            //删除其中的歌曲
            deletestate.songlist.splice(action.index,action.len);
            
            //再写一个独立的切换播放歌曲
            
            if(deletestate.songlist.length==0){
                deletestate.song.read="";
                deletestate.play = false;
                deletestate.which = "";
            }
            else{
                for(seat=0;seat<deletestate.songlist.length;seat++){
                    if(deletestate.songlist[seat].songmid==deletestate.which){
                        break
                    }
                }
                if(seat==deletestate.songlist.length);
                {
                    //单曲播放和顺序播放的切换
                    if(deletestate.way==1||deletestate.way==3){
                        if(action.index==deletestate.songlist.length){
                            deletestate.song = {...deletestate.songlist[0]}
                            deletestate.which =deletestate.songlist[0].songmid;
                        }
                        else{
                            deletestate.song = {...deletestate.songlist[action.index]}
                            deletestate.which =deletestate.songlist[action.index].songmid;
                        }
                        deletestate.songing = true;
                        deletestate.play = true;
                    }
                    //随机播放的切换
                    if(deletestate.way==2){
                    //8首以内的随机数
                    rans = (parseInt(8*Math.random())+action.index)%deletestate.songlist.length;
                    console.log(rans);
                    deletestate.song = {...deletestate.songlist[rans]};
                    deletestate.songing = true;
                    deletestate.play = true;
                    deletestate.which = deletestate.songlist[rans].songmid;
                    }
                }
            }
            return deletestate;
            case'C_WAY':
            const waystate = Object.assign({},state);
            //删除其中的歌曲
            waystate.way = action.way;
            return waystate;
            //切换歌曲
            case'SWITCH':
            const switchstate = Object.assign({},state);
            //获取将会播放下标的第几首
            let len,k,ran;
            if(switchstate.songlist.length>0){
                //确定当前歌曲的位置
                for(k=0;k<switchstate.songlist.length;k++){
                    if(switchstate.songlist[k].songmid==switchstate.which){
                       len = k;
                       break;
                    }
               }
                if(switchstate.way==1||switchstate.way==3){
                    // 1为上一首 
                    if(action.value==1){
                        len = len-1;
                        if(len<0){
                            len = switchstate.songlist.length-1;
                        }
                    }
                    //2为下一首
                    else if(action.value==2){
                        len = len+1;
                        if(len==switchstate.songlist.length){
                            len = 0;
                        }
                    }
                    //当len确定后的歌曲赋值
                    switchstate.song = {...switchstate.songlist[len]};
                    switchstate.songing = true;
                    switchstate.play = true;
                    switchstate.which = switchstate.songlist[len].songmid;
                }
                else if(switchstate.way==2){
                    //8首以内的随机数
                    ran = parseInt(8*Math.random());
                    len = (len+ran)%switchstate.songlist.length;
                    switchstate.song = {...switchstate.songlist[len]};
                    switchstate.songing = true;
                    switchstate.play = true;
                    switchstate.which = switchstate.songlist[len].songmid;
                }
            }
            return switchstate;
            case'C_LIKE':
            const likestate = Object.assign({},state);
            if(action.songmid==likestate.which){
                likestate.song.like=!likestate.song.like;
            }
            for(let i=0;i<likestate.songlist.length;i++){
                if(likestate.songlist[i].songmid==action.songmid){
                    likestate.songlist[i].like=!likestate.songlist[i].like;
                }
            }
            return likestate;
            case'C_CACHE':
            const cachestate = Object.assign({},state);
            cachestate.cache = action.cache;
            return cachestate;
            //增加查询记录
            case'A_HISTORY':
            const ahistorystate = Object.assign({},state);
            ahistorystate.historylist.push(action.songname);
            return ahistorystate;
            //删除查询记录
            case'D_HISTORY':
            const dhistorystate = Object.assign({},state);
            dhistorystate.historylist.splice(action.index,1);
            return dhistorystate;
            //修改是否可以发送请求
            case'C_CANRUN':
            const canrunstate = Object.assign({},state);
            canrunstate.canrun = action.canrun;
            return canrunstate;
            default:
            return state
        }
    }
    const store = createStore(reducer,
        {
            song:{
                //图片
                imgurl:"",
                //歌曲名字
                songname:"",
                //歌手名字
                singer:[{name:"梁博"}],
                //歌词
                lyric:false,
                //播放歌曲的链接
                read:"", 
                //是否喜欢该歌曲
                like:"",
                songmid:""
            },
            //清缓存用
            song1:{
                //图片
                imgurl:"",
                //歌曲名字
                songname:"",
                //歌手名字
                singer:[{name:"梁博"}],
                //歌词
                lyric:false,
                //播放歌曲的链接
                read:"", 
                //是否喜欢该歌曲
                like:"",
                songmid:""
            },
            //查找模块的信息
            lookup:"",
            //是否让 播放器(player)显示
            show:"",
            //弹出框所需的参数
            mark:"",
            //热门歌单的参数
            dissid:"",
            //判断播放还是暂停
            play:false,
            //音乐列表,播放过的历史记录
            songlist:[],
            //正在播放列表中的哪首歌曲,存songmid来判断点亮哪首
            which:"",
            //循环的方式,1为单曲,2为随机，3为顺序
            way:1,
            //歌曲初始化
            songing:true,
            //是否处于加载状态
            cache:true,
            //查询历史的对象
            historylist:[],
            //请求是否可以发送
            canrun: true
        })
        export default store;
        //之后需要了解注释的是什么？？？
// const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);
// export default configureStore;