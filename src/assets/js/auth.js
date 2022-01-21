import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

axios.defaults.withCredentials = true

const isAuthenticated = async () => {
    const accessToken = cookies.get('authSession')
    const refreshToken = cookies.get('refreshTokenID')

    if (!accessToken && !refreshToken) {
        return { authenticated: false, email: null, role: null }
    }
    if (accessToken && refreshToken) {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/getuser`, {
            withCredentials: true
        }).then((res) => {
            console.log(res.data)
            return { authenticated: true, email: res.data.email, role: res.data.role }
        }).catch((err) => {
            console.log(err)
            return { authenticated: false, email: null, role: null }
        })
        return response
    }
    if (!accessToken && refreshToken) {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
            withCredentials: true
        }).then((res) => {
            return { authenticated: true, email: res.data.email, role: res.data.role }
        }).catch((error) => {
            return { authenticated: false, email: null, role: null }
        })
        return response
    }
}
export default isAuthenticated