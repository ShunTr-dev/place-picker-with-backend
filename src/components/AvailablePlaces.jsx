import { useEffect, useState } from 'react'
import Places from './Places.jsx'
import ErrorPage from './ErrorPage.jsx'

export default function AvailablePlaces({ onSelectPlace }) {
    const [isLoading, setIsLoading] = useState(false)
    const [availablePlaces, setAvailablePlaces] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchPlaces() {
            setIsLoading(true)

            try {
                const response = await fetch('http://localhost:3000/places')
                const resData = await response.json()

                if (!response.ok) {
                    throw Error('Failed to fetch places.')
                }

                setAvailablePlaces(resData.places)
            } catch (error) {
                setError({ message: error.message || 'An error occurred.' })
            }

            setIsLoading(false)
        }

        fetchPlaces()
    }, [])

    if (error) {
        return <ErrorPage title="An error occurred" message={error.message}></ErrorPage>
    }

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isLoading}
            loadingText="Loading places ..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    )
}
