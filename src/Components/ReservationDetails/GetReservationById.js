import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetReservationById() {
    var [reservation, setReservations] = useState({
        "reservationId":0,
        "pickUpDateTime": 0,
        "dropOffDateTime":0,
        "status": "Booked",
        "pickUpStoreLocation": "0",
        "dropOffStoreLocation": "0",
        "totalPrice": "0",
        "paymentId": 0,
        "userId": 0,
        "carId": 0
    })

    const [adminIdInput, setAdminIdInput] = useState("");

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const fetchReservationById = () => {
        const id = adminIdInput.trim();
        if (id) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:5260/api/Reservation/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setReservations(response.data);
            })
            .catch(error => {
                alert('Invalid ID , Please enter a valid Reservation ID', error);
            });
        } else {
            alert("Invalid ID ,Please enter a valid Reservation ID");
        }
    };

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>Reservation Details By Id</h3>
            </div>
            <section className="services" id="services">
  <div className="services-container" style={{ textAlign: 'center' }}>
    <input
      type="text"
      value={adminIdInput}
      onChange={handleInputChange}
      placeholder="Enter Reservation ID"
      style={{ margin: '10px', padding: '10px', fontSize: '16px', textAlign: 'center' }}
    />
    <br />
    <button
      onClick={fetchReservationById}
      className="btn btn-primary"
      style={{
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = 'darkblue')}
      onMouseOut={(e) => (e.target.style.backgroundColor = 'blue')}
    >
      Submit
    </button>
    {reservation.reservationId !== 0 && (
      <div
        className="box"
        style={{
          margin: '20px',
          padding: '20px',
          backgroundColor: '#f0f8ff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          transition: 'box-shadow 0.3s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)')}
        onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)')}
      >
        <h4>ReservationId: {reservation.reservationId}</h4>
        <h6>PickUpDateTime: {reservation.pickUpDateTime}</h6>
        <h6>DropOffDateTime: {reservation.dropOffDateTime}</h6>
        <h6>Status: {reservation.status}</h6>
        <h6>PickUpStoreLocation: {reservation.pickUpStoreLocation}</h6>
        <h6>DropOffStoreLocation: {reservation.dropOffStoreLocation}</h6>
        <h6>TotalPrice: {reservation.totalPrice}</h6>
        <h6>PaymentId: {reservation.paymentId}</h6>
        <h6>UserId: {reservation.userId}</h6>
        <h6>CarId: {reservation.carId}</h6>
      </div>
    )}
  </div>
</section>

        </div>
    );
}

export default GetReservationById;
