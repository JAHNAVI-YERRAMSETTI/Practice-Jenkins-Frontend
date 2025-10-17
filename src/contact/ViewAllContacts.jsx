import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const ViewAllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [editContact, setEditContact] = useState({ name: '', email: '', phone: '', address: '' });

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${config.url}/contact/all`);
      setContacts(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch contacts: ' + err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${config.url}/contact/delete/${id}`);
      setMessage(res.data);
      setError('');
      fetchContacts(); // refresh list
    } catch (err) {
      setError('Failed to delete contact: ' + err.message);
      setMessage('');
    }
  };

  const handleEdit = (contact) => {
    setEditId(contact.id);
    setEditContact({ ...contact });
  };

  const handleEditChange = (e) => {
    setEditContact({ ...editContact, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${config.url}/contact/update`, { id, ...editContact });
      setMessage('Contact updated successfully.');
      setEditId(null);
      fetchContacts();
    } catch (err) {
      setError('Failed to update contact: ' + err.message);
    }
  };

  return (
  <div className="centered-box">
    <h3 style={{ marginBottom: "18px" }}>All Contacts</h3>
    {message && <p style={{ color: "green" }}>{message}</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}
    {contacts.length === 0 ? (
      <p>No contacts found.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              {editId === contact.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editContact.name}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editContact.email}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="phone"
                      value={editContact.phone}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      value={editContact.address}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td className="actions-cell">
                    <button onClick={() => handleUpdate(contact.id)}>
                      Save
                    </button>
                    <button onClick={() => setEditId(null)}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.address}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleEdit(contact)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(contact.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

}
export default ViewAllContacts;
