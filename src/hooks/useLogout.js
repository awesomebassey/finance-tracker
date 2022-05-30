import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const [cancelled, setCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setPending(true)

        try {
            await projectAuth.signOut()

            dispatch({ type: 'LOGOUT' })

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

    return { logout, error, pending }
}