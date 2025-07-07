import React from 'react';

const CandidateDashboard = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#1e3c72', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#001f3f',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Candidate Dashboard</h1>
      </header>

      {/* Content */}
      <div style={{ marginTop: '30px' }}>
        <button style={buttonStyle}>Submit Nomination</button>
        <button style={buttonStyle}>Cancel Nomination</button>
        <button style={buttonStyle}>View Results</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  backgroundColor: '#ffde59',
  color: '#000',
  border: 'none',
  borderRadius: '5px',
  fontWeight: '600',
  cursor: 'pointer'
};

export default CandidateDashboard;
