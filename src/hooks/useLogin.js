import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [cancelled, setCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setPending(true)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

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

    return { login, error, pending }
}