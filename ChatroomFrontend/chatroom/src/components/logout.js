import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';   
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function SignOut(){

    const navigate = useNavigate();

    useEffect(() => {


        axiosInstance.post(`user/logout/blacklist`, {
            refresh_token: Cookies.get('refresh_token')
        })
        Cookies.remove('refresh_token');
        Cookies.remove('access_token');

        navigate('/login');
        window.location.reload();
    },[])


    return(<div>Logout</div>)
}