import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReviewContainer from "./ReviewContainer";
import "../styles/RideInfo.css"

function RideInfo() {
    const [ride, setRide] = useState([])
    const { id, name, image, description, height, reviews } = ride;
    const params = useParams()

    useEffect(() => {
        fetch(`/rides/${params.id}`)
        .then(r => r.json())
        .then(rideData => setRide(rideData))
    }, [])
    
    return (
        <div className="info-page">
            <img src={image} alt={name} />
            <div className="content">
                <h2>{name}</h2>
                <p>{description}</p>
                <p>{height}</p>
            </div>
            <div>
                <ReviewContainer reviews={reviews} rideId={id} />
            </div>
        </div>
    )
}

export default RideInfo;