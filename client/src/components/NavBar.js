import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router";
import "../styles/NavBar.css"

function NavBar() {
    const navigate = useNavigate();

    function handleLogoutClick() {
        fetch("/logout", {
            method: "DELETE",
        })
        .then(navigate("/"))
    }

    return (
        <nav className="navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/rides">Rides</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink onClick={handleLogoutClick}>Logout</NavLink>
        </nav>
    )
};

export default NavBar;