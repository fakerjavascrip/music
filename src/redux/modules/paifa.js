const initialState = {};

export default function reducer(state = initialState, action){ 
  switch (action.type){
            case'ADD_TODO':
            const newState = Object.assign({},state);
            newState.list.push(action.payload);
            return newState;
            default:
            return state
  }
}