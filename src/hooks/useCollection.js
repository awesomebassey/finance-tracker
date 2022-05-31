import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        setPending(true)
        let ref = projectFirestore.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }

        if (orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id })
            })

            setPending(false)
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setPending(false)
            setError("Could not fetch the data.")
        })

        return () => unsubscribe()

    }, [collection, query])

    return { documents, error, pending }
}