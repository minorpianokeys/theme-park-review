import { useNavigate } from "react-router";
import "../styles/Card.css"

function Card({ ride }) {
    const { id, name, image } = ride;
    const navigate = useNavigate()

    function handleClick(id) {
        navigate(`/rides/${id}`)
    }

    return (
        <div className="card" onClick={() => handleClick(id)}>
            <img src={image} alt={name}/>
            <h3>{name}</h3>
        </div>
    )
}

export default Card;