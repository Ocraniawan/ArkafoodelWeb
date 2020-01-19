const initialState = {
    data: [],
    isLoading: false,
      isError: false,
      isSuccess: true
    }
    
    const reviews = (state=initialState, action)=>{
      switch(action.type){
          case 'POST_REVIEWS_PENDING':
          return {
            ...state,
            isLoading: true,
          }
        case 'POST_REVIEWS_REJECTED':
          return {
            ...state,
            isError: true
          }
        case 'POST_REVIEWS_FULFILLED':
          return {
            data: action.payload.data.data,
          }
          default :
          return state
      }
        
    }
     
    export default reviews