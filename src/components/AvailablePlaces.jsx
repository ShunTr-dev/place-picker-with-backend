import { useEffect, useState } from 'react'
import Places from './Places.jsx'
import ErrorPage from './ErrorPage.jsx'
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'

export default function AvailablePlaces({ onSelectPlace }) {
    const [isLoading, setIsLoading] = useState(false)
    const [availablePlaces, setAvailablePlaces] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchPlaces() {
            setIsLoading(true)

            try {
                const places = await fetchAvailablePlaces()

                navigator.geolocation.getCurrentPosition((position) => {
                    const sortedPlaces = sortPlacesByDistance(
                        places,
                        position.coords.latitude,
                        position.coords.longitude
                    )
                    setAvailablePlaces(sortedPlaces)
                    setIsLoading(false)
                })
            } catch (error) {
                setError({ message: error.message || 'An error occurred.' })
                setIsLoading(false)
            }
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
