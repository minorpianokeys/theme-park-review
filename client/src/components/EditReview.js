import ReactStars from 'react-stars'
import { useState } from "react";
import { useParams, useNavigate } from "react-router";

function EditReview() {
    const navigate = useNavigate();
    const params = useParams();
    const reviewId = params.id;
    const rideId = params.rideId

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        rating: 0,
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    function handleRatingChange(rating) {
        setFormData({
            ...formData,
            rating: rating
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newReview = {
            title: formData.title,
            body: formData.body,
            rating: formData.rating,
            ride_id: rideId,
        }
        fetch(`/reviews/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview)
        })
        .then(navigate(`/rides/${rideId}`))
    }

    return(
        <div className='form-container'>
            <h1>Edit Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating: </label>
                    <ReactStars 
                        half={false}
                        size={24}
                        value={formData.rating}
                        onChange={handleRatingChange}
                    />
                </div>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input 
                      type="text"
                      id="title"
                      value={formData.name}
                      onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body: </label>
                    <input 
                      type="text"
                      id="body"
                      value={formData.body}
                      onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditReview;