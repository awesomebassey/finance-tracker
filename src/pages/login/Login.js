import { useState } from 'react'
import styles from './Login.module.css'
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, pending } = useLogin()
    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }
    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <label>
                <span>email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <button className='btn' disabled={pending ? true : false}>{pending ? 'Loading' : 'Login'}</button>
            {error && <p>{error}</p>}
        </form>
    )
}
