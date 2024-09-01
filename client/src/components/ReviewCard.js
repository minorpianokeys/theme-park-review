import ReactStars from 'react-stars'
import { useNavigate, useOutletContext } from "react-router";
import "../styles/Reviews.css"
import React from 'react';

function ReviewCard({ review, rideId, onDelete }) {
    const { id, title, body, rating, username, user_id } = review;
    const navigate = useNavigate();
    const context = useOutletContext();
    const user = context[0];

    function handleEditClick() {
        navigate(`/rides/${rideId}/reviews/${id}/edit`)
    }

    return(
        <div className="review-card">
            {user?.id == user_id ? (
                <div className="card-actions">
                
                <button className="edit-btn" onClick={() => handleEditClick()}>✏️</button>
                <button className="delete-btn" onClick={() => onDelete(id)}>🗑️</button>
            </div>
            ) : (
                <div>
                </div>
            )}
            <h4>{username}</h4>
            <div className="title-rating">
                <h3>{title}</h3>
                <ReactStars value={rating} edit={false}/>
            </div>
            <p>{body}</p>
        </div>
    )
}

export default ReviewCard;