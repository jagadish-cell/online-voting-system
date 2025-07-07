import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#1e3c72',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
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
          <Link to="/register" style={linkStyle}>Register</Link>
          <Link to="/login" style={linkStyle}>Login</Link>
          <Link to="/results" style={linkStyle}>Results</Link>
          <Link to="/candidate" style={linkStyle}>Candidate</Link>
          
        </nav>
      </header>

      {/* Main Section */}
      <main style={{
        textAlign: 'center',
        padding: '80px 20px',
        flex: 1
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Make Your Vote Count
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#e0e0e0',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          Cast your vote easily, securely, and from anywhere. Join us in building a stronger democracy.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button
            onClick={handleGetStarted}
            style={{
              padding: '12px 36px',
              backgroundColor: '#ffde59',
              color: '#1e3c72',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            Get Started
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#001f3f',
        color: '#bbb',
        textAlign: 'center',
        padding: '15px',
        fontSize: '14px'
      }}>
        © 2025 Online Voting System | Designed for professional and secure elections.
      </footer>
    </div>
  );
};

const linkStyle = {
  color: '#ffde59',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
  transition: 'color 0.3s ease'
};

export default HomePage;