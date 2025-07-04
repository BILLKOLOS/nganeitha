import React, { useState, useEffect } from 'react';
import { getBlogs } from '../services/blogService';
import { getEbooks } from '../services/ebookService';
import { toast } from 'react-toastify';
import BlogFormModal from '../components/BlogFormModal';
import { createBlog, updateBlog, deleteBlog } from '../services/blogService';
import EbookFormModal from '../components/EbookFormModal';
import { createEbook, updateEbook, deleteEbook } from '../services/ebookService';
import { getAllUsers, updateUserRole, getAllPurchases, getAllSubscriptions } from '../services/userService';
import { FaUserShield, FaUser, FaArrowUp, FaArrowDown, FaShoppingCart, FaSyncAlt } from 'react-icons/fa';

const cardStyle = {
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(102,126,234,0.08)',
  padding: 20,
  marginBottom: 16,
};

const tabList = [
  { key: 'blogs', label: 'Manage Blogs' },
  { key: 'ebooks', label: 'Manage Ebooks' },
  { key: 'users', label: 'Users' },
  { key: 'purchases', label: 'Purchases' },
  { key: 'subscriptions', label: 'Subscriptions' },
];

const AdminPage = () => {
  const [tab, setTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogLoading, setBlogLoading] = useState(false);
  const [ebookModalOpen, setEbookModalOpen] = useState(false);
  const [editingEbook, setEditingEbook] = useState(null);
  const [ebookLoading, setEbookLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [purchasesLoading, setPurchasesLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([getBlogs(), getEbooks()])
      .then(([blogsData, ebooksData]) => {
        setBlogs(blogsData);
        setEbooks(ebooksData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Fetch users
  useEffect(() => {
    if (tab === 'users') {
      setUsersLoading(true);
      getAllUsers(localStorage.getItem('token'))
        .then(setUsers)
        .catch(err => toast.error(err.message))
        .finally(() => setUsersLoading(false));
    }
  }, [tab]);

  // Fetch purchases
  useEffect(() => {
    if (tab === 'purchases') {
      setPurchasesLoading(true);
      getAllPurchases(localStorage.getItem('token'))
        .then(setPurchases)
        .catch(err => toast.error(err.message))
        .finally(() => setPurchasesLoading(false));
    }
  }, [tab]);

  // Fetch subscriptions
  useEffect(() => {
    if (tab === 'subscriptions') {
      setSubscriptionsLoading(true);
      getAllSubscriptions(localStorage.getItem('token'))
        .then(setSubscriptions)
        .catch(err => toast.error(err.message))
        .finally(() => setSubscriptionsLoading(false));
    }
  }, [tab]);

  const handleAction = (msg) => toast.info(msg);

  const openAddBlog = () => { setEditingBlog(null); setBlogModalOpen(true); };
  const openEditBlog = (blog) => { setEditingBlog(blog); setBlogModalOpen(true); };
  const handleBlogSubmit = async (form) => {
    setBlogLoading(true);
    try {
      if (editingBlog) {
        await updateBlog(editingBlog._id, form, localStorage.getItem('token'));
        toast.success('Blog updated!');
      } else {
        await createBlog(form, localStorage.getItem('token'));
        toast.success('Blog created!');
      }
      setBlogModalOpen(false);
      setEditingBlog(null);
      // Refresh blogs
      setLoading(true);
      const blogsData = await getBlogs();
      setBlogs(blogsData);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
    }
    setBlogLoading(false);
  };
  const handleDeleteBlog = async (blog) => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      await deleteBlog(blog._id, localStorage.getItem('token'));
      toast.success('Blog deleted!');
      setBlogs(blogs => blogs.filter(b => b._id !== blog._id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openAddEbook = () => { setEditingEbook(null); setEbookModalOpen(true); };
  const openEditEbook = (ebook) => { setEditingEbook(ebook); setEbookModalOpen(true); };
  const handleEbookSubmit = async (form) => {
    setEbookLoading(true);
    try {
      if (editingEbook) {
        await updateEbook(editingEbook._id, form, localStorage.getItem('token'));
        toast.success('Ebook updated!');
      } else {
        await createEbook(form, localStorage.getItem('token'));
        toast.success('Ebook created!');
      }
      setEbookModalOpen(false);
      setEditingEbook(null);
      // Refresh ebooks
      setLoading(true);
      const ebooksData = await getEbooks();
      setEbooks(ebooksData);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
    }
    setEbookLoading(false);
  };
  const handleDeleteEbook = async (ebook) => {
    if (!window.confirm('Delete this ebook?')) return;
    try {
      await deleteEbook(ebook._id, localStorage.getItem('token'));
      toast.success('Ebook deleted!');
      setEbooks(ebooks => ebooks.filter(e => e._id !== ebook._id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePromoteDemote = async (userId, isAdmin) => {
    try {
      await updateUserRole(userId, isAdmin, localStorage.getItem('token'));
      toast.success(isAdmin ? 'User promoted to admin' : 'User demoted from admin');
      setUsers(users => users.map(u => u._id === userId ? { ...u, isAdmin } : u));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(102,126,234,0.10)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ flex: 1 }}>Admin Dashboard</h2>
        <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', borderRadius: 8, padding: '6px 16px', fontWeight: 700, fontSize: 14, marginLeft: 8 }}>ADMIN</span>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {tabList.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{ fontWeight: tab === t.key ? 700 : 400, background: tab === t.key ? '#667eea' : '#eee', color: tab === t.key ? '#fff' : '#333', border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            {t.key === 'users' && <FaUserShield />}
            {t.key === 'purchases' && <FaShoppingCart />}
            {t.key === 'subscriptions' && <FaSyncAlt />}
            {t.label}
          </button>
        ))}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : tab === 'blogs' ? (
        <div>
          <button style={{ marginBottom: 16, background: '#764ba2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer' }} onClick={openAddBlog}>+ Add Blog</button>
          {blogs.map(blog => (
            <div key={blog._id} style={cardStyle}>
              <b>{blog.title}</b> <span style={{ color: '#667eea' }}>({blog.category})</span>
              <div style={{ float: 'right' }}>
                <button style={{ marginLeft: 8, background: '#f093fb', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }} onClick={() => openEditBlog(blog)}>Edit</button>
                <button style={{ marginLeft: 4, background: '#f5576c', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }} onClick={() => handleDeleteBlog(blog)}>Delete</button>
              </div>
            </div>
          ))}
          <BlogFormModal open={blogModalOpen} onClose={() => setBlogModalOpen(false)} onSubmit={handleBlogSubmit} initialData={editingBlog || {}} loading={blogLoading} />
        </div>
      ) : tab === 'ebooks' ? (
        <div>
          <button style={{ marginBottom: 16, background: '#764ba2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer' }} onClick={openAddEbook}>+ Add Ebook</button>
          {ebooks.map(ebook => (
            <div key={ebook._id} style={cardStyle}>
              <b>{ebook.title}</b> <span style={{ color: '#667eea' }}>({ebook.category})</span>
              <div style={{ float: 'right' }}>
                <button style={{ marginLeft: 8, background: '#f093fb', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }} onClick={() => openEditEbook(ebook)}>Edit</button>
                <button style={{ marginLeft: 4, background: '#f5576c', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }} onClick={() => handleDeleteEbook(ebook)}>Delete</button>
              </div>
            </div>
          ))}
          <EbookFormModal open={ebookModalOpen} onClose={() => setEbookModalOpen(false)} onSubmit={handleEbookSubmit} initialData={editingEbook || {}} loading={ebookLoading} />
        </div>
      ) : tab === 'users' ? (
        <div>
          {usersLoading ? <div>Loading users...</div> : (
            <table style={{ width: '100%', background: '#fafaff', borderRadius: 10, boxShadow: '0 1px 8px #764ba208', marginBottom: 16 }}>
              <thead>
                <tr style={{ background: '#e0e7ff' }}>
                  <th style={{ padding: 8, borderRadius: '10px 0 0 0' }}>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th style={{ borderRadius: '0 10px 0 0' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} style={{ textAlign: 'center' }}>
                    <td style={{ padding: 8 }}>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td>{u.isAdmin ? <span style={{ color: '#764ba2', fontWeight: 700 }}>Admin</span> : 'User'}</td>
                    <td>
                      {u.isAdmin ? (
                        <button style={{ background: '#f5576c', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }} onClick={() => handlePromoteDemote(u._id, false)}><FaArrowDown /> Demote</button>
                      ) : (
                        <button style={{ background: '#667eea', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }} onClick={() => handlePromoteDemote(u._id, true)}><FaArrowUp /> Promote</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : tab === 'purchases' ? (
        <div>
          {purchasesLoading ? <div>Loading purchases...</div> : (
            <table style={{ width: '100%', background: '#fafaff', borderRadius: 10, boxShadow: '0 1px 8px #764ba208', marginBottom: 16 }}>
              <thead>
                <tr style={{ background: '#e0e7ff' }}>
                  <th style={{ padding: 8, borderRadius: '10px 0 0 0' }}>User</th>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th style={{ borderRadius: '0 10px 0 0' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map(p => (
                  <tr key={p._id} style={{ textAlign: 'center' }}>
                    <td style={{ padding: 8 }}>{p.user?.fullName || 'Unknown'}<br /><span style={{ fontSize: 12, color: '#888' }}>{p.user?.email}</span></td>
                    <td>{p.title}</td>
                    <td>{p.itemType}</td>
                    <td>${p.price}</td>
                    <td>{new Date(p.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : tab === 'subscriptions' ? (
        <div>
          {subscriptionsLoading ? <div>Loading subscriptions...</div> : (
            <table style={{ width: '100%', background: '#fafaff', borderRadius: 10, boxShadow: '0 1px 8px #764ba208', marginBottom: 16 }}>
              <thead>
                <tr style={{ background: '#e0e7ff' }}>
                  <th style={{ padding: 8, borderRadius: '10px 0 0 0' }}>User</th>
                  <th>Status</th>
                  <th>Plan</th>
                  <th style={{ borderRadius: '0 10px 0 0' }}>Start Date</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map(s => (
                  <tr key={s._id} style={{ textAlign: 'center' }}>
                    <td style={{ padding: 8 }}>{s.user?.fullName || 'Unknown'}<br /><span style={{ fontSize: 12, color: '#888' }}>{s.user?.email}</span></td>
                    <td>{s.status}</td>
                    <td>{s.plan}</td>
                    <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AdminPage; 