const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }
  
  const search = (state=initialState, action)=>{
    switch(action.type){
      case 'SEARCH_BY_NAME_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'SEARCH_BY_NAME_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'SEARCH_BY_NAME_FULFILLED':
        return {
            ...state,
          data: action.payload.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
  }
  
  export default search