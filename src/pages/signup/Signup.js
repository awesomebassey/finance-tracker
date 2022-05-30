import { useState } from 'react'
import styles from './Signup.module.css'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const {signup, error, pending} = useSignup()
    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName)
    }
    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
            <label>
                <span>email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </label>
            <label>
                <span>display name:</span>
                <input
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    required
                />
            </label>
            <button className='btn' disabled={pending ? true : false}>{pending ? 'Loading' : 'Signup'}</button>
            {error && <p>{error}</p>}
        </form>
    )
}
