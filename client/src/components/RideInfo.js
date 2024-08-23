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

    function handleDelete(id) {
        console.log("clicked")
        fetch(`/reviews/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r => {
            if (r.ok) {
                setRide(prevRide => ({
                    ...prevRide,
                    reviews: prevRide.reviews.filter(review => review.id !== id)
                }));
            }
        })
    }
    
    return (
        <div className="info-page">
            <img src={image} alt={name} />
            <div className="content">
                <h2>{name}</h2>
                <p>{description}</p>
                <p>{height}</p>
            </div>
            <div>
                <ReviewContainer reviews={reviews} rideId={id} onDelete={handleDelete}/>
            </div>
        </div>
    )
}

export default RideInfo;