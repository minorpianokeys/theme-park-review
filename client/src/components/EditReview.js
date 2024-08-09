import { useState } from "react";
import { useParams, useNavigate } from "react-router";

function EditReview() {
    const navigate = useNavigate();
    const params = useParams();
    const rideId = params.id;

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        rating: "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
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
        fetch(`/reviews/${rideId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview)
        })
        .then(navigate(`/rides/${rideId}`))
    }

    return(
        <div>
            <h1>Edit Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating: </label>
                    <input 
                      type="number"
                      min="1"
                      max="5"
                      id="rating"
                      value={formData.rating}
                      onChange={handleChange}
                    />
                </div>
                <div>
                    <lable htmlFor="title">Title: </lable>
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