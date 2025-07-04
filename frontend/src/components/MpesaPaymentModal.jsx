import React, { useState } from 'react';

const MpesaPaymentModal = ({ open, onClose, amount, onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^2547\d{8}$/.test(phone)) {
      setError('Enter a valid phone number (e.g. 2547XXXXXXXX)');
      return;
    }
    setLoading(true);
    // Simulate payment for now
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onSuccess) onSuccess(phone);
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, boxShadow: '0 4px 24px rgba(102,126,234,0.10)' }}>
        <h3 style={{ marginBottom: 16 }}>Pay with M-PESA</h3>
        <div style={{ marginBottom: 12, fontWeight: 600 }}>Amount: <span style={{ color: '#667eea' }}>KES {amount}</span></div>
        <input
          type="text"
          placeholder="Phone (2547XXXXXXXX)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        {error && <div style={{ color: '#e74c3c', marginBottom: 10 }}>{error}</div>}
        {success ? (
          <div style={{ color: '#27ae60', marginBottom: 10 }}>Payment initiated! Check your phone to complete the payment.</div>
        ) : (
          <button type="submit" style={{ background: 'linear-gradient(135deg, #25d366, #3b7e2d)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', width: '100%' }} disabled={loading}>
            {loading ? 'Processing...' : 'Pay with M-PESA'}
          </button>
        )}
        <button type="button" onClick={onClose} style={{ background: '#eee', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 10 }}>Cancel</button>
      </form>
    </div>
  );
};

export default MpesaPaymentModal; 