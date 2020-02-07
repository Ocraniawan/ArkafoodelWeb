import axios from 'axios'
import qs from 'qs'

import {APP_URL} from '../../resources/config'



const url = APP_URL.concat('valuation')

export const getCommentById = (id)=>{
  return {
    type: 'GET_COMMENT_BY_ID',
    payload: axios.get(url.concat(`/${id}`))
  }
}
 
export const postComment = (rating,review,item_id,user_id)=>{
  console.log(rating,review,item_id,user_id)
  return {
    type: 'POST_COMMENT',
    payload: axios.post(url.concat(`/`),{rating,review,item_id,user_id})
  }
}