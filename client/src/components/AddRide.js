import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import "../styles/Form.css"

function AddRide() {
    const params = useParams();
    const parkId = params.id;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        height: "",
    });


    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newRide = {
            name: formData.name,
            image: formData.image,
            description: formData.description,
            height: formData.height,
            park_id: parkId,
        }
        fetch("/rides", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRide)
        })
        .then(navigate(`/parks/${parkId}`))
    }

    return(
        <div className="form-container">
            <h1>Add New Ride</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image: </label>
                    <input 
                      type="text"
                      id="image"
                      value={formData.image}
                      onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input 
                      type="text" 
                      id="description" 
                      value={formData.description}
                      onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="height">Height: </label>
                    <input
                      type="text"
                      id="height"
                      value={formData.height}
                      onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddRide;