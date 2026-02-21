import { useState } from 'react';

export const useScan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scan = async (api, input) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api(input);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, scan };
};
