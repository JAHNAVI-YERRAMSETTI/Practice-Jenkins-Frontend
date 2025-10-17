// src/contact/UpdateContact.jsx
import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const UpdateContact = () => {
  const [id, setId] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', phone: '', address: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchContact = async () => {
    try {
      const res = await axios.get(`${config.url}/contact/${id}`);
      setContact(res.data);
      setError('');
    } catch  {
      setError('Contact not found');
      setContact({ name: '', email: '', phone: '', address: '' });
    }
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${config.url}/contact/update`, { id: Number(id), ...contact });
      setMessage(res.data);
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h3>Update Contact</h3>
      <input
        type="number"
        placeholder="Contact ID"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button onClick={fetchContact}>Load</button>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" value={contact.name} onChange={handleChange} placeholder="Name" required /><br />
        <input type="email" name="email" value={contact.email} onChange={handleChange} placeholder="Email" required /><br />
        <input type="text" name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" required /><br />
        <input type="text" name="address" value={contact.address} onChange={handleChange} placeholder="Address" /><br />
        <button type="submit">Update Contact</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UpdateContact;
