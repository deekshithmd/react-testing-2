import { useState } from "react"
import axios from "axios";

export const Login = () => {
    const [error, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/users/1');
            setUser(data);
        }
        catch (e) {
            console.log('error while login', e)
            setError(true)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div style={{ width: '100%', border: '1px solid black', display: 'flex', flexDirection: 'column' }}>
            <span>{user?.name}</span>
            <form onSubmit={handleClick}>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={(username !== '' && password !== '') ? false : true} onClick={handleClick}>{loading ? 'please wait...' : 'Login'}</button>
                <span data-testid="error" style={{ visibility: error ? 'visible' : 'hidden' }}>Something went wrong</span>
            </form>
        </div>
    )
}