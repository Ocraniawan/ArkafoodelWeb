const initialState = {
    data: [],
    isLoading: false,
      isError: false,
      isSuccess: true
    }
    
    const register = (state=initialState, action)=>{
      switch(action.type){
          case 'POST_REGISTER_PENDING':
          return {
            ...state,
            isLoading: true,
          }
        case 'POST_REGISTER_REJECTED':
          return {
            ...state,
            isError: true
          }
        case 'POST_REGISTER_FULFILLED':
          return {
            data: action.payload.data.data,
          }
          default :
          return state
      }
       
    }
     
    export default register