import React, { useState, useEffect } from 'react';

const categories = ['Herbal', 'Mindfulness', 'Nutrition', 'Fitness', 'Wellness'];

const BlogFormModal = ({ open, onClose, onSubmit, initialData = {}, loading }) => {
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    readTime: '',
    isPremium: false,
    image: ''
  });

  useEffect(() => {
    if (open) {
      setForm({
        title: initialData.title || '',
        excerpt: initialData.excerpt || '',
        content: initialData.content || '',
        category: initialData.category || '',
        author: initialData.author || '',
        readTime: initialData.readTime || '',
        isPremium: initialData.isPremium || false,
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
    onSubmit(form);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 400, boxShadow: '0 4px 24px rgba(102,126,234,0.10)' }}>
        <h3 style={{ marginBottom: 16 }}>{initialData._id ? 'Edit Blog' : 'Add Blog'}</h3>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Excerpt" required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required style={{ width: '100%', marginBottom: 10, padding: 8, minHeight: 60 }} />
        <select name="category" value={form.category} onChange={handleChange} required style={{ width: '100%', marginBottom: 10, padding: 8 }}>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="readTime" value={form.readTime} onChange={handleChange} placeholder="Read Time (e.g. 8 min)" required style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" style={{ width: '100%', marginBottom: 10, padding: 8 }} />
        <label style={{ display: 'block', marginBottom: 16 }}>
          <input type="checkbox" name="isPremium" checked={form.isPremium} onChange={handleChange} /> Premium Article
        </label>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button type="submit" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={onClose} style={{ background: '#eee', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default BlogFormModal; 