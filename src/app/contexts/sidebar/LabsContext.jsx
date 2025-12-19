// app/contexts/LabsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../configs/axios.config';

const LabsContext = createContext();

export const useLabs = () => {
  const context = useContext(LabsContext);
  if (!context) {
    throw new Error('useLabs must be used within LabsProvider');
  }
  return context;
};

export const LabsProvider = ({ children }) => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/master/list-lab');
      
      if (response.data.status === 'true' && response.data.data) {
        setLabs(response.data.data);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching labs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LabsContext.Provider value={{ labs, loading, error, refreshLabs: fetchLabs }}>
      {children}
    </LabsContext.Provider>
  );
};