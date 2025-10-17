// src/main/MainNavBar.jsx
import { Link } from "react-router-dom";
import './style.css'; 

export default function MainNavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/add-contact">Add Contact</Link></li>
        <li><Link to="/view-contacts">View All Contacts</Link></li>
      </ul>
    </nav>
  );
}
