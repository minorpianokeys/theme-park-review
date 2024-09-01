import { useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import "../styles/Form.css";

function AddPark() {
    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name"),
        image: yup.string().required("Must enter an image")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            image: ""
        },
        validationSchema: formSchema,
        onSubmit: values => {
            fetch('/parks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then(() => navigate('/'))
        }
    })

    return(
        <div className="form-container">
            <h1>Add New Park</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input 
                      type="text"
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image: </label>
                    <input 
                      type="text"
                      id="image"
                      value={formik.values.image}
                      onChange={formik.handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddPark;