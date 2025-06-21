import { useState } from 'react';
import { addMedication } from '../api/api';

import './AddMedication.css';

function AddMedication({ userId, onAdded }) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !dosage || !frequency) {
      alert('Please fill in all fields');
      return;
    }
    await addMedication({ name, dosage, frequency, userId });
    setName('');
    setDosage('');
    setFrequency('');
    onAdded(); // 🔑 notify parent to re-fetch
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3 className="add-title">Add Medication</h3>
      <input
        className="add-input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="add-input"
        placeholder="Dosage"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
      />
      <input
        className="add-input"
        placeholder="Frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      />
      <button className="add-button" type="submit">Add</button>
    </form>
  );
}

export default AddMedication;