import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAllUser() {
    var [users, setUsers] = useState([{
        "userId": 0,
        "firstName": "0",
        "lastName": "0",
        "email": "0",
        "username": "0",
        "password": "**********",
        "phoneNumber": 0,
        "registrationDate":"0"
    }])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    "http://localhost:5260/api/User/admin/GetUser",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>All User Details</h3>
            </div>
            <section className="services" id="services">
  <div className="services-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {users.map((user) => (
      <div key={user.userId} style={{ margin: '10px', padding: '20px', backgroundColor: '#f0f8ff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', transition: 'box-shadow 0.3s' }}>
        <div className="box" style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'} onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}>
          <h4>UserId: {user.userId}</h4>
          <h6>FirstName: {user.firstName}</h6>
          <h6>LastName: {user.lastName}</h6>
          <h6>Email: {user.email}</h6>
          <h6>UserName: {user.username}</h6>
          <h6>Password: {user.password}</h6>
          <h6>PhoneNumber: {user.phoneNumber}</h6> 
          <h6>RegistrationDate: {user.registrationDate}</h6> 
        </div>
      </div>
    ))}
  </div>
</section>


        </div>
    );
}

export default GetAllUser;
