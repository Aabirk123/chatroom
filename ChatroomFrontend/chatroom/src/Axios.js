import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = 'http://127.0.0.1:7000/api/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout:5000,
    headers: {
       Authorization: Cookies.get('access_token') ?
       'JWT ' + Cookies.get('access_token') :
       null,
       'Content-Type':'application/json',
       accept:'application/json'
    },
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async function (error){
        const orignalRequest = error.config;

        if(typeof error.response === 'undefined'){
            alert ("Network connection issues");
            return Promise.reject(error);
        }

        if(error.response.status === 401 && orignalRequest.url === baseUrl + 'token/refresh'){
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if(error.response.data.code === "token_not_valid" && error.response.status === 401 && error.response.statusText === 'Unauthorized'){
            const refreshToken = Cookies.get('refresh_token');

            if(refreshToken){
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                const now = Math.ceil(Date.now()/ 1000);

                if(tokenParts.exp > now){
                    return axiosInstance('/token/refresh/', {refresh: refreshToken})
                    .then((response) =>{
                        Cookies.set('access_token', response.data.access);
                        axiosInstance.defaults.headers["Authorization"] = 
                        'JWT ' + response.data.access;
                        orignalRequest.headers["Auhtorization"] = 
                        'JWT ' + response.data.access;

                        return axiosInstance(orignalRequest);
                    })
                    .catch((err) => {
                        console.log("error");
                    })
                }
                else {
                    window.location.href = '/login/';
                }
            }
            else{
                console.log("Refresh Token Not Available");
            }
        }

        return Promise.reject(error);

    }
);

export default axiosInstance