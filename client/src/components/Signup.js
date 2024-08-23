import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/Form.css"

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: formData.username,
            password: formData.password,
        }
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(navigate("/"))
    }

    return(
        <div className="form-container">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input 
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input 
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup;