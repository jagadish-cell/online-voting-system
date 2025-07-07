// ResultsPage.js
import React from 'react';

const ResultsPage = () => (
  <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#1e3c72', color: '#fff', minHeight: '100vh', padding: '50px' }}>
    <header style={{ backgroundColor: 'rgba(0,0,0,0.6)', padding: '20px', textAlign: 'center', borderRadius: '10px' }}>
      <h1>Election Results</h1>
      <nav>
        <a href="/" style={{ color: '#ffde59', margin: '0 15px' }}>Home</a>
        <a href="/login" style={{ color: '#ffde59', margin: '0 15px' }}>Login</a>
        <a href="/admin" style={{ color: '#ffde59', margin: '0 15px' }}>Admin</a>
      </nav>
    </header>
    <main style={{ marginTop: '50px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '30px', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Live Voting Results</h2>
      <p style={{ textAlign: 'center' }}>Display candidate-wise voting percentages, counts, and winner announcement here by the Admin.</p>
    </main>
  </div>
);

export default ResultsPage;