import { useState, useEffect } from "react"
import RideContainer from "./RideContainer"

function AllRides() {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        fetch('/rides')
        .then(r => r.json())
        .then(rideData => setRides(rideData))
    }, [])

    return(
        <div>
            <h1>All Rides</h1>
            <RideContainer rides={rides}/>
        </div>
    )
}

export default AllRides