import { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom'


function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    let { from } = location.state || {from: {pathname: '/gifs/search'}}

    const login = (e) => {
        e.preventDefault();
        console.log(username, password)
        // check localStorage, 
        navigate(from)
    }


    return (
        <div>
            <h1>Welcome to the Login Page</h1>
            <form onSubmit={login}>
                <input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='btn btn-primary'>Log In</button>
            </form>
        </div>
    )
}


export default LoginPage