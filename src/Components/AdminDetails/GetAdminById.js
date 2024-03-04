import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetAdminById() {
    var [admin, setAdmins] = useState({
        "adminId": 0,
        "firstName": "0",
        "lastName": "0",
        "email": "0",
        "username": "0",
        "password": "**********",
        "phoneNumber": 0,
    })

    const [adminIdInput, setAdminIdInput] = useState("");

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const fetchAdminById = () => {
        const token = localStorage.getItem('token');
        const id = adminIdInput.trim();
        if (id) {
            axios.get(`http://localhost:5260/api/Admin/admin/admins/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    setAdmins(res.data); // Set admins with res.data, not res
                })
                .catch(err => alert(err)); //error
        } else {
            alert("Please enter a valid admin ID");
        }
    };

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>Admin Details By Id</h3>
            </div>
            <section className="services" id="services" style={{ textAlign: 'center' }}>
                <div className="services-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input type="text" value={adminIdInput} onChange={handleInputChange} placeholder="Enter Admin ID" style={{ margin: '10px', padding: '5px' }} />
                    <button onClick={fetchAdminById} className='btn btn-primary' style={{ width: '150px', margin: '10px', padding: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: '1px solid #007bff', borderRadius: '4px', transition: 'background-color 0.3s ease' }} onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>Submit</button>

                    {admin.adminId !== 0 &&
                    <div className="box" style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <div style={{ padding: '16px' }}>
                            <h4 style={{ margin: '8px 0' }}>AdminId: {admin.adminId}</h4>
                            <h6 style={{ margin: '8px 0' }}>FirstName: {admin.firstName}</h6>
                            <h6 style={{ margin: '8px 0' }}>LastName: {admin.lastName}</h6>
                            <h6 style={{ margin: '8px 0' }}>Email: {admin.email}</h6>
                            <h6 style={{ margin: '8px 0' }}>UserName: {admin.username}</h6>
                            <h6 style={{ margin: '8px 0' }}>Password: {admin.password}</h6>
                            <h6 style={{ margin: '8px 0' }}>PhoneNumber: {admin.phoneNumber}</h6>
                        </div>
                    </div>
                    }
                </div>
            </section>

        </div>
    );
}

export default GetAdminById;
