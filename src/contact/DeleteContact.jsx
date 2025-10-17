// src/contact/DeleteContact.jsx
import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const DeleteContact = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${config.url}/contact/delete/${id}`);
      setMessage(res.data);
      setError('');
    } catch (err) {
      setError('Failed to delete contact: ' + err.message);
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h3>Delete Contact By ID</h3>
      <input
        type="number"
        placeholder="Enter Contact ID"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteContact;
