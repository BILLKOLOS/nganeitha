import React, { useState, useEffect } from 'react';

const ProfileEditModal = ({ open, onClose, onSubmit, initialData = {}, loading }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (open) {
      setForm({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSubmit(form);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 400, boxShadow: '0 4px 24px rgba(102,126,234,0.10)' }}>
        <h3 style={{ marginBottom: 16 }}>Edit Profile</h3>
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="New Password (leave blank to keep current)" style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button type="submit" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={onClose} style={{ background: '#eee', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditModal; 