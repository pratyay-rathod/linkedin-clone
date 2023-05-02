const initialState = {
    loading: false,
    articles:[]
  };
  
  const rootReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'FETCH_POSTS_REQUEST':
        return {
          ...state,
          loading: true
        };
      case 'FETCH_POSTS_SUCCESS':
        return {
          ...state,
          loading: false,
          articles:action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  