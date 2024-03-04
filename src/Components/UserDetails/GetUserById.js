import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetUserById() {
    var [user, setUsers] = useState({
        "userId": 0,
        "firstName": "0",
        "lastName": "0",
        "email": "0",
        "username": "0",
        "password": "**********",
        "phoneNumber": 0,
        "registrationDate":"0"
    })

    const [adminIdInput, setAdminIdInput] = useState("");

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const handleFetchUserById = () => {
        const id = adminIdInput.trim();
        if (id) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:5260/api/User/user/GetUser/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching user by ID:', error);
            });
        } else {
            console.error("Please enter a valid user ID");
        }
    };

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>UserDetails By Id</h3>
            </div>
            <section className="services" id="services">
  <div className="services-container" style={{ textAlign: 'center' }}>
    <input
      type="text"
      value={adminIdInput}
      onChange={handleInputChange}
      placeholder="Enter User ID"
      style={{ margin: '10px', padding: '10px', fontSize: '16px', textAlign: 'center' }}
    />
    <button
      onClick={handleFetchUserById}
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
    {user.userId !== 0 && (
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
        <h4>UserId: {user.userId}</h4>
        <h6>FirstName: {user.firstName}</h6>
        <h6>LastName: {user.lastName}</h6>
        <h6>Email: {user.email}</h6>
        <h6>UserName: {user.username}</h6>
        <h6>Password: {user.password}</h6>
        <h6>PhoneNumber: {user.phoneNumber}</h6>
        <h6>RegistrationDate: {user.registrationDate}</h6>
      </div>
    )}
  </div>
</section>

        </div>
    );
}

export default GetUserById;
