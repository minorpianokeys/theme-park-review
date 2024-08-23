import { useNavigate } from "react-router";
import ReviewCard from "./ReviewCard";
import "../styles/Reviews.css"

function ReviewContainer({ reviews, rideId, onDelete }) {
    const navigate = useNavigate();

    function handleClick(id) {
        navigate(`/rides/${id}/reviews/new`)
    }

    return (
        <div className="review-container">
            <div className="review-header">
                <h3>Reviews</h3>
                <button onClick={() => handleClick(rideId)}>+</button>
            </div>
            <div className="reviews">
                {reviews?.map(review => (
                    <ReviewCard key={review.id} review={review} rideId={rideId} onDelete={onDelete}/>
                ))}
            </div>
        </div>
    )
}

export default ReviewContainer;