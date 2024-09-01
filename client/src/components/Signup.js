import { useOutletContext, useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import "../styles/Form.css"

function Signup() {
    const navigate = useNavigate();
    const context = useOutletContext();
    const setUser = context[1]

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username"),
        password: yup.string().required("Must enter a password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: values => {
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then(r => r.json())
            .then(user => setUser(user))
            .then(() => navigate('/'))
        }
    })

    return(
        <div className="form-container">
            <h1>Signup</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <p style={{color:'red'}}>{formik.errors.username}</p>
                    <label htmlFor="username">Username: </label>
                    <input 
                      type="text"
                      id="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                </div>
                <div className="form-group">
                    <p style={{color:'red'}}>{formik.errors.password}</p>
                    <label htmlFor="password">Password: </label>
                    <input 
                      type="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup;