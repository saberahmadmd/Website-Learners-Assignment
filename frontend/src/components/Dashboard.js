import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AddMedication from './AddMedication';
import MedicationList from './MedicationList';

import './Dashboard.css';

function Dashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [reloadFlag, setReloadFlag] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);     // Clear user
    navigate('/login', { replace: true });
  };

  if (!user) return <p>Please login first.</p>;

  return (
    <div className="dashboard">
      <div>
        <h2 className="dashboard-title">Welcome, {user.email}</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <AddMedication
        userId={user.id}
        onAdded={() => setReloadFlag(reloadFlag + 1)}
      />

      <MedicationList
        userId={user.id}
        reloadFlag={reloadFlag}
      />
    </div>
  );
}

export default Dashboard;
