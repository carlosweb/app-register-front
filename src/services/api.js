import axios from 'axios'

const api = axios.create({
    baseURL: 'https://app-register-two.vercel.app/users'
})

export default api