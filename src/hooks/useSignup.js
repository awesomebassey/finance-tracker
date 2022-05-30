import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [cancelled, setCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setPending(true)

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error('Something went wrong. Could not complete signup')
            }

            await res.user.updateProfile({ displayName })

            dispatch({ type: 'LOGIN', payload: res.user })

            if (!cancelled) {
                setError(null)
                setPending(false)
            }

        } catch (err) {
            if (!cancelled) {
                setError(err.message)
                setPending(false)
            }
        }
    }

    useEffect(() => {
        setCancelled(false)
        return () => setCancelled(true)
    }, [])

    return { error, pending, signup }
}
