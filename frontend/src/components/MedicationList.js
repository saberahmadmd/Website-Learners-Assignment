import React, { useState, useEffect } from 'react';
import { getMedications, markAsTaken, deleteMedication } from '../api/api';

import './MedicationList.css';

function MedicationList({ userId, reloadFlag }) {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      setLoading(true);
      const data = await getMedications(userId);
      setMedications(data);
      setLoading(false);
    };

    fetchMedications();
  }, [userId, reloadFlag]); // ✅ clean!

  const handleMarkAsTaken = async (id) => {
    await markAsTaken(id);
    // 👇 manual reload:
    const data = await getMedications(userId);
    setMedications(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      await deleteMedication(id);
      const data = await getMedications(userId);
      setMedications(data);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!medications.length) return <p>No medications.</p>;

  return (
    <div className='medication-list-continer'>
      <ul className="medication-list">
        {medications.map((med) => (
          <li key={med.id} className="medication-item">
            {med.name} ({med.dosage}) — {med.frequency}
            {med.takenToday ? (
              <span className="taken-status">✅ Taken Today</span>
            ) : (
              <button
                className="mark-button"
                onClick={() => handleMarkAsTaken(med.id)}
              >
                Mark as Taken
              </button>
            )}
            <button
              className="delete-button"
              onClick={() => handleDelete(med.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>

  );
}

export default MedicationList;