
import { useParams, useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as yup from 'yup';

function EditReview() {
    const navigate = useNavigate();
    const params = useParams();
    const reviewId = params.id;
    const rideId = params.rideId

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title").max(25),
        body: yup.string().required("Must enter a review").max(100),
        rating: yup.number().positive().integer().required("Must enter a rating").max(5)
    })

    const formik = useFormik({
        initialValues: {
            title: "",
            body: "",
            rating: "",
            ride_id: rideId,
        },
        validationSchema: formSchema,
        onSubmit: values => {
            fetch(`/reviews/${reviewId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(() => navigate(`/rides/${rideId}`))
        }
    })

    return(
        <div className='form-container'>
            <h1>Edit Review</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <p style={{color:'red'}}>{formik.errors.rating}</p>
                    <label htmlFor="rating">Rating: </label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        id="rating"
                        name="rating"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <p style={{color:'red'}}>{formik.errors.title}</p>
                    <label htmlFor="title">Title: </label>
                    <input 
                      type="text"
                      id="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <p style={{color:'red'}}>{formik.errors.body}</p>
                    <label htmlFor="body">Body: </label>
                    <input 
                      type="text"
                      id="body"
                      value={formik.values.body}
                      onChange={formik.handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditReview;