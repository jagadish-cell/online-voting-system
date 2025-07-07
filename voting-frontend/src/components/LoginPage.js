import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  color: '#ffde59',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
};

const LoginPage = () => {
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        localStorage.setItem("token", data.token);  // Store JWT token
        window.location.href = "/vote";  // Redirect to VotingComponent.js
      } else {
        alert(data.message || "Invalid login credentials");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Server error. Try again.");
    }
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#1e3c72', color: '#fff', minHeight: '100vh' }}>
      
      {/* Header */}
      <header style={{
        backgroundColor: '#001f3f',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Online Voting System
        </h1>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/register" style={linkStyle}>Register</Link>
          <Link to="/results" style={linkStyle}>Results</Link>
        </nav>
      </header>

      {/* Login Form */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 80px)' }}>
        <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', padding: '40px', borderRadius: '10px', width: '350px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: 'none' }} required />
            <input type="password" name="password" placeholder="Password" style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: 'none' }} required />
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#ffde59', border: 'none', borderRadius: '5px', fontWeight: '600' }}>Login</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '15px' }}>
            Don't have an account? <Link to="/register" style={{ color: '#ffde59' }}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
