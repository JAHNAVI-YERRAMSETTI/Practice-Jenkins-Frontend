import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const AddContact = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.url}/contact/add`, contact);
      setMessage(res.data);
      setError('');
      setContact({ name: '', email: '', phone: '', address: '' });
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h3>Add Contact</h3>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={contact.name} onChange={handleChange} required /><br/>
        <input type="email" name="email" placeholder="Email" value={contact.email} onChange={handleChange} required /><br/>
        <input type="text" name="phone" placeholder="Phone" value={contact.phone} onChange={handleChange} required /><br/>
        <input type="text" name="address" placeholder="Address" value={contact.address} onChange={handleChange} /><br/>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};
export default AddContact;
