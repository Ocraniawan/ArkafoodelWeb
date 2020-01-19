import Axios from 'axios'
import qs from 'qs'

import {APP_URL} from '../../resources/config'

export const registerUser = (name, username, password)=>{
const url = APP_URL.concat('user/registuser')

    return {
        type: 'POST_REGISTER',
        payload: Axios.post(url.concat(),qs.stringify(name, username, password))
    }
} 