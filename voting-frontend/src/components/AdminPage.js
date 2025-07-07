import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isRegistering ? 'register' : 'login';

    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (!isRegistering) {
          localStorage.setItem('adminToken', data.token);
          navigate('/AdminDashboard');
        } else {
          alert('✅ Admin registered successfully! Now login.');
          setIsRegistering(false);
        }
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#1e3c72', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', padding: '40px', borderRadius: '10px', width: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>{isRegistering ? 'Admin Registration' : 'Admin Login'}</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Admin Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: 'none' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: 'none' }} />
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#ffde59', border: 'none', borderRadius: '5px', fontWeight: '600' }}>{isRegistering ? 'Register' : 'Login as Admin'}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          {isRegistering ? (
            <span>Already registered? <button onClick={() => setIsRegistering(false)} style={{ color: '#ffde59', background: 'none', border: 'none', cursor: 'pointer' }}>Login here</button></span>
          ) : (
            <span>First-time admin? <button onClick={() => setIsRegistering(true)} style={{ color: '#ffde59', background: 'none', border: 'none', cursor: 'pointer' }}>Register here</button></span>
          )}
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
