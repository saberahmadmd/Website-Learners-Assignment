import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const getMedications = async (userId) => {
  console.log('Fetching medications for userId:', userId); // ✅ Add log!
  const res = await API.get('/medications', {
    params: { userId }
  });
  return res.data;
}

export const addMedication = async (medication) => {
  const res = await API.post('/medications', medication);
  return res.data;
};

// ✅ In frontend/src/api/api.js
export const markAsTaken = async (id) => {
  console.log('Calling markAsTaken for ID:', id); // ✅ Add this!
  const res = await API.put(`/medications/${id}/taken`);
  return res.data;
};

export const deleteMedication = async (id) => {
  const res = await API.delete(`/medications/${id}`);
  return res.data;
};

export const signup = async (credentials) => {
  const res = await API.post('/signup', credentials);
  return res.data;
};

export const login = async (credentials) => {
  const res = await API.post('/login', credentials);
  return res.data;
};
