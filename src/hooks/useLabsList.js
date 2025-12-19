// src/hooks/useLabs.js
import { useState, useEffect } from 'react';
import axios from "utils/axios";

const useLabs = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('/master/list-lab');
        if (response.data.status === "true") {
          setLabs(response.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  return { labs, loading, error };
};

export default useLabs;