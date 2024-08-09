import { useState, useEffect } from 'react';
import ParkContainer from './ParkContainer';
import "../styles/Directory.css"


function Home() {
    const [parks, setParks] = useState([]);

    useEffect(() => {
        fetch('/parks')
        .then(r => r.json())
        .then(parkData => setParks(parkData))
    }, [])


    return (
        <div>
            <h1 className='header'>Welcome to Theme Park Directory</h1>
            <ParkContainer parks={parks}/>
        </div>
    )
}

export default Home;