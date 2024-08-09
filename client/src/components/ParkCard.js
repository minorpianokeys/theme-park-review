import { useNavigate } from "react-router-dom";
import "../styles/Card.css"

function ParkCard({ park }) {
    const { id, name, image } = park;   
    const navigate = useNavigate();

    function handleClick(id){
        navigate(`/parks/${id}`)
    }

    return(
        <div className="card" onClick={() => handleClick(id)}>
            <img src={image} />
            <h3>{name}</h3>
        </div>
    )
}

export default ParkCard;