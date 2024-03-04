import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAllCar() {
    var [cars, setCars] = useState([{
        "carId": 0,
        "make": "0",
        "model": "0",
        "year": "0",
        "availability": false,
        "dailyRate": "0",
        "imageURL": "0",
        "specification":"0"
    }])

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:5260/api/Car/admin/cars/GetCarsList", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setCars(response.data);
        })
        .catch(error => {
            console.error('Error fetching cars:', error);
        });
    }, []);

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>All Car Details</h3>
            </div>
            <section className="services" id="services" style={{ textAlign: 'center' }}>
    <div className="services-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cars.map((car) =>
            <div key={car.carId} style={{ width: '300px', margin: '20px', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out', backgroundColor: '#001f3f' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <h6 style={{ marginBottom: '8px' }}>Image: <img className='img1' src={car.imageURL} alt="cars" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} /></h6>
                <div style={{ color: '#fff' }}>
                    <h4>CarId: {car.carId}</h4>
                    <h6>Make: {car.make}</h6>
                    <h6>Model: {car.model}</h6>
                    <h6>Year: {car.year}</h6>
                    <h6>Availability: {car.availability ? "Available" : "Not Available"}</h6>
                    <h6>DailyRate: {car.dailyRate}</h6>
                    <h6>Specification: {car.specification}</h6>
                </div>
            </div>
        )}
    </div>
</section>

        </div>
    );
}

export default GetAllCar;
