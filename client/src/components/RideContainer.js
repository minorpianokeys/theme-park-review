import Card from "./Card";
import "../styles/Card.css"

function RideContainer({ rides }) {
    return(
        <div className="card-container">
            {rides?.map(ride => (
                <Card key={ride.id} ride={ride}/>
            ))}
        </div>
    )
}

export default RideContainer;