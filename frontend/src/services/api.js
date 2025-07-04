const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  if (data) config.body = JSON.stringify(data);
  const res = await fetch(`${API_BASE}${endpoint}`, config);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'API error');
  return json;
}; 