import { Routes, Route } from "react-router-dom";
import MainNavBar from './main/MainNavBar';
import AddContact from './contact/AddContact';
import ViewAllContacts from './contact/ViewAllContacts';
import ViewContactById from './contact/ViewContactById';
import UpdateContact from './contact/UpdateContact';
import DeleteContact from './contact/DeleteContact';
import './main/style.css';

export default function App() {
  return (
    <>
      <h2 className="cms-title">Contact Management</h2>
      <MainNavBar />
      <Routes>
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/view-contacts" element={<ViewAllContacts />} />
        <Route path="/view-contact" element={<ViewContactById />} />
        <Route path="/update-contact" element={<UpdateContact />} />
        <Route path="/delete-contact" element={<DeleteContact />} />
      </Routes>
    </>
  );
}
