import { useNavigate, useOutletContext } from "react-router";
import ReviewCard from "./ReviewCard";
import "../styles/Reviews.css"

function ReviewContainer({ reviews, rideId, onDelete }) {
    const navigate = useNavigate();
    const context = useOutletContext();
    const user = context[0]

    function handleClick(id) {
        navigate(`/rides/${id}/reviews/new`)
    }

    return (
        <div className="review-container">
            <div className="review-header">
                <h3>Reviews</h3>
                {user ? (
                    <button onClick={() => handleClick(rideId)}>+</button>
                ): (
                    <p>Login to add Review</p>
                )}
                
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