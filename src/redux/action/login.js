import Axios from 'axios'
import qs from 'qs'

import {APP_URL} from '../../resources/config'

const url = APP_URL.concat('user/login')

export const logIn = (username, password)=>{
    return {
        type: 'POST_LOGIN',
        payload: Axios.post(url.concat(),qs.stringify(username, password))
    }
} 