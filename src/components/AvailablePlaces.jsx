import { useEffect, useState } from 'react'
import Places from './Places.jsx'

export default function AvailablePlaces({ onSelectPlace }) {
    const [isLoading, setIsLoading] = useState(false)
    const [availablePlaces, setAvailablePlaces] = useState([])

    useEffect(() => {
        async function fetchPlaces() {
            setIsLoading(true)
            const response = await fetch('http://localhost:3000/places')
            const resData = await response.json()
            setAvailablePlaces(resData.places)
            setIsLoading(false)
        }

        fetchPlaces()
    }, [])

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
