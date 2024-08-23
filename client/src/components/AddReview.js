import ReactStars from 'react-stars'
import React, { useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams, useNavigate } from "react-router";

function AddReview() {
    const navigate = useNavigate();
    const params = useParams();
    const rideId = params.id;

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title").max(25),
        body: yup.string().required("Must enter a review"),
        rating: yup.number().positive().integer().required("Must enter a rating")
    })
    
    const formik = useFormik({
        initialValues: {
            title: "",
            body: "",
            rating: 4,
            rideId: rideId,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
            fetch("/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then(navigate(`/rides/${rideId}`))
        }
    })

    // const [formData, setFormData] = useState({
    //     title: "",
    //     body: "",
    //     rating: "",
    // });

    // function handleChange(e) {
    //     setFormData({
    //         ...formData,
    //         [e.target.id]: e.target.value
    //     })
    // }

    // function handleRatingChange(rating) {
    //     setFormData({
    //         ...formData,
    //         rating: rating
    //     })
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     const newReview = {
    //         title: formData.title,
    //         body: formData.body,
    //         rating: formData.rating,
    //         ride_id: rideId,
    //     }
    //     fetch("/reviews", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newReview)
    //     })
    //     .then(navigate(`/rides/${rideId}`))
    // }

    return(
        <div className='form-container'>
            <h1>Add Review</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating: </label>
                    <input
                        id="rating"
                        name="rating"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input 
                      type="text"
                      id="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body: </label>
                    <input 
                      type="text"
                      id="body"
                      value={formik.values.body}
                      onChange={formik.handleChange}
                    />
                </div>
                <p>{formik.errors.title}</p>
                <p>{formik.errors.rating}</p>
                <p>{formik.errors.body}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddReview;