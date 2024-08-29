import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import ParkContainer from './ParkContainer';
import "../styles/Directory.css"


function Home() {
    const [parks, setParks] = useState([]);
    const context = useOutletContext();
    const user = context[0];
 
    useEffect(() => {
        fetch('/parks')
        .then(r => r.json())
        .then(parkData => setParks(parkData))
    }, [])

    return (
        <div>
            <header className="header">
            {user ? (
                <h1>Welcome {user.username}</h1>
            ): (
                <h1>Welcome to Theme Park Directory</h1>
            )}
            </header>
            <ParkContainer parks={parks}/>
        </div>
    )
}

export default Home;