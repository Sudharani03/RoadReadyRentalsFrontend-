import React, { useState } from 'react';
import axios from 'axios';

function UpdateAvailability() {
  const [carId, setCarId] = useState('');
  const [newAvailability, setNewAvailability] = useState(true); 
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCarIdChange = (event) => {
    setCarId(event.target.value);
  };

  const handleAvailabilityChange = (value) => {
    setNewAvailability(value);
  };

  const handleUpdateAvailability = async () => {
    try {
      setIsUpdating(true);
      const authToken = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5260/api/Car/${carId}/availibility`, 
        { availability: newAvailability, carId: carId }, 
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );
      alert('Availability updated successfully');
      console.log('Availability updated successfully:', response.data);
      setIsUpdating(false);
    } catch (error) {
      alert('Failed to update Availability');
      console.error('Failed to update availability:', error);
      setIsUpdating(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
  <h2>Update Availability</h2>
  <div style={{ margin: '10px' }}>
    <label htmlFor="carId">Car ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
    <input type="text" id="carId" value={carId} onChange={handleCarIdChange} />
  </div>
  <div style={{ margin: '20px' }}>
    <label>New Availability:</label>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ margin: '10px' }}>
        <input
          type="radio"
          id="available"
          name="availability"
          value={true}
          checked={newAvailability === true}
          onChange={() => handleAvailabilityChange(true)}
        />
        <label htmlFor="available">Available</label>
      </div>
      <div style={{ margin: '10px' }}>
        <input
          type="radio"
          id="unavailable"
          name="availability"
          value={false}
          checked={newAvailability === false}
          onChange={() => handleAvailabilityChange(false)}
        />
        <label htmlFor="unavailable">Unavailable</label>
      </div>
    </div>
  </div>
  <button style={{ width: '60%' }} className="btn btn-primary" onClick={handleUpdateAvailability} disabled={isUpdating}>
    {isUpdating ? 'Updating...' : 'Update Availability'}
  </button>
</div>

  );
}

export default UpdateAvailability;
