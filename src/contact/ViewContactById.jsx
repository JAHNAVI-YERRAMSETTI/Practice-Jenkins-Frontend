// src/contact/ViewContactById.jsx
import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const ViewContactById = () => {
  const [id, setId] = useState('');
  const [contact, setContact] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      const res = await axios.get(`${config.url}/contact/${id}`);
      setContact(res.data);
      setError('');
    } catch  {
      setContact(null);
      setError('Contact not found');
    }
  };

  return (
    <div className="container">
      <h3>View Contact By ID</h3>
      <input
        type="number"
        placeholder="Enter Contact ID"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {contact && (
        <div>
          <p><b>Name:</b> {contact.name}</p>
          <p><b>Email:</b> {contact.email}</p>
          <p><b>Phone:</b> {contact.phone}</p>
          <p><b>Address:</b> {contact.address}</p>
        </div>
      )}
    </div>
  );
};

export default ViewContactById;
