import ParkCard from "./ParkCard";
import "../styles/Card.css"

function ParkContainer({ parks }) {
    return (
        <div className="card-container">
            {parks.map(park => (
                <ParkCard key={park.id} park={park} />
            ))}
        </div>
    )
}

export default ParkContainer;