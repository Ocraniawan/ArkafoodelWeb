import axios from 'axios'
import qs from 'qs'

import {APP_URL} from '../../resources/config'



const url = APP_URL.concat('item/search?')

export const searchByName = (params)=>{
  return {
    type: 'SEARCH_BY_NAME',
    payload: axios.get(url.concat(`name=${params}`))
  }
}