import ReactStars from 'react-stars'
import React, { useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams, useNavigate, useOutletContext } from "react-router";

function AddReview() {
    const navigate = useNavigate();
    const params = useParams();
    const rideId = params.id;
    const context = useOutletContext();
    const user = context[0]

    // const formSchema = yup.object().shape({
    //     title: yup.string().required("Must enter a title").max(25),
    //     body: yup.string().required("Must enter a review"),
    //     rating: yup.number().positive().integer().required("Must enter a rating")
    // })
    
    // const formik = useFormik({
    //     initialValues: {
    //         title: "",
    //         body: "",
    //         rating: 4,
    //         rideId: rideId,
    //     },
    //     validationSchema: formSchema,
    //     onSubmit: (values) => {
    //         console.log(values)
    //         fetch("/reviews", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(values),
    //         })
    //         .then(navigate(`/rides/${rideId}`))
    //     }
    // })

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        rating: "",
    });

    console.log(formData)

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    // function handleRatingChange(rating) {
    //     setFormData({
    //         ...formData,
    //         rating: rating
    //     })
    // }

    function handleSubmit(e) {
        e.preventDefault();
        const newReview = {
            title: formData.title,
            body: formData.body,
            rating: formData.rating,
            username: user.username,
            ride_id: rideId,
            user_id: user.id
        }
        console.log(newReview)
        fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview)
        })
        .then(navigate(`/rides/${rideId}`))
    }

    return(
        <div className='form-container'>
            <h1>Add Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating: </label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input 
                      type="text"
                      id="title"
                      value={formData.title}
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

export default AddReview;