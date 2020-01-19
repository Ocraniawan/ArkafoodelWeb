import axios from 'axios'
import qs from 'qs'

import {APP_URL} from '../../resources/config'

const url = APP_URL.concat('valuation/')

export const reviewRating = (review, rating, user_id, item_id)=>{
    let str = {review,rating,user_id,item_id}
    console.log(str)
    return {
        type: 'POST_REVIEWS',
        payload: axios.post(url.concat(),str)
    }
} 