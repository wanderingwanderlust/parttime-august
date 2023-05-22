import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

function useProviderAuth() {
    const [user, setUser] = useState({})

    const signin = (username, password) => {
        return axios.post('/auth/login', {username, password}).then((res) => {
            setUser(res.data.decodedUser)
            toast(res.data.message);
        })   
    }

    const signout = (cb) => {
        return setUser({})
    }


    const authHeader = () => {
        return {Authoization: `Bearer ${user}`}
    }

    return {
        user,
        signin,
        signout,
        authHeader
    }
}

export default useProviderAuth