const initialState = {
  data: [],
  isLoading: false,
    isError: false,
    isSuccess: true
  }
  
  const login = (state=initialState, action)=>{
    switch(action.type){
        case 'POST_LOGIN_PENDING':
        return {
          ...state,
          isLoading: true,
        }
      case 'POST_LOGIN_REJECTED':
        return {
          ...state,
          isError: true
        }
      case 'POST_LOGIN_FULFILLED':
        return {
          data: action.payload.data.auth,
        }
        default :
        return state
    }
      
  }
   
  export default login