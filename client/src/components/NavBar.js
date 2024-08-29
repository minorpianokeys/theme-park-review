import { NavLink } from "react-router-dom"
import "../styles/NavBar.css"

function NavBar({ onLogout, user }) {
    return (
        <nav className="navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/rides">Rides</NavLink>
            {user ? (
                <NavLink onClick={onLogout}>Logout</NavLink>
            ) : (
                <div>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/login">Login</NavLink>
                </div>
            )}
            
            
        </nav>
    )
};

export default NavBar;