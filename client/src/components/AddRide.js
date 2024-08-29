import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import "../styles/Form.css";

function AddRide() {
    const params = useParams();
    const parkId = params.id;
    const navigate = useNavigate();

    // const [formData, setFormData] = useState({
    //     name: "",
    //     image: "",
    //     description: "",
    //     height: "",
    // });


    // function handleChange(e) {
    //     setFormData({
    //         ...formData,
    //         [e.target.id]: e.target.value
    //     })
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     const newRide = {
    //         name: formData.name,
    //         image: formData.image,
    //         description: formData.description,
    //         height: formData.height,
    //         park_id: parkId,
    //     }
    //     fetch("/rides", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newRide)
    //     })
    //     .then(navigate(`/parks/${parkId}`))
    // }

    // const formik = useFormik({
    //     initialValues: {
    //         name: "",
    //         image: "",
    //         description: "",
    //         height: "",
    //     },
    //     // validationSchema: formSchema,
    // onSubmit: (values) => {
    //       fetch("/rides", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(values, null, 2),
    //       }).then(
    //         (res) => {
    //           if (res.status == 200){
    //             (navigate(`/parks/${parkId}`))
    //           }
    //         }
    //       )
    //     },
    //   });

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            description: "",
            height: "",
        },
        onSubmit: values => {
            console.log(JSON.stringify(values))
            console.log("fetching...")
            fetch("/rides", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
                })
            .then(navigate(`/parks/${parkId}`))
        }
    })

    return(
        <div className="form-container">
            <h1>Add New Ride</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image: </label>
                    <input 
                      type="text"
                      id="image"
                      name="image"
                      value={formik.values.image}
                      onChange={formik.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input 
                      type="text" 
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="height">Height: </label>
                    <input
                      type="text"
                      id="height"
                      name="height"
                      value={formik.values.height}
                      onChange={formik.handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddRide;