import React, { useState, useEffect } from 'react';

const categories = ['Herbal', 'Mindfulness', 'Nutrition', 'Fitness', 'Wellness'];

const EbookFormModal = ({ open, onClose, onSubmit, initialData = {}, loading }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    price: '',
    originalPrice: '',
    bestseller: false,
    image: ''
  });

  useEffect(() => {
    if (open) {
      setForm({
        title: initialData.title || '',
        author: initialData.author || '',
        description: initialData.description || '',
        category: initialData.category || '',
        price: initialData.price || '',
        originalPrice: initialData.originalPrice || '',
        bestseller: initialData.bestseller || false,
        image: initialData.image || ''
      });
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...form, price: parseFloat(form.price), originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined });
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 400, boxShadow: '0 4px 24px rgba(102,126,234,0.10)' }}>
        <h3 style={{ marginBottom: 16 }}>{initialData._id ? 'Edit Ebook' : 'Add Ebook'}</h3>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required style={{ width: '100%', marginBottom: 10, padding: 8, minHeight: 60 }} />
        <select name="category" value={form.category} onChange={handleChange} required style={{ width: '100%', marginBottom: 10, padding: 8 }}>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="Price" required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="originalPrice" type="number" step="0.01" value={form.originalPrice} onChange={handleChange} placeholder="Original Price (optional)" style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <label style={{ display: 'block', marginBottom: 16 }}>
          <input type="checkbox" name="bestseller" checked={form.bestseller} onChange={handleChange} /> Bestseller
        </label>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button type="submit" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={onClose} style={{ background: '#eee', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EbookFormModal; 