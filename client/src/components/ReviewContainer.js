import { useNavigate } from "react-router";
import ReviewCard from "./ReviewCard";

function ReviewContainer({ reviews, rideId }) {
    const navigate = useNavigate();

    function handleClick(id) {
        navigate(`/rides/${id}/reviews/new`)
    }

    return (
        <div>
            <div className="header">
                <h3>Reviews</h3>
                <button onClick={() => handleClick(rideId)}>Add Review</button>
            </div>
            <div>
                {reviews?.map(review => (
                    <ReviewCard key={review.id} review={review}/>
                ))}
            </div>
        </div>
    )
}

export default ReviewContainer;