import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetCarById() {


    var [cars, setCars] = useState({
        "carId": 0,
        "make": "0",
        "model": "0",
        "year": "0",
        "availability": true,
        "dailyRate": "0",
        "imageURL": "0",
        "specification":"0"
    })

    

    const [adminIdInput, setAdminIdInput] = useState("");

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const fetchCarById = () => {
        const token = localStorage.getItem('token');
        const id = adminIdInput.trim();
        if (id) {
            //const token = localStorage.getItem('token');
            axios.get(`http://localhost:5260/api/Car/User/Cars/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setCars(response.data);
                
            })
            .catch(error => {
                console.error('Error fetching car by ID:', error);
            });
        } else {
            console.error("Please enter a valid Car ID");
        }
    };

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>Car Details By Id</h3>
            </div>
            <section className="services" id="services" style={{ textAlign: 'center' }}>
    <div className="services-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input type="text" value={adminIdInput} onChange={handleInputChange} placeholder="Enter Car ID" style={{ margin: '10px', padding: '5px', width: '200px' }} />
        <button onClick={fetchCarById} className='btn btn-primary' style={{ width: '150px', margin: '10px', padding: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: '1px solid #007bff', borderRadius: '4px', transition: 'background-color 0.3s ease' }} onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>Submit</button>

        {cars.carId !== 0 &&
            <div className="box" style={{ width: '300px', margin: '20px', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out', backgroundColor: '#001f3f' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>

                <h6 style={{ marginBottom: '8px' }}>Image: <img className='img1' src={cars.imageURL} alt="cars" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} /></h6>
                <div style={{ color: '#fff' }}>
                    <h4>CarId: {cars.carId}</h4>
                    <h6>Make: {cars.make}</h6>
                    <h6>Model: {cars.model}</h6>
                    <h6>Year: {cars.year}</h6>
                    <h6>Availability: {cars.availability ? "Available" : "Not Available"}</h6>
                    <h6>DailyRate: {cars.dailyRate}</h6>
                    <h6>Specification: {cars.specification}</h6>
                </div>
            </div>
        }
    </div>
</section>

        </div>
    );
}

export default GetCarById;
