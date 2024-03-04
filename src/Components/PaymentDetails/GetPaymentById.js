import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetPaymentById() {
    var [payment, setPayments] = useState({
        "paymentId":0,
        "paymentMethod": "0",
        "paymentAmount": 0,
        "paymentStatus": "Paid",
        "transactionId": 0,
        "transactionDate": 0,
        "reservationId": 0,
        "userId": 0, 
        "carId":0
    })

    const [adminIdInput, setAdminIdInput] = useState("");

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const fetchPaymentById = () => {
        const id = adminIdInput.trim();
        if (id) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:5260/api/Payment/user/payment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setPayments(response.data);
            })
            .catch(error => {
                alert("Please enter a valid Payment ID");
            });
        } else {
            alert("Please enter a valid Payment ID");
        }
    };

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>Payment Details By Id</h3>
            </div>
            <section className="services" id="services">
  <div className="services-container" style={{ textAlign: 'center' }}>
    <input
      type="text"
      value={adminIdInput}
      onChange={handleInputChange}
      placeholder="Enter Payment ID"
      style={{ margin: '10px', padding: '10px', fontSize: '16px', textAlign: 'center' }}
    />
    <br />
    <button
      onClick={fetchPaymentById}
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
    {payment.paymentId !== 0 && (
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
        <h4>PaymentId: {payment.paymentId}</h4>
        <h6>PaymentMethod: {payment.paymentMethod}</h6>
        <h6>PaymentAmount: {payment.paymentAmount}</h6>
        <h6>PaymentStatus: {payment.paymentStatus}</h6>
        <h6>TransactionId: {payment.transactionId}</h6>
        <h6>TransactionDate: {payment.transactionDate}</h6>
        <h6>ReservationId: {payment.reservationId}</h6>
        <h6>UserId: {payment.userId}</h6>
        <h6>CarId: {payment.carId}</h6>
      </div>
    )}
  </div>
</section>

        </div>
    );
}

export default GetPaymentById;
