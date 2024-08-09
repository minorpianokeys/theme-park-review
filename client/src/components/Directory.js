import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RideContainer from "./RideContainer"
import "../styles/Directory.css"

function Directory() {
    const [park, setPark] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/parks/${params.id}`)
        .then(r => r.json())
        .then((parkData) => setPark(parkData))
    }, []);

    function handleClick(id) {
        navigate(`/parks/${id}/new`)
    }

    return (
        <div>
            <div className="header">
                <h1>{park.name} Rides</h1>
                <button onClick={() => handleClick(park.id)}>+</button>
            </div>
            <RideContainer rides={park.rides}/>
        </div>
    );
};

export default Directory;