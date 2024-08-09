import { useNavigate } from "react-router";
import "../styles/ReviewCard.css"

function ReviewCard({ review }) {
    const { id, title, body, rating } = review;
    const navigate = useNavigate();

    function handleClick(id) {
        navigate(`/reviews/${id}/edit`)
    }

    function handleDelete(id) {
        console.log("clicked")
        fetch(`/reviews/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(console.log("deleted"))
    }

    return(
        <div className="review-card">
            <div className="card-actions">
                <button className="edit-btn" onClick={() => handleClick(id)}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(id)}>🗑️</button>
            </div>
            <div className="title-rating">
                <h3>{title}</h3>
                <h4>{rating}</h4>
            </div>
            <p>{body}</p>
        </div>
    )
}

export default ReviewCard;