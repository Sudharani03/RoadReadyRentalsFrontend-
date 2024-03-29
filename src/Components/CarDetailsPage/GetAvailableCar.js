import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAvailableCar() {
    var [cars, setCars] = useState([{
        "carId": 0,
        "make": "0",
        "model": "0",
        "year": "0",
        "availability": 0,
        "dailyRate": "0",
        "imageURL": "0",
        "specification":"0"
    }])

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:5260/api/Car/admin/Cars/Availability", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setCars(response.data);
        })
        .catch(error => {
            console.error('Error fetching car availability:', error);
        });
    }, []);

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>All Available Details</h3>
            </div>
            <section className="services" id="services" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {cars.map((car) => (
        <div key={car.carId} style={{ margin: '10px', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#001f3f', color: '#fff' }}>
            <div className="box">
                <h6>Image: <img className='img1' src={car.imageURL} alt="cars" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} /></h6>
                <h4>CarId: {car.carId}</h4>
                <h6>Make: {car.make}</h6>
                <h6>Model: {car.model}</h6>
                <h6>Year: {car.year}</h6>
                <h6>DailyRate: {car.dailyRate}</h6>
                <h6>Specification: {car.specification}</h6>
            </div>
        </div>
    ))}
</section>

</div>
    );
}

export default GetAvailableCar;
