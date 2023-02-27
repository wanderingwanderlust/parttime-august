import {useState} from 'react';
import {toast} from 'react-toastify'

function useProviderAuth() {
    const [user, setUser] = useState({})

    const signin = (username, password) => {
        const userAccount = {
            username: username,
            password: password
        }

        localStorage.setItem('user', userAccount)
        setUser(userAccount)
        toast(`${username} has successfully logged in`);
    }

    const signout = (cb) => {
        localStorage.removeItem('user');
        toast(`User has successfully logged out`)
    }

    return {
        user,
        signin,
        signout
    }
}

export default useProviderAuth