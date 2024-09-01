import { useParams, useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import "../styles/Form.css";

function AddRide() {
    const params = useParams();
    const parkId = params.id;
    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name").max(25),
        image: yup.string().required("Must enter an image"),
        description: yup.string().required("Must enter a description"),
        height: yup.number().positive().integer().required("Must enter a positive number").typeError("Must be a positive number").max(60)
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            description: "",
            height: "",
            park_id: parkId,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/rides", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
                })
            .then(() => navigate(`/parks/${parkId}`))
        }
    })

    return(
        <div className="form-container">
            <h1>Add New Ride</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <p style={{color:'red'}}>{formik.errors.name}</p>
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
                    <p style={{color:'red'}}>{formik.errors.image}</p>
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
                    <p style={{color:'red'}}>{formik.errors.description}</p>
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
                    <p style={{color:'red'}}>{formik.errors.height}</p>
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