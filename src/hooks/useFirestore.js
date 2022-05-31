import { useEffect, useReducer, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config";

const initialState = {
    document: null,
    pending: false,
    error: null,
    success: false
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'PENDING':
            return { document: null, pending: true, error: null, success: false };
        case 'ADD_DOC':
            return { document: action.payload, pending: false, error: null, success: true };
        case 'DELETE_DOC':
            return { document: null, pending: false, error: null, success: true };
        case 'ERROR':
            return { document: null, pending: false, error: action.payload, success: false }
        default:
            return state;
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [cancelled, setCancelled] = useState(false)

    const ref = projectFirestore.collection(collection)
    const dispatchIfNotCancelled = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const addDocument = async (doc) => {
        dispatch({ type: 'PENDING' })
        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDoc = await ref.add({ ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADD_DOC', payload: addedDoc })
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
        }

    }

    const deleteDocument = async (id) => {
        dispatch({ type: 'PENDING' })
        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({ type: 'DELETE_DOC' })
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: "Could not delete" })
        }

    }


    useEffect(() => {
        setCancelled(false)
        return () => setCancelled(true)
    }, [])

    return { response, addDocument, deleteDocument }
}